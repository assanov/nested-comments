import { usePost } from "~/contexts/PostContext";
import CommentList from "./CommentList";
import { PostByIdComment } from "~/server/api/routers/post";
import IconBtn from "./IconBtn";
import { FaHeart, FaReply, FaTrash } from "react-icons/fa/";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";
import CommentForm from "./CommentForm";

function Comment({ comment }: { comment: PostByIdComment }) {
  const [responsing, setResponsing] = useState(false);

  const ctx = usePost();
  const router = useRouter();
  if (!ctx?.getReplies) {
    return;
  }
  const childComments = ctx.getReplies(comment.id);
  const deleteComment = api.comment.delete.useMutation({
    onSuccess: () => {
      router.reload();
    },
  });

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
          <IconBtn Icon={FaHeart} aria-label="Like">
            2
          </IconBtn>

          <IconBtn
            Icon={FaReply}
            aria-label="Reply"
            handleClick={() => setResponsing(true)}
          />
          <IconBtn
            Icon={FaTrash}
            colorClasses="text-red-500"
            aria-label="Delete"
            handleClick={() => deleteComment.mutate({ id: comment.id })}
          />
        </footer>
      </div>
      {responsing && (
        <CommentForm postId={ctx!.post!.id} parentId={comment.id} />
      )}
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
