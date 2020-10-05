import { Client } from "blog-client";
export const Gadget = new Client({
  apiKey: process.env["GADGET_API_KEY"],
});

export const getSortedPosts = async () => {
  return await Gadget.posts.findMany({ sort: { publishedAt: "Descending" } });
};

export async function getPostsSlugs() {
  return (await Gadget.posts.findMany()).map((post) => post.slug);
}

export async function getPostBySlug(slug) {
  const post = (
    await Gadget.posts.findMany({
      filter: { slug: { equals: slug } },
    })
  )[0];

  const nextPost = (
    await Gadget.posts.findMany({
      sort: { publishedAt: "Ascending" },
      filter: { publishedAt: { greaterThan: post.publishedAt } },
      first: 1,
    })
  )[0];

  const previousPost = (
    await Gadget.posts.findMany({
      sort: { publishedAt: "Descending" },
      filter: { publishedAt: { greaterThan: post.publishedAt } },
      first: 1,
    })
  )[0];

  return { post, previousPost, nextPost };
}
