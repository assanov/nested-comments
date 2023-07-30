import { usePost } from "~/contexts/PostContext";
import CommentList from "./CommentList";

function Post() {
  const context = usePost();
  if (context?.post == null || context.rootComments == null) {
    return null;
  }
  const { post, rootComments } = context;

  return (
    <>
      <div className="p-3">
        <h1 className="text-xl text-red-800">{post.title}</h1>
        <article>{post.body}</article>
      </div>
      {rootComments.length ? (
        <CommentList comments={rootComments} className="" />
      ) : (
        "No comments yet"
      )}
    </>
  );
}
export default Post;
