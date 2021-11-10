import {
  faBlog,
  faHandsHelping,
  faSignOutAlt,
  faUser,
  faVideo,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";

export const sideNavItems = [
  [
    {
      icon: faBlog,
      title: "Posts",
      link: "/dashboard/posts",
    },
    {
      icon: faVolumeUp,
      title: "Audios",
      link: "/dashboard/audios",
    },
    {
      icon: faVideo,
      title: "Videos",
      link: "/dashboard/videos",
    },
    {
      icon: faHandsHelping,
      title: "Volunteers",
      link: "/dashboard/volunteers",
    },
    {
      icon: faUser,
      title: "Users",
      link: "/dashboard/users",
    },
  ],
  [
    {
      icon: faSignOutAlt,
      title: "Logout",
    },
  ],
];
