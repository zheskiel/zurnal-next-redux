import {
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILED,
  RESET_POST,
} from "./types";

import { FetchPostApi } from "../api/post";

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
