import { combineReducers } from "redux";

import post from "./post";
import posts from "./posts";
import tag from "./tag";
import theme from "./theme";

const rootReducer = combineReducers({
  post,
  posts,
  tag,
  theme,
});

export default rootReducer;
