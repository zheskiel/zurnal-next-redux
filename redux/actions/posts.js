import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILED,
  RESET_POSTS,
} from "./types";

import { FetchPostsApi } from "../api/posts";

export const FetchPosts = (params) => async (dispatch) => {
  dispatch(FetchPostsRequest());

  await FetchPostsApi(params)
    .then((response) => response.data)
    .then((result) => {
      dispatch(FetchPostsSuccess(result));
    });
};

const FetchPostsRequest = () => {
  return {
    type: FETCH_POSTS_REQUEST,
  };
};

const FetchPostsSuccess = (result) => {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: result,
  };
};

const FetchPostsFailed = (result) => {
  return {
    type: FETCH_POSTS_FAILED,
    payload: result,
  };
};

export const ResetPosts = () => {
  return {
    type: RESET_POSTS,
  };
};
