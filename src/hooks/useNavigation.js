import { useHistory, useLocation } from "react-router-dom";

export const useNavigation = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  const goTo = (url) => history.push(url);
  return {
    goTo,
    currentUrl: pathname,
  };
};
