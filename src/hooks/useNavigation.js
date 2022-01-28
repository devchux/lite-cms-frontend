import { useHistory, useLocation, useParams } from "react-router-dom";

export const useNavigation = () => {
  const history = useHistory();
  const { pathname: currentUrl } = useLocation();
  const { id: paramId } = useParams()

  const goTo = (url) => history.push(url);
  const refresh = () => goTo(currentUrl)
  return {
    goTo,
    currentUrl,
    paramId,
    refresh,
  };
};
