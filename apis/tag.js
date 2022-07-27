import { api } from "./api";

export const getTagPosts = async ({ tag, page = null }) => {
  let query = {};

  if (page !== null) query.page = page;

  return await api(`GET`, `tag/${tag}`, {
    query,
  });
};
