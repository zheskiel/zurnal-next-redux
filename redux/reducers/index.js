import { combineReducers } from "redux";

import post from "./post";
import posts from "./posts";
import related from "./related";
import tag from "./tag";
import theme from "./theme";

const rootReducer = combineReducers({
  post,
  posts,
  related,
  tag,
  theme,
});

export default rootReducer;
