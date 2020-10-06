import { Layout } from "components/Layout";
import { SEO } from "components/Seo";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown/with-html";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { getPostBySlug, getPostsSlugs, Post } from "utils/posts";

const CodeBlock = (props: { language: string; value: string }) => {
  return <SyntaxHighlighter language={props.language}>{props.value}</SyntaxHighlighter>;
};

export default function PostPage({ post, nextPost, previousPost }: { post: Post; previousPost?: Post; nextPost?: Post }) {
  return (
    <Layout>
      <SEO title={post.title} description={post.body} />

      <article>
        <header className="mb-8">
          <h1 className="mb-2 text-6xl font-black leading-none font-display">{post.title}</h1>
          <p className="text-sm">{post.publishedAt}</p>
        </header>
        <ReactMarkdown
          className="mb-4 prose-sm prose sm:prose lg:prose-lg"
          escapeHtml={false}
          source={post.body.markdowsn}
          renderers={{ code: CodeBlock }}
        />
        <hr className="mt-4" />
        <footer>{/* <Bio author={post.author} className="mt-8 mb-16" /> */}</footer>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getPostsSlugs();

  return {
    paths: slugs.map((slug) => `/post/${slug}`),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostBySlug(params!.slug as any);

  return { props: postData };
};
