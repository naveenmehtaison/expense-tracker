import axios from "axios"
import { useState,useEffect,useRef } from "react"
const Expenseshower=()=>{
    const spentRef = useRef(null);
    const desRef = useRef(null);
    const selectorRef = useRef(null);
    const [expense,setexpense]=useState([])
    const [edit,setedit] = useState(false)
    useEffect(()=>{
        async function fetchdata(){
            try{
                const res = await axios.get('https://authentication-1f2ad-default-rtdb.firebaseio.com/expense.json')
                // console.log(res.data.map((ele,item)=>(
                //     <p>{ele}</p>
                // )))
                const dataArray = Object.entries(res.data).map(([key, value]) => {
                    return { id: key, ...value };
                });
                setexpense(dataArray)
            }
            catch(err){
                console.log('err')
            }

        }
        fetchdata()
    },[])
    async function DeleteHandler(ele){
        // e.preventDefault()
        console.log(ele)
        try{

            const res = await axios.delete(`https://authentication-1f2ad-default-rtdb.firebaseio.com/expense/${ele.id}.json`)
            const res2 = await axios.get('https://authentication-1f2ad-default-rtdb.firebaseio.com/expense.json')
            const dataArray = Object.entries(res2.data).map(([key, value]) => {
                return { id: key, ...value };
            });
            setexpense(dataArray)
        
        }
        catch{

        }
    }
async function handleexpense(e,e2){

        e.preventDefault()


        const obj = {SPENT:e.target.spent.value,Des:e.target.des.value,Selector:e.target.selector.value}
        try{
            const res = await axios.post('https://authentication-1f2ad-default-rtdb.firebaseio.com/expense.json',obj)
            const res2 = await axios.get('https://authentication-1f2ad-default-rtdb.firebaseio.com/expense.json')
            const dataArray = Object.entries(res2.data).map(([key, value]) => {
                return { id: key, ...value };
            });
            setexpense(dataArray)            
            
        }
        catch(err){
            console.log(err)
        }
        spentRef.current.value= ''
        desRef.current.value=''
        selectorRef.current.value=''
        
        console.log(expense)
        

    }
    async function handleedit(ele){


        // e.preventDefault()

        const obj = {SPENT:spentRef.current.value,des:desRef.current.value,selector:selectorRef.current.value}
        console.log(obj)
        try{
            const res = await axios.put(`https://authentication-1f2ad-default-rtdb.firebaseio.com/expense/${ele.id}.json`,obj)
            const res2 = await axios.get('https://authentication-1f2ad-default-rtdb.firebaseio.com/expense.json')
            const dataArray = Object.entries(res2.data).map(([key, value]) => {
                return { id: key, ...value };
            });
            setexpense(dataArray)     
        }
        catch(err){
            console.log(err)
        }
        setedit(false)
        
        console.log(expense)
        

    }
    const Editfunc=(ele)=>{
        setedit(true)
        spentRef.current.value= ele.SPENT
        desRef.current.value=ele.Des
        selectorRef.current.value=ele.Selector
        // const desValue = desRef.current.value;
        // const selectorValue = selectorRef.current.value;
        // spentValue=ele.SPENT
        // desValue=ele.des
        // selectorValue=ele.selector
    }
    
    return(
        <>
            <div>
                <div>
                    <form onSubmit={handleexpense}>
                        <label htmlFor="spent">Money Spent</label>
                        <input id='spent' ref={spentRef}></input>
                        <label htmlFor="des">Description</label>
                        <input id='des' ref={desRef}></input>
                        <select  ref={selectorRef} id="selector">
                            <option value="Food">FOOD</option>
                            <option value="Electricity">ELECTRICITY</option>
                            <option value="Travel">TRAVEL</option>
                            <option value="Rent">RENT</option>
                        </select>
                        {!edit && <button type="submit">Add</button>}
                    </form>
                    
                </div>        
            
            
            </div>
            <div style={{border:'100px',borderColor:'black',backgroundColor:'#f0f0f0'}}>
                { expense.map((ele,item)=>{
                    return(
                    <div key = {item} >
                        <h3>{ele.SPENT}</h3>
                        <h3>{ele.Des}</h3>
                        <h3>{ele.Selector}</h3>
                        <button onClick={()=>{DeleteHandler(ele)}}>Delete</button>
                        <button onClick={()=>{Editfunc(ele)}}>Edit</button>
                        {edit && <button onClick={()=>{handleedit(ele)}}>Submit Edit</button>}
                        <hr></hr>
                    </div>)

                })}

            </div>
        </>
    )
}
export default Expenseshower