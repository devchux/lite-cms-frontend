import AddArticles from "../pages/app/articles/AddArticles";
import Articles from "../pages/app/articles";
import AppRoutes from "./AppRoutes";
import Auth from "../pages/authentication";
import AddVolunteer from "../pages/app/volunteers/AddVolunteer";
import Volunteer from "../pages/app/volunteers";
import Users from "../pages/app/users";
import AddUser from "../pages/app/users/AddUser";
import Photo from "../pages/app/photos/Photo";
import AddPhoto from "../pages/app/photos/AddPhoto";
import Books from "../pages/app/books";
import AddBook from "../pages/app/books/AddBook";
import Events from "../pages/app/events";
import AddEvent from "../pages/app/events/AddEvent";
import Contacts from "../pages/app/contacts";
import AddContact from "../pages/app/contacts/AddContact";
import Classes from "../pages/app/classes";
import AddClass from "../pages/app/classes/AddClass";
import Video from "../pages/app/videos";
import AddVideo from "../pages/app/videos/AddVideo";
import VideoList from "../pages/app/videos/VideoList";
import Audios from "../pages/app/audios";
import AddAudio from "../pages/app/audios/AddAudio";
import AudioList from "../pages/app/audios/AudioList";

export const routes = [
  {
    path: "/dashboard",
    component: AppRoutes,
    isLogin: false
  },
  {
    path: "/signin",
    component: Auth,
    isLogin: true
  },
  {
    path: "/register",
    component: Auth,
    isLogin: false
  },
];

export const appRoutes = [
  {
    path: "/posts",
    component: Articles,
    isEdit: false,
    isIndex: true,
  },
  {
    path: "/posts/add",
    component: AddArticles,
    isEdit: false,
    isIndex: false,
  },
  {
    path: "/posts/add/:id",
    component: AddArticles,
    isEdit: true,
    isIndex: false,
  },
  {
    path: "/volunteers",
    component: Volunteer,
    isEdit: false,
    isIndex: true,
  },
  {
    path: "/volunteers/add",
    component: AddVolunteer,
    isEdit: false,
    isIndex: false,
  },
  {
    path: "/volunteers/add/:id",
    component: AddVolunteer,
    isEdit: true,
    isIndex: false,
  },
  {
    path: "/users",
    component: Users,
    isEdit: false,
    isIndex: true,
  },
  {
    path: "/users/add",
    component: AddUser,
    isEdit: false,
    isIndex: false,
  },
  {
    path: "/users/add/:id",
    component: AddUser,
    isEdit: true,
    isIndex: false,
  },
  {
    path: "/photos",
    component: Photo,
    isEdit: false,
    isIndex: true,
  },
  {
    path: "/photos/add",
    component: AddPhoto,
    isEdit: false,
    isIndex: false,
  },
  {
    path: "/books",
    component: Books,
    isEdit: false,
    isIndex: true,
  },
  {
    path: "/books/add",
    component: AddBook,
    isEdit: false,
    isIndex: false,
  },
  {
    path: "/books/add/:id",
    component: AddBook,
    isEdit: true,
    isIndex: false,
  },
  {
    path: "/events",
    component: Events,
    isEdit: false,
    isIndex: true,
  },
  {
    path: "/events/add",
    component: AddEvent,
    isEdit: false,
    isIndex: false,
  },
  {
    path: "/events/add/:id",
    component: AddEvent,
    isEdit: true,
    isIndex: false,
  },
  {
    path: "/contacts",
    component: Contacts,
    isEdit: false,
    isIndex: true,
  },
  {
    path: "/contacts/add/:id",
    component: AddContact,
    isEdit: true,
    isIndex: false,
  },
  {
    path: "/classes",
    component: Classes,
    isEdit: false,
    isIndex: true,
  },
  {
    path: "/classes/add",
    component: AddClass,
    isEdit: false,
    isIndex: false,
  },
  {
    path: "/classes/add/:id",
    component: AddClass,
    isEdit: true,
    isIndex: false,
  },
  {
    path: "/videos",
    component: Video,
    isEdit: false,
    isIndex: true,
  },
  {
    path: "/videos/add",
    component: AddVideo,
    isEdit: false,
    isIndex: false,
  },
  {
    path: "/videos/add/:id",
    component: AddVideo,
    isEdit: true,
    isIndex: false,
  },
  {
    path: "/videos/list/:id",
    component: VideoList,
    isEdit: false,
    isIndex: false,
  },
  {
    path: "/audios",
    component: Audios,
    isEdit: false,
    isIndex: true,
  },
  {
    path: "/audios/add",
    component: AddAudio,
    isEdit: false,
    isIndex: false,
  },
  {
    path: "/audios/add/:id",
    component: AddAudio,
    isEdit: true,
    isIndex: false,
  },
  {
    path: "/audios/list/:id",
    component: AudioList,
    isEdit: false,
    isIndex: false,
  },
];
