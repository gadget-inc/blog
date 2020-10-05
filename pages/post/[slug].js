import Link from "next/link";
import ReactMarkdown from "react-markdown/with-html";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import Layout from "components/Layout";
import Image from "components/Image";
import SEO from "components/Seo";
import { getPostBySlug, getPostsSlugs } from "utils/posts";
import Bio from "components/Bio";

const CodeBlock = ({ language, value }) => {
  return <SyntaxHighlighter language={language}>{value}</SyntaxHighlighter>;
};

export default function Post({ post, nextPost, previousPost }) {
  return (
    <Layout>
      <SEO title={post.title} description={post.body} />

      <article>
        <header className="mb-8">
          <h1 className="mb-2 text-6xl font-black leading-none font-display">
            {post.title}
          </h1>
          <p className="text-sm">{post.publishedAt}</p>
        </header>
        <ReactMarkdown
          className="mb-4 prose-sm prose sm:prose lg:prose-lg"
          escapeHtml={false}
          source={post.body.markdowsn}
          renderers={{ code: CodeBlock }}
        />
        <hr className="mt-4" />
        <footer>
          {/* <Bio author={post.author} className="mt-8 mb-16" /> */}
        </footer>
      </article>
      <nav className="flex justify-between mb-10">
        {previousPost ? (
          <Link href={"/post/[slug]"} as={`/post/${previousPost.slug}`}>
            <a className="text-lg font-bold">← {previousPost.title}</a>
          </Link>
        ) : (
          <div />
        )}
        {nextPost ? (
          <Link href={"/post/[slug]"} as={`/post/${nextPost.slug}`}>
            <a className="text-lg font-bold">{nextPost.title} →</a>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </Layout>
  );
}

export async function getStaticPaths() {
  const slugs = await getPostsSlugs();

  return {
    paths: slugs.map((slug) => `/post/${slug}`),
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const postData = await getPostBySlug(slug);

  if (!postData.previousPost) {
    postData.previousPost = null;
  }

  if (!postData.nextPost) {
    postData.nextPost = null;
  }

  return { props: postData };
}
