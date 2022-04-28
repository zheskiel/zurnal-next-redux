import { api } from "./api";

export const getPosts = async ({
  page = 1,
  category = null,
  username = null,
}) => {
  let postQuery = {
    page: page,
  };

  if (category !== null) postQuery.category = category;
  if (username !== null) postQuery.username = username;

  return await api(`GET`, "posts", { query: postQuery });
};

export const getPost = async ({ postSlugId, postSlugTitle, page = null }) => {
  let postQuery = {};

  if (page !== null) postQuery.page = page;

  return await api(`GET`, `post/${postSlugId}/${postSlugTitle}`, {
    query: postQuery,
  });
};

export const getRelatedPosts = async ({ postSlugId, postSlugTitle }) => {
  let postQuery = {};

  return await api(`GET`, `related/${postSlugId}/${postSlugTitle}`, {
    query: postQuery,
  });
};
