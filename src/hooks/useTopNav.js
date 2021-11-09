export const useTopNav = () => {
  const toggleSideNav = () => {
    const sideNav = document.querySelector(".side-nav");
    const pageWrapper = document.querySelector(".page-wrapper");
    sideNav.classList.toggle("close-nav");
    pageWrapper.classList.toggle("container");
    pageWrapper.classList.toggle("close-nav");
  };

  return {
    toggleSideNav,
  };
};
