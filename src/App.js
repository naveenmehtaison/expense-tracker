import logo from "./logo.svg";
import "./App.css";
import Login from "./Components/Login";
import { BrowserRouter, Route } from "react-router-dom";
import Myroutes from "./Components/Routes";
import React from "react";
import Form from "./Components/Form";
// import Login from './Components/Login';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Myroutes>
        <Login />
      </Myroutes>
      <ToastContainer />
    </>
  );
}

export default App;
