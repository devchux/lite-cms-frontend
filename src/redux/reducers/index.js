import { combineReducers } from "redux";
import { loginReducer } from "./login";
import { postsReducer } from "./posts";
import { usersReducer } from "./users";

const reducers = combineReducers({
  member: loginReducer,
  users: usersReducer,
  posts: postsReducer,
})

export default reducers;