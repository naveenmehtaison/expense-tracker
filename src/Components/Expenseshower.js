import axios from "axios"
import { useState,useEffect } from "react"
const Expenseshower=()=>{
    const [expense,setexpense]=useState([])
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
async function handleexpense(e){
        e.preventDefault()

        const obj = {SPENT:e.target.spent.value,Des:e.target.des.value,Selector:e.target.selector.value}
        try{
            const res = await axios.post('https://authentication-1f2ad-default-rtdb.firebaseio.com/expense.json',obj)
            setexpense([obj,...expense])
        }
        catch(err){
            console.log(err)
        }
        
        console.log(expense)
        

    }
    
    return(
        <>
            <div>
                <div>
                    <form onSubmit={handleexpense}>
                        <label htmlFor="spent">Money Spent</label>
                        <input id='spent'></input>
                        <label htmlFor="des">Description</label>
                        <input id='des'></input>
                        <select  id="selector">
                            <option value="Food">FOOD</option>
                            <option value="Electricity">ELECTRICITY</option>
                            <option value="Travel">TRAVEL</option>
                            <option value="Rent">RENT</option>
                        </select>
                        <button type="submit">Add</button>
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
                        <hr></hr>
                    </div>)

                })}

            </div>
        </>
    )
}
export default Expenseshower