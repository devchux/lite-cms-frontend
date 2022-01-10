import { useState, useEffect } from "react";
import Routes from "./routes";
import Loader from "./components/loader";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

export { NotificationManager };

const App = () => {
  const [delay, setDelay] = useState(true);
  useEffect(() => {
    const loadTime = setTimeout(() => setDelay(false), 3000);
    return () => clearTimeout(loadTime)
  }, []);
  return delay ? (
    <Loader />
  ) : (
    <>
      <Routes />
      <NotificationContainer />
    </>
  );
};

export default App;
