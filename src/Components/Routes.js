import { Route, Router, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Form from "./Form";
import Forgetpassword from "./Forgetpassword";
import LandingPage from "./LandingPage/LandingPage";
const Myroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/" element={<LandingPage />} /> */}
      <Route path="/form" element={<Form />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgetpassword" element={<Forgetpassword />} />
    </Routes>
  );
};
export default Myroutes;
