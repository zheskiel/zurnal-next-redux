import { api } from "./api";

export const getCategory = async ({ slug, page = null }) => {
  let query = {};

  if (page !== null) query.page = page;

  return await api(`GET`, `category/${slug}`, {
    query,
  });
};
