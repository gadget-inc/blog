import { useStyletron } from "baseui";
import { Heading } from "baseui/heading";
import { Cell } from "baseui/layout-grid";
import { ParagraphMedium } from "baseui/typography";
import { AuthorLink } from "components/AuthorLink";
import { Layout } from "components/Layout";
import { Row } from "components/Row";
import { SEO } from "components/Seo";
import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import { getSortedPosts, Post } from "utils/posts";
import { MetaLabel } from "../components/MetaLabel";

export default function Home(props: { posts: Post[] }) {
  const [css, $theme] = useStyletron();

  return (
    <Layout>
      <SEO title="All posts" />
      <Cell span={[1, 4, 8, 12]}>
        {props.posts.map((post) => (
          <article key={post.id} className={css({ marginBottom: $theme.sizing.scale600 })}>
            <header>
              <Row>
                <Link href={"/post/[slug]"} as={`/post/${post.slug}`} passHref>
                  <Heading as="a" $style={{ marginRight: $theme.sizing.scale600 }}>
                    {post.title}
                  </Heading>
                </Link>
                <ParagraphMedium $style={{ marginTop: $theme.sizing.scale0, marginBottom: $theme.sizing.scale0 }}>
                  {post.byline}
                </ParagraphMedium>
              </Row>
              <MetaLabel>
                By <AuthorLink author={post.author} /> on {new Date(post.publishedAt).toLocaleDateString()}
              </MetaLabel>
            </header>
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
