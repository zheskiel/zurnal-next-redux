import {
  FETCH_TAG_POSTS_REQUEST,
  FETCH_TAG_POSTS_SUCCESS,
  FETCH_TAG_POSTS_FAILED,
  RESET_TAG_POSTS,
} from "../actions/types";

const initialState = {
  loading: false,
  items: {},
};

export default function TagPostsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TAG_POSTS_REQUEST:
      var newState = {
        loading: true,
      };

      return { ...state, ...newState };

    case FETCH_TAG_POSTS_SUCCESS:
      var { items } = action.payload;
      var newState = {
        loading: false,
        items,
      };

      return { ...state, ...newState };

    case FETCH_TAG_POSTS_FAILED:
      var newState = {
        loading: false,
      };

      return { ...state, ...newState };

    case RESET_TAG_POSTS:
      return initialState;

    default:
      return state;
  }
}
