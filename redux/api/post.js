import { POST_URL } from "./constants";

import { buildUrl } from "../../utils/helpers";
import axiosInstance from "../../utils/axiosInstance";

export const FetchPostApi = async ({ postSlugId, postSlugTitle, page = 1 }) => {
  let url = `${POST_URL}/${postSlugId}/${postSlugTitle}`;

  let params = { page };
  let newUrl = buildUrl(url, params);

  return await axiosInstance.get(newUrl);
};

export const FetchPostRelatedApi = async ({ postSlugId, postSlugTitle }) => {
  let url = `${POST_URL}/${postSlugId}/${postSlugTitle}/related`;

  return await axiosInstance.get(url);
};
