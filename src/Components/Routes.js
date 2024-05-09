import { Route,Router,Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Form from "./Form";
import Forgetpassword from "./Forgetpassword";
const Myroutes=()=>{
    return(
        <Routes>
            <Route path='/home' element={<Home/>} />
            <Route path='/' element={<Login/>}/>
            <Route path = '/form' element={<Form/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/forgetpassword' element={<Forgetpassword/>}/>

        </Routes>

    )
}
export default Myroutes