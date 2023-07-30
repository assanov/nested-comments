import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "~/utils/api";

function CommentForm({
  postId,
  parentId,
}: {
  postId: string;
  parentId?: string;
}) {
  const [value, setValue] = useState("");
  const router = useRouter();
  const commentCreation = api.comment.create.useMutation({
    onSuccess: () => {
      setValue("");
      router.reload();
    },
  });

  return (
    <div className="ml-2 flex w-full gap-3 p-2 lg:w-1/2 ">
      <textarea
        className="flex-1 border border-gray-200 p-2"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
      <button
        className="rounded-sm bg-purple-400 px-5 text-white"
        onClick={() =>
          commentCreation.mutate({ message: value, postId, parentId })
        }
      >
        Post
      </button>
    </div>
  );
}
export default CommentForm;
