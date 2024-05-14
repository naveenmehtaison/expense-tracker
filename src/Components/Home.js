import Form from "./Form"
import { NavLink } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Expenseshower from "./Expenseshower"
import { useDispatch,useSelector } from "react-redux"
import { StoreActions2 } from "./Store/auth"

const Home=()=>{
    const Theme = useSelector((state)=>state.Theme.curstate)
    const Token = useSelector((state)=>state.auth.token)
    const Dispatch = useDispatch()
    const navigate = useNavigate()
    const [ form , setform ] = useState(false)
    const logout=()=>{
        localStorage.setItem('token','')
        localStorage.setItem('email','')
        Dispatch(StoreActions2.logout())
        Dispatch(StoreActions2.nottoken())
        navigate('/login')
    }

    async function verifyEmail(){
        try{
            const token = (Token.toString())
            console.log(typeof(token))
            const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBDR5SSxYk2jPHpBjbYZNPoa76PPAmRPdo',{
                requestType:'VERIFY_EMAIL',
                idToken:token

            })
        }
        catch(err){
            console.log('err',err)
            
        }
    }
    return(
        <div style={!Theme ? { backgroundColor: '#f0f0f0'} : {backgroundColor: "#292c35"}}>
            <h1>Welcome to expense Tracker</h1>
            <p>YOur profile is incomplete<NavLink to='/form'> <p style={{color:'blue', cursor:'pointer'}}>Click here to complete</p></NavLink></p>

            <button onClick={verifyEmail}>Verify Email</button>
            <button onClick={logout}>Log Out</button>
            <Expenseshower/>
        </div>

    )
}
export default Home