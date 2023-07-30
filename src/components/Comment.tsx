import { usePost } from "~/contexts/PostContext";
import CommentList from "./CommentList";
import { PostByIdComment } from "~/server/api/routers/post";
import IconBtn from "./IconBtn";
import { FaEdit, FaHeart, FaReply, FaTrash } from "react-icons/fa/";

function Comment({ comment }: { comment: PostByIdComment }) {
  const ctx = usePost();
  if (!ctx?.getReplies) {
    return;
  }
  const childComments = ctx.getReplies(comment.id);

  return (
    <div className="ml-2 mt-2">
      <div className={`rounded border border-gray-200 p-3 `}>
        <header className="flex justify-between">
          <span className="text-sm text-blue-500">{comment.user.name}</span>
          <span className="text-sm text-blue-500">
            {comment.createdAt.toString().slice(4, 21)}
          </span>
        </header>
        <p className="p-4">{comment.message}</p>
        <footer className="flex gap-4 text-sm">
          <IconBtn Icon={FaHeart} isActive={false} aria-label="Like">
            2
          </IconBtn>

          <IconBtn Icon={FaReply} isActive={false} aria-label="Reply" />
          <IconBtn Icon={FaEdit} isActive={false} aria-label="Edit" />
          <IconBtn
            Icon={FaTrash}
            isActive={false}
            colorClasses="text-red-500"
            aria-label="Delete"
          />
        </footer>
      </div>
      {childComments?.length > 0 ? (
        <CommentList
          comments={childComments}
          className="border-l-2 border-gray-300"
        />
      ) : null}
    </div>
  );
}
export default Comment;
