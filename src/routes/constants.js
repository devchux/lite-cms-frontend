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

export const routes = [
  {
    path: "/dashboard",
    component: AppRoutes,
  },
  {
    path: "/signin",
    component: Auth,
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
  // {
  //   path: "/volunteers",
  //   component: Volunteer,
  //   isEdit: false,
  //   isIndex: true,
  // },
  // {
  //   path: "/volunteers/add",
  //   component: AddVolunteer,
  //   isEdit: false,
  //   isIndex: false,
  // },
  // {
  //   path: "/volunteers/add/:id",
  //   component: AddVolunteer,
  //   isEdit: true,
  //   isIndex: false,
  // }
];
