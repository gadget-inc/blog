import { Client } from "blog-client";
export const Gadget = new Client({
  apiKey: process.env["GADGET_API_KEY"],
});

export interface Post {
  id: string;
  [key: string]: any;
}

export const getSortedPosts = async (): Promise<Post[]> => {
  return (await Gadget.posts.findMany({ sort: { publishedAt: "Descending" } })).map((record: any) => record.toJSON());
};

export async function getPostsSlugs(): Promise<string[]> {
  return (await Gadget.posts.findMany()).map((post: any) => post.slug);
}

export async function getPostBySlug(slug: string): Promise<{ post: Post; previousPost?: Post; nextPost?: Post }> {
  const post = (
    await Gadget.posts.findMany({
      filter: { slug: { equals: slug } },
    })
  )[0]?.toJSON();

  const nextPost = (
    await Gadget.posts.findMany({
      sort: { publishedAt: "Ascending" },
      filter: { publishedAt: { greaterThan: post.publishedAt } },
      first: 1,
    })
  )[0]?.toJSON();

  const previousPost = (
    await Gadget.posts.findMany({
      sort: { publishedAt: "Descending" },
      filter: { publishedAt: { greaterThan: post.publishedAt } },
      first: 1,
    })
  )[0]?.toJSON();

  return { post, previousPost, nextPost };
}
