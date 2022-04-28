import { POSTS_URL } from "./constants";

import { buildUrl } from "../../utils/helpers";
import axiosInstance from "../../utils/axiosInstance";

export const FetchPostsApi = async (params) => {
  let url = POSTS_URL;
  let newUrl = buildUrl(url, params);

  return await axiosInstance.get(newUrl);
};
