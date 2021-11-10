export const useTopNav = () => {
  const toggleSideNav = () => {
    const sideNav = document.querySelector(".side-nav");
    sideNav.classList.toggle("close-nav");
  };

  return {
    toggleSideNav,
  };
};
