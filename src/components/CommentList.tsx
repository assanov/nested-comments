import { PostByIdComment } from "~/server/api/routers/post";
import Comment from "./Comment";

function CommentList({
  comments,
  className,
}: {
  comments: PostByIdComment[];
  className?: string;
}) {
  return (
    <div className={className}>
      {comments.map((c) => (
        <Comment key={c.id} comment={c} />
      ))}
    </div>
  );
}
export default CommentList;
