import { useState, useEffect } from "react";
import Routes from "./routes";
import Loader from "./components/loader";

const App = () => {
  const [delay, setDelay] = useState(true);
  useEffect(() => setTimeout(() => setDelay(false), 3000), []);
  return delay ? <Loader /> : <Routes />;
};

export default App;
