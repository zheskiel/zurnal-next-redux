import { api } from "./api";

export const getPosts = async ({
  page = 1,
  category = null,
  username = null,
}) => {
  let query = {
    page: page,
  };

  if (category !== null) query.category = category;
  if (username !== null) query.username = username;

  return await api(`GET`, "posts", { query });
};

export const getPost = async ({ postSlugId, postSlugTitle, page = null }) => {
  let query = {};

  if (page !== null) query.page = page;

  return await api(`GET`, `post/${postSlugId}/${postSlugTitle}`, {
    query,
  });
};

export const getRelatedPosts = async ({ postSlugId, postSlugTitle }) => {
  let query = {};

  return await api(`GET`, `related/${postSlugId}/${postSlugTitle}`, {
    query,
  });
};
