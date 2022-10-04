import {
  FETCH_POST_RELATED_REQUEST,
  FETCH_POST_RELATED_SUCCESS,
  FETCH_POST_RELATED_FAILED,
  RESET_POST_RELATED,
} from "../actions/types";

const initialState = {
  loading: false,
  items: {},
};

export default function PostRelatedReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POST_RELATED_REQUEST:
      var newState = {
        loading: true,
      };

      return { ...state, ...newState };

    case FETCH_POST_RELATED_SUCCESS:
      var { items } = action.payload;
      var newState = {
        loading: false,
        items,
      };

      return { ...state, ...newState };

    case FETCH_POST_RELATED_FAILED:
      var newState = {
        loading: false,
      };

      return { ...state, ...newState };

    case RESET_POST_RELATED:
      return initialState;

    default:
      return state;
  }
}
