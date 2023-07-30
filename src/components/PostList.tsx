import Link from "next/link";
import { AllPostsRes } from "~/server/api/routers/post";

interface PostListProps {
  data: AllPostsRes;
}

function PostList({ data }: PostListProps) {
  return (
    <div className="flex flex-col gap-3 ">
      {data?.map((post) => (
        <Link
          key={post.id}
          href={`/posts/${post.id}/`}
          className="block max-w-lg  rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {post.title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {post.body}
          </p>
        </Link>
      ))}
    </div>
  );
}
export default PostList;
