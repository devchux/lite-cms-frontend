import {
  faBlog,
  faBook,
  faClipboard,
  faHandsHelping,
  faMailBulk,
  faPhotoVideo,
  faProjectDiagram,
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
      icon: faPhotoVideo,
      title: "Photos",
      link: "/dashboard/photos",
    },
    {
      icon: faBook,
      title: "Books",
      link: "/dashboard/books",
    },
    {
      icon: faProjectDiagram,
      title: "Events",
      link: "/dashboard/events",
    },
    {
      icon: faHandsHelping,
      title: "Volunteers",
      link: "/dashboard/volunteers",
    },
    {
      icon: faClipboard,
      title: "Classes",
      link: "/dashboard/class",
    },
    {
      icon: faMailBulk,
      title: "Contacts",
      link: "/dashboard/contacts",
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
