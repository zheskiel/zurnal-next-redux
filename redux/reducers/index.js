import { combineReducers } from "redux";

import post from "./post";
import posts from "./posts";
import tag from "./tag";

const rootReducer = combineReducers({
  post,
  posts,
  tag,
});

export default rootReducer;
