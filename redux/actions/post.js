import {
  FETCH_POST_RELATED_REQUEST,
  FETCH_POST_RELATED_SUCCESS,
  FETCH_POST_RELATED_FAILED,
  RESET_POST_RELATED,
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILED,
  RESET_POST,
} from "./types";

import { FetchPostApi, FetchPostRelatedApi } from "../api/post";

export const FetchPost = (params) => async (dispatch) => {
  dispatch(FetchPostRequest());

  await FetchPostApi(params)
    .then((response) => response.data)
    .then((result) => {
      dispatch(FetchPostSuccess(result));
    });
};

const FetchPostRequest = () => {
  return {
    type: FETCH_POST_REQUEST,
  };
};

const FetchPostSuccess = (result) => {
  return {
    type: FETCH_POST_SUCCESS,
    payload: result,
  };
};

const FetchPostFailed = (result) => {
  return {
    type: FETCH_POST_FAILED,
    payload: result,
  };
};

export const ResetPost = () => {
  return {
    type: RESET_POST,
  };
};

export const FetchPostRelated = (params) => async (dispatch) => {
  dispatch(FetchPostRelatedRequest());

  await FetchPostRelatedApi(params)
    .then((response) => response.data)
    .then((result) => {
      dispatch(FetchPostRelatedSuccess(result));
    });
};

const FetchPostRelatedRequest = () => {
  return {
    type: FETCH_POST_RELATED_REQUEST,
  };
};

const FetchPostRelatedSuccess = (result) => {
  return {
    type: FETCH_POST_RELATED_SUCCESS,
    payload: result,
  };
};

const FetchPostRelatedFailed = (result) => {
  return {
    type: FETCH_POST_RELATED_FAILED,
    payload: result,
  };
};

export const ResetPostRelated = () => {
  return {
    type: RESET_POST_RELATED,
  };
};
