import { getAllNodes } from "next-mdx/server";
import Link from "next/Link";

function BlogPage({ posts }) {
  return (
    <div className="site-container space-y-4">
      {posts.map((post) => {
        return (
          <article key={post.url}>
            <h2 className="text-xl font-semibold">
              <Link href={post.url}>
                <a>{post.frontMatter.title}</a>
              </Link>
            </h2>
            <p> {post.frontMatter.excerpt}...</p>
            <div className="text-gray-500">
              <span>{post.frontMatter.date}</span>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllNodes("post"),
    },
  };
}
export default BlogPage;
