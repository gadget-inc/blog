import Link from "next/link";

import Layout from "components/Layout";
import SEO from "components/Seo";
import { getSortedPosts } from "utils/posts";

export default function Home({ posts }) {
  return (
    <Layout>
      <SEO title="All posts" />
      {posts.map((post) => (
        <article key={post.id}>
          <header className="mb-2">
            <h3 className="mb-2">
              <Link href={"/post/[slug]"} as={`/post/${post.slug}`}>
                <a className="text-4xl font-bold text-orange-600 font-display">
                  {post.title}
                </a>
              </Link>
            </h3>
            <span className="text-sm">{post.publishedAt}</span>
          </header>
          <section>
            <ReactMarkdown
              className="mb-8 prose-sm prose sm:prose lg:prose-lg"
              escapeHtml={false}
              source={post.body.markdowsn}
              renderers={{ code: CodeBlock }}
            />
          </section>
        </article>
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getSortedPosts();

  return {
    props: {
      posts,
    },
  };
}
