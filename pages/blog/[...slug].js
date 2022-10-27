import { getMdxNode, getMdxPaths } from "next-mdx/server";
import { useHydrate } from "next-mdx/client";
import { mdxComponents } from "../../components/mdx-components";
import postcss from "postcss";

export default function PostPage({ post }) {
  console.log(post);

  const content = useHydrate(post, {
    components: mdxComponents,
  });

  return (
    <div className="site-container">
      <article>
        <h1 className="text-3xl font-extrabold">{post.frontMatter.title}</h1>
        <br my-8 />
        <div className="prose">{content}</div>
      </article>
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
