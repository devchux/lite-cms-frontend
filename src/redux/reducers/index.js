import { combineReducers } from "redux";
import { loginReducer } from "./login";
import { postsReducer } from "./posts";
import { usersReducer } from "./users";
import { photosReducer } from "./photos";
import { booksReducer } from "./books";
import { eventsReducer } from "./events";
import { volunteersReducer } from "./volunteers";
import { contactsReducer } from "./contacts";
import { classesReducer } from "./class";
import { videosReducer } from "./videos";
import { audiosReducer } from "./audios";

const reducers = combineReducers({
  member: loginReducer,
  users: usersReducer,
  posts: postsReducer,
  photos: photosReducer,
  books: booksReducer,
  events: eventsReducer,
  volunteers: volunteersReducer,
  contacts: contactsReducer,
  classes: classesReducer,
  videos: videosReducer,
  audios: audiosReducer,
})

export default reducers