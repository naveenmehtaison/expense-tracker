import Form from "./Form"
import { NavLink } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const Home=()=>{

    const navigate = useNavigate()
    const [ form , setform ] = useState(false)
    const logout=()=>{
        localStorage.setItem('token','')
        localStorage.setItem('email','')
        navigate('/login')
    }
    async function verifyEmail(){
        try{
            const token = (localStorage.getItem('token')).toString()
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
        <>
            <h1>Welcome to expense Tracker</h1>
            <p>YOur profile is incomplete<NavLink to='/form'> <p style={{color:'blue', cursor:'pointer'}}>Click here to complete</p></NavLink></p>

            <button onClick={verifyEmail}>Verify Email</button>
            <button onClick={logout}>Log Out</button>
        </>

    )
}
export default Home