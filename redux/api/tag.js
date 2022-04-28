import { TAG_URL } from "../api/constants";

import { buildUrl } from "../../utils/helpers";
import axiosInstance from "../../utils/axiosInstance";

export const FetchTagPostsApi = async ({ tag, page = 1 }) => {
  let url = `${TAG_URL}/${tag}`;

  let params = { page };
  let newUrl = buildUrl(url, params);

  return await axiosInstance.get(newUrl);
};
