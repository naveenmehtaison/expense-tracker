import classes from './login.module.css'
import axios from 'axios'
const Forgetpassword=()=>{
    async function hanldeforgetpassword(e){
        try{
          const res = axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBDR5SSxYk2jPHpBjbYZNPoa76PPAmRPdo',{
            requestType:"PASSWORD_RESET",
            email:e.target.email.value
            
          }

        )
        alert('check your email')
  
        }
        catch(err){
            alert(err)
  
        }
      }
    return(
        <>
            <div className={classes.loginpage}>
                <div className={classes.form}>
                    <form onSubmit={hanldeforgetpassword}> 
                        <label htmlFor='email'>Email</label>
                        <input id='email' required></input>
                        {/* <label htmlFor='password'>Password</label>
                        <input id='password' required></input> */}
                        <button type='submit'>Submit</button>
                
                

                    </form>  
                </div>
            </div>     
        
        </>
    )
}
export default Forgetpassword