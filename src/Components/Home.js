import Form from "./Form"
import { NavLink } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Expenseshower from "./Expenseshower"
import { useDispatch,useSelector } from "react-redux"
import { StoreActions2 } from "./Store/auth"
import { Logo } from "./Utilities/types"

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
            const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBzTz45cN1TkXStJ_HeGJ00t4OQJ8uY6wY',{
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
            <div className='bg-red-800 h-20 p-6 items-center justify-center font-semibold text-4xl flex '>
                <img className="h-12 " src={Logo} alt="Logo"></img>
                <p>Welcome To Expense Tracker</p>
                <button className="bg-yellow-400 px-1 text-xl py-1 ml-40 absolute right-0 m-2 rounded-lg" onClick={logout} >Log Out</button>

                

                
                
            </div>
            
            <div style={!Theme ? { backgroundColor: '#f0f0f0'} : {backgroundColor: "#292c35"}}>
                
                
                <div className="bg-sky">
                <p>YOur profile is incomplete<NavLink to='/form'> <p style={{color:'blue', cursor:'pointer'}}>Click here to complete</p></NavLink></p>

                <button className = 'bg-blue-400 px-1 text-xl py-1 ml-40 absolute right-0 m-2 rounded-full' onClick={verifyEmail}>Verify Email</button>
                
                </div>
                
            </div>
            <div>
            <Expenseshower/>
            </div>
        </>

    )
}
export default Home