import { combineReducers } from "redux";
import { loginReducer } from "./login";
import { postsReducer } from "./posts";
import { usersReducer } from "./users";
import { photosReducer } from "./photos";
import { booksReducer } from "./books";
import { eventsReducer } from "./events";
import { volunteersReducer } from "./volunteers";

const reducers = combineReducers({
  member: loginReducer,
  users: usersReducer,
  posts: postsReducer,
  photos: photosReducer,
  books: booksReducer,
  events: eventsReducer,
  volunteers: volunteersReducer,
})

export default reducers