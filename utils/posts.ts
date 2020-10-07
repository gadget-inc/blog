import { Client } from "@gadget-client/blog";
export const Gadget = new Client({
  apiKey: process.env["GADGET_API_KEY"],
});

export interface Post {
  id: string;
  [key: string]: any;
}

export const getSortedPosts = async (): Promise<Post[]> => {
  return (
    await Gadget.posts.findMany({ filter: { publishedAt: { isSet: true } }, sort: { publishedAt: "Descending" } })
  ).map((record: any) => record.toJSON());
};

export async function getPostsSlugs(): Promise<string[]> {
  return (await Gadget.posts.findMany()).map((post: any) => post.slug);
}

export async function getPostBySlug(slug: string): Promise<{ post: Post; author: any; previousPost?: Post; nextPost?: Post }> {
  const post = (
    await Gadget.posts.findMany({
      filter: { slug: { equals: slug } },
    })
  )[0]?.toJSON();

  const author = (await Gadget.authors.findOne(post.author.id)).toJSON();

  const nextPost =
    (
      await Gadget.posts.findMany({
        sort: { publishedAt: "Ascending" },
        filter: { publishedAt: { greaterThan: post.publishedAt } },
        first: 1,
      })
    )[0]?.toJSON() || null;

  const previousPost =
    (
      await Gadget.posts.findMany({
        sort: { publishedAt: "Descending" },
        filter: { publishedAt: { lessThan: post.publishedAt } },
        first: 1,
      })
    )[0]?.toJSON() || null;

  return { post, author, previousPost, nextPost };
}
