import {
  FETCH_TAG_POSTS_REQUEST,
  FETCH_TAG_POSTS_SUCCESS,
  FETCH_TAG_POSTS_FAILED,
  RESET_TAG_POSTS,
} from "../actions/types";

import { FetchTagPostsApi } from "../api/tag";

export const FetchTagPosts = (params) => async (dispatch) => {
  dispatch(FetchTagPostsRequest());

  await FetchTagPostsApi(params)
    .then((response) => response.data)
    .then((result) => {
      dispatch(FetchTagPostsSuccess(result));
    });
};

const FetchTagPostsRequest = () => {
  return {
    type: FETCH_TAG_POSTS_REQUEST,
  };
};

const FetchTagPostsSuccess = (result) => {
  return {
    type: FETCH_TAG_POSTS_SUCCESS,
    payload: result,
  };
};

const FetchTagPostsFailed = (result) => {
  return {
    type: FETCH_TAG_POSTS_FAILED,
    payload: result,
  };
};

export const ResetTagPosts = () => {
  return {
    type: RESET_TAG_POSTS,
  };
};
