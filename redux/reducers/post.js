import {
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILED,
  RESET_POST,
} from "../actions/types";

const initialState = {
  loading: false,
  items: {},
};

export default function PostsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POST_REQUEST:
      var newState = {
        loading: true,
      };

      return { ...state, ...newState };

    case FETCH_POST_SUCCESS:
      var { items } = action.payload;
      var newState = {
        loading: false,
        items,
      };

      return { ...state, ...newState };

    case FETCH_POST_FAILED:
      var newState = {
        loading: false,
      };

      return { ...state, ...newState };

    case RESET_POST:
      return initialState;

    default:
      return state;
  }
}
