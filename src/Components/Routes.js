import { Route,Router,Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
const Myroutes=()=>{
    return(
        <Routes>
            <Route path='/home' element={<Home/>} />
            <Route path='/' element={<Login/>}/>

        </Routes>

    )
}
export default Myroutes