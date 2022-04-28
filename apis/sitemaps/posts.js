import { api } from "../api";

export const getCategoriesSitemap = async () => {
  return await api(`GET`, "categories/sitemap");
};

export const getPostsSitemap = async () => {
  return await api(`GET`, "posts/sitemap");
};

export const getPostsByIdSitemap = async (id) => {
  return await api(`GET`, `posts/sitemap-post/${id}`);
};
