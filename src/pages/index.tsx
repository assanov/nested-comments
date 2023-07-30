import LoadingSpinner from "~/components/LoadingSpinner";
import PostList from "~/components/PostList";
import { api } from "~/utils/api";

export default function Home() {
  const res = api.post.getAll.useQuery();

  return (
    <>
      {res.isLoading ? (
        <LoadingSpinner big />
      ) : (
        res?.data && <PostList data={res.data} />
      )}
    </>
  );
}
