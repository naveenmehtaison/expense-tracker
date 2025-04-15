import { AiFillHome, AiOutlineBarChart } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { MdSupportAgent } from "react-icons/md";
import { useDispatch } from "react-redux";
import  { Rightscreenaction } from "../Store/RightScreenReducer";
import { useSelector } from "react-redux";


const Sidebar = () => {
  const Theme = useSelector((state) => state.Theme.curstate);
  const dispatch = useDispatch();
  return (
    // <div className={`w-1/6 h-screen ${Theme==='white'? 'bg-gray-200': 'bg-gray-800' }  text-white p-6 flex flex-col gap-6 shadow-lg`}>
    //   <h2 className="text-2xl font-bold "> PennyPilot</h2>
    //   <ul className="mt-4 space-y-3">
    //     <li onClick={()=>{
    //         dispatch(Rightscreenaction.setright(1))}} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-all">
    //        <AiFillHome size={24} /> Home
    //     </li>
    //     <li onClick={()=>{
    //         dispatch(Rightscreenaction.setright(2))}} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-all">
    //       <AiOutlineBarChart size={24}  /> Analytics
    //     </li>
    //     <li onClick={()=>{
    //         dispatch(Rightscreenaction.setright(4))}} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-all">
    //       <FiSettings size={24} /> Settings
    //     </li>
    //     <li onClick={()=>{
    //         dispatch(Rightscreenaction.setright(3))}} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-all">
    //       <MdSupportAgent size={24} /> Support
    //     </li>

    //   </ul>
    // </div>
    <div className={`w-1/6 h-screen  left-0 ${Theme === 'white' ? 'bg-gray-100 text-gray-900' : 'bg-gray-800 text-white'} p-6 flex flex-col gap-6 shadow-lg`}>
  <h2 className="text-2xl font-bold">PennyPilot</h2>
  <ul className="mt-4 space-y-3">
    <li 
      onClick={() => dispatch(Rightscreenaction.setright(1))} 
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${Theme === 'white' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-700 hover:bg-gray-600'}`}
    >
      <AiFillHome size={24} /> 
      <span>Home</span>
    </li>
    <li 
      onClick={() => dispatch(Rightscreenaction.setright(2))} 
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${Theme === 'white' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-700 hover:bg-gray-600'}`}
    >
      <AiOutlineBarChart size={24} /> 
      <span>Analytics</span>
    </li>
    <li 
      onClick={() => dispatch(Rightscreenaction.setright(4))} 
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${Theme === 'white' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-700 hover:bg-gray-600'}`}
    >
      <FiSettings size={24} /> 
      <span>Settings</span>
    </li>
    <li 
      onClick={() => dispatch(Rightscreenaction.setright(3))} 
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${Theme === 'white' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-700 hover:bg-gray-600'}`}
    >
      <MdSupportAgent size={24} /> 
      <span>Support</span>
    </li>
  </ul>
</div>
  );
};

export default Sidebar;
