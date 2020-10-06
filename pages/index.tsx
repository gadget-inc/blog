import { Heading } from "baseui/heading";
import { Cell } from "baseui/layout-grid";
import { Caption1 } from "baseui/typography";
import { Layout } from "components/Layout";
import { SEO } from "components/Seo";
import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";
import { getSortedPosts, Post } from "utils/posts";

export default function Home(props: { posts: Post[] }) {
  return (
    <Layout>
      <SEO title="All posts" />
      <Cell span={[1, 4, 8, 12]}>
        {props.posts.map((post) => (
          <article key={post.id}>
            <header>
              <Link href={"/post/[slug]"} as={`/post/${post.slug}`} passHref>
                <Heading as="a">{post.title}</Heading>
              </Link>
              <Caption1>{post.publishedAt}</Caption1>
            </header>
            <section>
              <ReactMarkdown escapeHtml={false} source={post.body.markdowsn} />
            </section>
          </article>
        ))}
      </Cell>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getSortedPosts();

  return {
    props: {
      posts,
    },
  };
};
