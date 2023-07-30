import { signIn, signOut, useSession } from "next-auth/react";

function Header() {
  const session = useSession();
  return (
    <div className="flex items-center gap-3">
      <h1>Hello {session.data?.user.name ?? "Guest"}</h1>
      {session?.data?.user ? (
        <button
          className="bg-red-400 px-4 py-2 text-white"
          onClick={() => signOut()}
        >
          Logout
        </button>
      ) : (
        <button
          className="bg-red-400 px-4 py-2 text-white"
          onClick={() => signIn()}
        >
          Login
        </button>
      )}
    </div>
  );
}
export default Header;
