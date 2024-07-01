import axios from 'axios' 
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import classes from './login.module.css'
import React from 'react'
import { StoreActions2 } from "./Store/auth";
import Forgetpassword from './Forgetpassword'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { login, logout, istoken, nottoken, userid, notuserid } from './Store/auth'



const Login=()=>{


    const isauth =  useSelector(state=>state.auth.isauth)
    const email =  useSelector(state=>state.auth.id)
    const Dispatch = useDispatch()
    const [login,setlogin] = useState(true)
    const [forgpass,setforgpass] = useState(false)

    const navigate = useNavigate()

    const toastify=()=>{
      toast.success('logged in ')
    }
    const notify = () => {
      toast("Wow so easy!")
      console.log('notify called')
      // alert('notifyyed')
      

    };

    async function handlesignup(e){
      try{
        e.preventDefault()
        const obj = {Email:e.target.email.value, Password:e.target.password.value, Password2:e.target.password2.value}
        console.log(obj)
        if(obj.Password!==obj.Password2){
          
          console.log('password does not match')
          alert('password not matched')
            return
        }

        console.log(obj)
        const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBDR5SSxYk2jPHpBjbYZNPoa76PPAmRPdo', {
            email: obj.Email,
            password: obj.Password,
            returnSecureToken: true 
        })
        console.log('signed up succesfu;;y')
        alert('account created')
      }
      catch(err){
        alert(err)
          console.log(err + 'erroer occured')
             
      }
    }
    async function hanldeSubmit(e){
        try{
          const obj = {Email:e.target.email.value, Password:e.target.password.value}
            e.preventDefault()

            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBDR5SSxYk2jPHpBjbYZNPoa76PPAmRPdo', {
                email: obj.Email,
                password: obj.Password,
                returnSecureToken: true 
            })
            const arr = obj.Email.split("")
            console.log(response.data.idToken)
            localStorage.setItem('token',response.data.idToken)
            Dispatch(StoreActions2.login())
            Dispatch(StoreActions2.istoken())
            

            const fil_arr = arr.filter((ele,item)=>(
                ele!= '@' && ele!='.'
            ))
            const fin_email = fil_arr.join('')
            console.log(fin_email)
            console.log(fin_email)
            localStorage.setItem('email',fin_email)
            Dispatch(userid(fin_email))
            console.log(email,isauth)
            console.log(fin_email)
            toastify()
            navigate('/home')

        }
        catch(err){
          alert(err)
            console.log(err + 'erroer occured')
        }

    }
    const hanldetoggle=() => { 
      if(isauth){
        
        Dispatch(StoreActions2.logout()) 
        console.log('inside toggle' , isauth)
        
      }
      else{
        Dispatch(StoreActions2.login())
        console.log('else' , isauth)
     }
    }
    
    return(
        <>
  
          { !isauth && 
            <div className={classes.loginpage}>
              <div className={classes.form}>
              

                <form onSubmit={hanldeSubmit} >
              
                    <div>
                      <h2>Log in</h2>
                      <label htmlFor='username'>Username</label>
                      <input id='username' required></input>
                      <label htmlFor='email'>Email</label>
                      <input id='email' required></input>
                      <label htmlFor='password'>Password</label>
                      <input id='password'  type='password'required></input>
                      <button type='submit'>Submit</button>
                    </div>
                </form>
                <button style={{background:'lightgreen'}} onClick={()=>{hanldetoggle()}}>Create A new account</button>

                    <span style={{cursor:'pointer'}} onClick={()=>{setforgpass(!forgpass)}} >Forget Password</span>
                    {forgpass && navigate('/forgetpassword')}
                    <div/>
              </div>

            </div>
          }


          { isauth && 
          <div className={classes.loginpage}>
            <div className={classes.form}>
              <form onSubmit={handlesignup} >
              <div >
                <h2>Sign Up</h2>
                <label htmlFor='username'>Name</label>
                <input id='username' type='text'  required></input>
                <label htmlFor='email'>Email</label>
                <input id='email' type='email' required></input>
                <label htmlFor='password'>Password</label>
                <input id='password' type='password' minLength={6} required></input>
                <label htmlFor='password2'>Confirm Password</label>
                <input id='password2' type='password' required></input>
                <button type='submit'>Submit</button>
              </div>
            </form>
            <button  style={{background:'lightgreen'}} onClick={()=>{hanldetoggle()}}>ALready have an account</button>

            </div>
            
          </div>}
          {/* <ToastContainer/> */}
        </>

    )
}
export default Login