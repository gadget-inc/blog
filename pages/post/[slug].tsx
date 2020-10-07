import { Author } from "@gadget-client/blog/dist-types/models/Author";
import { useStyletron } from "baseui";
import { Heading } from "baseui/heading";
import { Cell } from "baseui/layout-grid";
import { StyledLink } from "baseui/link";
import { AuthorBio } from "components/AuthorBio";
import { Layout } from "components/Layout";
import { MarkdownComponents } from "components/MarkdownComponents";
import { MetaLabel } from "components/MetaLabel";
import { SEO } from "components/Seo";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown/with-html";
import { getPostBySlug, getPostsSlugs, Post } from "utils/posts";

export default function PostPage({
  post,
  nextPost,
  previousPost,
  author,
}: {
  post: Post;
  previousPost?: Post;
  nextPost?: Post;
  author: Author;
}) {
  const [css, $theme] = useStyletron();

  return (
    <Layout>
      <SEO title={post.title} description={post.body} />
      <Cell span={[1, 4, 8, 12]}>
        <article>
          <header>
            <Link href={"/post/[slug]"} as={`/post/${post.slug}`} passHref>
              <Heading as="a">{post.title}</Heading>
            </Link>
            <MetaLabel>Published {new Date(post.publishedAt).toLocaleDateString()}</MetaLabel>
          </header>
          <ReactMarkdown escapeHtml={false} source={post.body.markdown} renderers={MarkdownComponents} />
          <hr />
        </article>
      </Cell>
      <Cell span={[1, 4, 8, 12]}>
        <footer className={css({ marginBottom: $theme.sizing.scale600 })}>
          <AuthorBio author={author} />
        </footer>
      </Cell>
      <Cell span={[1, 4, 8, 12]}>
        <nav className={css({ marginBottom: $theme.sizing.scale600 })}>
          {previousPost ? (
            <Link href={"/post/[slug]"} as={`/post/${previousPost.slug}`} passHref>
              <StyledLink>← {previousPost.title}</StyledLink>
            </Link>
          ) : (
            <div />
          )}
          {nextPost ? (
            <Link href={"/post/[slug]"} as={`/post/${nextPost.slug}`} passHref>
              <StyledLink>{nextPost.title} →</StyledLink>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </Cell>
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
