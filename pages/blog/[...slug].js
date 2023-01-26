import { getMdxNode, getMdxPaths } from "next-mdx/server";
import { useHydrate } from "next-mdx/client";
import { mdxComponents } from "../../components/mdx-components";
import postcss from "postcss";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

export default function PostPage({ post }) {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    getAccessTokenSilently,
  } = useAuth0();
  const [text, textSet] = useState("");
  const [url, urlSet] = useState(null);

  useEffect(() => {
    const url = window.location.origin + window.location.pathname;
    urlSet(url);
  }, []);

  const content = useHydrate(post, {
    components: mdxComponents,
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    const userToken = await getAccessTokenSilently();

    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({ text, userToken, url }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="site-container">
      <article>
        <h1 className=" text-3xl font-extrabold">{post.frontMatter.title}</h1>
        <br className="my-8" />

        <div className="prose">{content}</div>
      </article>
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
    </div>
  );
}
export async function getStaticPaths() {
  return {
    paths: await getMdxPaths("post"),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const post = await getMdxNode("post", context);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
}
