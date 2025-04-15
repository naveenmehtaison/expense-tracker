import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { ThemeReduceraction } from "../Store/themeReducer";
function ToggleButton() {
    const Theme = useSelector((state) => state.Theme.curstate);
    const dispatch = useDispatch()
//   const [darkMode, setDarkMode] = useState(false); // Default: Light mode

  const toggleTheme = () => {
    dispatch(ThemeReduceraction.setdaymode())
  };

  return (
    <div className={`${Theme==='#1f2937' ? " text-white" : "bg-white text-black"} min-h-screen flex flex-col items-center justify-center p-4`} style={{backgroundColor:Theme}}>
      <h1 className="text-2xl font-bold">Theme Toggle Example</h1>
      
      {/* Toggle Button */}
      <button
        onClick={toggleTheme}
        className="mt-4 px-6 py-2 rounded-lg text-lg font-semibold 
                   transition-all duration-300 
                   bg-blue-500 text-white hover:bg-blue-600"
      >
        {Theme ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </div>
  );
}

export default ToggleButton;
