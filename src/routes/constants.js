import AddArticles from "../pages/app/articles/AddArticles";
import Articles from "../pages/app/articles";
import AppRoutes from "./AppRoutes";
import Auth from "../pages/authentication";
import AddVolunteer from "../pages/app/volunteers/AddVolunteer";
import Volunteer from "../pages/app/volunteers";
import Users from "../pages/app/users";
import AddUser from "../pages/app/users/AddUser";

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
  },
  {
    path: "/posts/add",
    component: AddArticles,
  },
  {
    path: "/volunteers",
    component: Volunteer,
  },
  {
    path: "/volunteers/add",
    component: AddVolunteer,
  },
  {
    path: "/users",
    component: Users,
  },
  {
    path: "/users/add",
    component: AddUser,
  },
];
