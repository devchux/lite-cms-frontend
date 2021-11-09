import SideNav from "../components/navbar/SideNav";
import TopNav from "../components/navbar/TopNav";
import Title from "../components/titles/Title";
import { useNavigation } from "../hooks/useNavigation";
import "./scss/layout.scss";

const Layout = ({ children }) => {
  const { goTo, currentUrl } = useNavigation();
  let urlToArray = currentUrl.split("/");
  const hasAdd = urlToArray.includes("add");

  console.log(urlToArray)

  return (
    <div className="layout">
      <SideNav />
      <div className="right-side">
        <TopNav />
        <div className="main">
          <Title
            title={urlToArray[2].toLocaleUpperCase()}
            isAdd={hasAdd}
            isSettings={urlToArray.includes('settings')}
            buttonClick={() => {
              if (hasAdd) {
                urlToArray.pop();
                return goTo(urlToArray.join("/"));
              }
              return goTo(`${currentUrl}/add`);
            }}
          />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
