import { useRouter } from "next/router";
import { ReactElement, createContext, useContext, useMemo } from "react";
import LoadingSpinner from "~/components/LoadingSpinner";
import { PostById, PostByIdComment } from "~/server/api/routers/post";
import { api } from "~/utils/api";

export interface NestedCommentsI {
  [key: string]: PostByIdComment[];
}

interface PostContextI {
  post: PostById;
  getReplies: (id: string) => PostByIdComment[];
  rootComments: PostByIdComment[];
}

const Context = createContext<PostContextI | null>(null);

export function usePost(): PostContextI | null {
  return useContext(Context);
}

function PostProvider({ children }: { children: ReactElement }) {
  const { query } = useRouter();
  const id = query.id as string;
  const { data, isLoading, isError } = api.post.getById.useQuery({ id });

  const commentsByParentId = useMemo(() => {
    if (data?.comments == null) {
      return {};
    }
    const group: NestedCommentsI = {};
    data.comments.forEach((comment) => {
      const parentId = comment.parentId || "root";

      //@ts-ignore
      group[parentId] ||= [];
      group[parentId]!.push(comment);
    });
    return group;
  }, [data?.comments]);

  function getReplies(parentId: string): PostByIdComment[] {
    return commentsByParentId[parentId] || [];
  }

  return (
    <Context.Provider
      value={{
        post: data || null,
        getReplies,
        rootComments: getReplies("root"),
      }}
    >
      {isLoading ? (
        <LoadingSpinner big />
      ) : isError ? (
        <h1>Error ..</h1>
      ) : (
        children
      )}
    </Context.Provider>
  );
}
export default PostProvider;
