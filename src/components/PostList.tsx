import Link from "next/link";

export interface Post {
  id: string;
  title: string;
  body: string;
}

interface PostListProps {
  isLoading: boolean;
  isError: boolean;
  data?: Post[];
}

function PostList({ data }: PostListProps) {
  return (
    <div>
      {data?.map((post) => (
        <div key={post.id} className="m-2">
          <h1 className="text-xl">
            <Link href={`/posts/${post.id}/`}>{post.title}</Link>
          </h1>

          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
export default PostList;
