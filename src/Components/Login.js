import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./login.module.css";
import React from "react";
import { StoreActions2 } from "./Store/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userid } from "./Store/auth";
import bgimage from "../Assets/Elegant-Dark-Marbled-Texture-AI-Generated-4K-Wallpaper-1081x608.jpg";
import logimage from "../Assets/Screenshot 2025-03-09 181227.png";

import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Firebase instances
const Auth = getAuth();
const db = getFirestore();

const Login = () => {
  const user = auth.currentUser;
  const isauth = useSelector((state) => state.auth.isauth);
  const email = useSelector((state) => state.auth.id);
  const Dispatch = useDispatch();

  const [forgpass, setforgpass] = useState(false);

  const navigate = useNavigate();

  const toastify = () => {
    toast.success("logged in ");
  };

  async function handlesignup(e) {
    try {
      e.preventDefault();
      const obj = {
        Email: e.target.email.value,
        Password: e.target.password.value,
        Password2: e.target.password2.value,
      };
      if (obj.Password !== obj.Password2) {
        alert("password not matched");
        return;
      }
      await createUserWithEmailAndPassword(auth, obj?.Email, obj?.Password);
      toast.success("Account Created Successfully");
      navigate("/home");
    } catch (err) {
      alert(err);
      console.log(err + "erroer occured");
    }
  }
  async function hanldeSubmit(e) {
    try {
      const obj = {
        Email: e.target.email.value,
        Password: e.target.password.value,
      };
      e.preventDefault();

      const response = await signInWithEmailAndPassword(
        auth,
        obj?.Email,
        obj?.Password
      );
      const arr = obj.Email.split("");
      localStorage.setItem("token", response._tokenResponse.idToken);
      Dispatch(StoreActions2.login());
      Dispatch(StoreActions2.istoken());

      const fil_arr = arr.filter((ele, item) => ele !== "@" && ele !== ".");
      const fin_email = fil_arr.join("");

      localStorage.setItem("email", fin_email);
      Dispatch(userid(fin_email));
      toastify();
      navigate("/home");
    } catch (err) {
      alert(err);
      console.log(err + "erroer occured");
    }
  }
  const hanldetoggle = () => {
    if (isauth) {
      Dispatch(StoreActions2.logout());
    } else {
      Dispatch(StoreActions2.login());
    }
  };

  return (
    <>
      <img className={classes.bgimg} src={bgimage}></img>

      {!isauth && (
        <div className={classes.loginpage}>
          <div className={classes.form}>
            <form onSubmit={hanldeSubmit}>
              <img className="rounded-full size-48 ml-32" src={logimage}></img>

              <div>
                <h2 className="text-white text-3xl mb-2">Log in</h2>

                {/* <label htmlFor='username' className='text-white'>Username</label> */}

                {/* <label htmlFor='email' className='text-white'>Email</label> */}
                <input id="email" placeholder="Email" required></input>
                {/* <label htmlFor='password' className='text-white'>Password</label> */}
                <input
                  id="password"
                  placeholder="Password"
                  type="password"
                  required
                ></input>
                <button type="submit" className="mb-2">
                  Submit
                </button>
              </div>
            </form>
            <button
              style={{ background: "lightgreen" }}
              className={classes.create}
              onClick={() => {
                hanldetoggle();
              }}
            >
              Create A new account
            </button>

            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                setforgpass(!forgpass);
              }}
            >
              Forget Password
            </span>
            {forgpass && navigate("/forgetpassword")}
            <div />
          </div>
        </div>
      )}

      {isauth && (
        <div className={classes.loginpage}>
          <div className={classes.form}>
            <form onSubmit={handlesignup}>
              <div>
                <h2 className="text-white text-3xl mb-2">Sign Up</h2>
                <input
                  id="username"
                  placeholder="Name"
                  type="text"
                  required
                ></input>
                <input
                  id="email"
                  placeholder="Email"
                  type="email"
                  required
                ></input>
                <input
                  id="password"
                  placeholder="Password"
                  type="password"
                  minLength={6}
                  required
                ></input>
                <input
                  id="password2"
                  placeholder="Confirm Password"
                  type="password"
                  required
                ></input>
                <button type="submit " className="mb-2">
                  Submit
                </button>
              </div>
            </form>
            <button
              style={{ background: "lightgreen" }}
              onClick={() => {
                hanldetoggle();
              }}
            >
              ALready have an account
            </button>
          </div>
        </div>
      )}
      {/* <ToastContainer/> */}
    </>
  );
};
export default Login;
