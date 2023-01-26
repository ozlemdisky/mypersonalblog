import { useAuth0 } from "@auth0/auth0-react";

export default function Form({ onSubmit, textSet }) {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  return (
    <form className="mt-10" onSubmit={onSubmit}>
      <textarea
        rows="3"
        className="border border-purple-300 rounded w-full block px-2 py-1"
        onChange={(e) => textSet(e.target.value)}
      />
      <div className="mt-4">
        {isAuthenticated ? (
          <div>
            <div className="flex items-center space-x-2">
              <button className="bg-purple-500 text-white px-2 py-1 rounded">
                send
              </button>
              <img src={user.picture} width={30} className="rounded-full" />{" "}
              <span>{user.name}</span>
              <button
                onClick={() =>
                  logout({ returnTo: process.env.NEXT_PUBLIC_URL + "/blog" })
                }
              >
                x
              </button>
            </div>
          </div>
        ) : (
          <div>
            {" "}
            <button
              className="bg-purple-500 text-white px-2 py-1 rounded"
              onClick={() => loginWithRedirect()}
            >
              login
            </button>{" "}
          </div>
        )}
      </div>
    </form>
  );
}
