import Form from "./Form";
import { FaDownload, FaFileDownload } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Expenseshower from "./Expenseshower";
import { useDispatch, useSelector } from "react-redux";
import { StoreActions2 } from "./Store/auth";
import Logo from "../Assets/Screenshot 2025-03-09 181227.png";
import Sidebar from "./LeftSideBar/LeftSideBar";
import Analytics from "./Analytics/Analytics";
import Support from "./Support/Support";
import Settings from "./Settings/Settings";
import { FiDownload, FiLogOut } from "react-icons/fi";
import { usePDF } from "react-to-pdf";
import FileDownloader from "./PremiumActivities/FileDownloader";
import Income from "./Income/Income";

const Home = () => {
  const currentRight = useSelector((state) => state.Rightscreen.curstate);
  const Theme = useSelector((state) => state.Theme.curstate);
  const Token = useSelector((state) => state.auth.token);
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setform] = useState(false);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const expenseRedux = useSelector((state) => state.expense.arr);
  const logout = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("email", "");
    Dispatch(StoreActions2.logout());
    Dispatch(StoreActions2.nottoken());
    navigate("/login");
  };

  async function verifyEmail() {
    try {
      const token = Token.toString();
      const res = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBzTz45cN1TkXStJ_HeGJ00t4OQJ8uY6wY",
        {
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }
      );
    } catch (err) {
      console.log("err", err);
    }
  }
  const HandlePdfDownload = () => {
    console.log("handlepdfdownload");

    return <FileDownloader props={expenseRedux} />;
  };

  return (
    <>
      <div
        className={`  h-30 p-6 gap-2 items-center justify-between font-semibold text-4xl outline-white flex ${
          Theme === "white"
            ? "bg-gray-100 text-gray-900"
            : "bg-gray-800 text-white"
        } border-b-gray-500 border-black shadow-lg rounded-md`}
        style={{ border: "2px solid gray" }}
      >
        <img className="h-12 rounded-md" src={Logo} alt="Logo"></img>
        <p>Welcome To Penny Pilot</p>

        <div className="gap-4 flex flex-row">
          {/* <button className="px-1 text-xl py-1 p-2  m-2 rounded-lg">Buy Premium</button> */}
          <FileDownloader
            className="px-1 text-xl p-2  m-2 rounded-lg"
            props={expenseRedux}
          />
          <button
            className=" mt-4 px-1 text-2xl flex gap-1  p-2   rounded-lg"
            onClick={logout}
          >
            <FiLogOut className="m-1" /> Log Out
          </button>
        </div>
      </div>

      <div
        style={
          !Theme
            ? { backgroundColor: "#f0f0f0" }
            : { backgroundColor: "#292c35" }
        }
      >
        <div className="bg-sky">
          {/* <p>YOur profile is incomplete<NavLink to='/form'> <p style={{color:'blue', cursor:'pointer'}}>Click here to complete</p></NavLink></p> */}

          {/* <button className = 'bg-blue-400 px-1 text-xl py-1 ml-40 absolute right-0 m-2 rounded-full' onClick={verifyEmail}>Verify Email</button> */}
        </div>
      </div>

      <div className="flex flex-row w-full h-full">
        <Sidebar />
        <div className="flex-1 ">
          {currentRight === 1 && (
            <Expenseshower HandlePdfDownload={HandlePdfDownload} />
          )}
          {currentRight === 2 && <Analytics />}
          {currentRight == 3 && <Support />}
          {currentRight == 4 && <Settings />}
          {currentRight == 5 && <Income />}
        </div>
      </div>
    </>
  );
};
export default Home;
