import { Route,Router,Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Form from "./Form";
const Myroutes=()=>{
    return(
        <Routes>
            <Route path='/home' element={<Home/>} />
            <Route path='/' element={<Login/>}/>
            <Route path = '/form' element={<Form/>}/>
            <Route path='/login' element={<Login/>}/>

        </Routes>

    )
}
export default Myroutes