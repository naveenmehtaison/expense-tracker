import axios from "axios"
import { useEffect } from "react"
import { useRef } from "react"

const Form = ()=>{
    const Ref = useRef(null)
    useEffect(()=>{
        async function fetchdata(){
            const res= await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBDR5SSxYk2jPHpBjbYZNPoa76PPAmRPdo',{
                idToken: localStorage.getItem('token')
            })
            console.log(res.data)
            Ref.current.value=res.data.users[0].displayName
            let  name = document.getElementById('name')
            // const url = document.getElementById('url')
            name.value=res.data.users[0].displayName
            // console.log(res.data.users[0].displayName)
            // url=res.data.users.photourl

        }
        fetchdata()
        
       
    },[])
    async function submitandler(e){
        
        e.preventDefault()
        try{
            const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBDR5SSxYk2jPHpBjbYZNPoa76PPAmRPdo',{
                idToken: localStorage.getItem('token'),
                displayName: e.target.name.value,
                photourl:e.target.link.value,
                returnSecureToken: true 
            })
            console.log(res.data)
        }
        catch(err){
            console.log(err)
        }

    }

    return(
        <>
            <h3>Winner never quits quitters never win </h3>
            <hr></hr>
            <form onSubmit={submitandler}>
                <label htmlFor="name" ref={Ref}>Name</label>
                <input id='name'></input>
                <label htmlFor="link">Image Url</label>
                <input id='link'></input>
                <button type='submit'>Submit</button>
            
            </form>
        </>
    )
}
export default Form