import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILED,
  RESET_POSTS,
} from "../actions/types";

const initialState = {
  loading: false,
  items: {},
};

export default function PostsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      var newState = {
        loading: true,
      };

      return { ...state, ...newState };

    case FETCH_POSTS_SUCCESS:
      var { items } = action.payload;
      var newState = {
        loading: false,
        items,
      };

      return { ...state, ...newState };

    case FETCH_POSTS_FAILED:
      var newState = {
        loading: false,
      };

      return { ...state, ...newState };

    case RESET_POSTS:
      return initialState;

    default:
      return state;
  }
}
