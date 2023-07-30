import { usePost } from "~/contexts/PostContext";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { useSession } from "next-auth/react";

function Post() {
  const context = usePost();
  if (context?.post == null || context.rootComments == null) {
    return null;
  }
  const { post, rootComments } = context;

  return (
    <>
      <div className="border border-gray-200 p-6 shadow">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {post.title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {post.body}
        </p>
      </div>
      <CommentForm postId={post.id} />
      <div className="md:w-full lg:w-1/2">
        {rootComments.length ? (
          <CommentList comments={rootComments} />
        ) : (
          "No comments yet"
        )}
      </div>
    </>
  );
}
export default Post;
