import { useRouter } from "next/router";
import Post from "~/components/Post";
import PostProvider from "~/contexts/PostContext";

const PostPage = () => {
  const { query } = useRouter();
  const id = query.id as string;

  if (!id) {
    return;
  }

  return (
    <PostProvider>
      <Post />
    </PostProvider>
  );
};
export default PostPage;
