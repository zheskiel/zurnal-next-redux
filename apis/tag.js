import { api } from "./api";

export const getTagPosts = async ({ tag, page = null }) => {
  let tagQuery = {};

  if (page !== null) tagQuery.page = page;

  return await api(`GET`, `tag/${tag}`, {
    query: tagQuery,
  });
};
