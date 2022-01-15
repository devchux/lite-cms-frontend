import { combineReducers } from "redux";
import { loginReducer } from "./login";
import { postsReducer } from "./posts";
import { usersReducer } from "./users";
import { photosReducer } from "./photos";

const reducers = combineReducers({
  member: loginReducer,
  users: usersReducer,
  posts: postsReducer,
  photos: photosReducer,
})

export default reducers