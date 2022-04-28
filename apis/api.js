import axios from "axios";
import { filterQuery } from "../utils/filter-query";

const API_ENDPOINT = process.env.API_ENDPOINT;

export async function api(method = "GET", path, { query } = {}) {
  let isAbsoluteURL = false;

  try {
    new URL(path);
    isAbsoluteURL = true;
  } catch (err) {}

  const endpoint = isAbsoluteURL ? path : `${API_ENDPOINT}/${path}`;

  if (method == "GET") {
    return await GetRequest(query, endpoint);
  } else {
    return PostRequest(params, headers, endpoint);
  }
}

async function PostRequest(params = {}, headers, endpoint) {
  try {
    const response = await axios.post(endpoint, params, { headers });

    if (response.status == 200) {
      return await response.data;
    } else {
      // https://github.com/developit/unfetch#caveats
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  } catch (error) {
    return error.response.data;
  }
}

async function GetRequest(query, endpoint) {
  const filteredQuery = query ? filterQuery(query) : {};

  const url = `${encodeURI(endpoint)}${
    Object.keys(filteredQuery).length > 0
      ? `?${new URLSearchParams(filteredQuery)}`
      : ""
  }`;

  try {
    const res = await axios.get(url);
    const data = res.data;

    if (data.error) {
      throw data;
    }

    return data;
  } catch (err) {
    console.error(err);
  }
}
