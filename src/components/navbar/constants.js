import {
  faBlog,
  faCog,
  faHandsHelping,
  faSignOutAlt,
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
      icon: faCog,
      title: "Settings",
      link: "/dashboard/settings",
    },
  ],
  [
    {
      icon: faSignOutAlt,
      title: "Logout",
    },
  ],
];
