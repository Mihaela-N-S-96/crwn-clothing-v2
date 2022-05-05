import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentiocation from "./routes/authentication/authentication.component";

const NewComp = () => {
  return <h1>I am a new component!</h1>;
};
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<NewComp />} />
        <Route path="auth" element={<Authentiocation />} />
      </Route>
    </Routes>
  );
};

export default App;
