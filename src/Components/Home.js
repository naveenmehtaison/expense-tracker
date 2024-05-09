import Form from "./Form"
import { NavLink } from "react-router-dom"
import { useState } from "react"
const Home=()=>{
    const [ form , setform ] = useState(false)
    return(
        <>
            <h1>Welcome to expense Tracker</h1>
            <p>YOur profile is incomplete<NavLink to='/form'> <p style={{color:'blue', cursor:'pointer'}}>Click here to complete</p></NavLink></p>

        
        </>

    )
}
export default Home