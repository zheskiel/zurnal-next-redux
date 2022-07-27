import { api } from "./api";

export const getUser = async ({ username, page = null }) => {
  let query = {};

  if (page !== null) query.page = page;

  return await api(`GET`, `user/${username}`, {
    query,
  });
};
