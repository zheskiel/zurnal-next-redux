import { api } from "./api";

export const getCategory = async ({ slug, page = null }) => {
  let catQuery = {};

  if (page !== null) catQuery.page = page;

  return await api(`GET`, `category/${slug}`, {
    query: catQuery,
  });
};
