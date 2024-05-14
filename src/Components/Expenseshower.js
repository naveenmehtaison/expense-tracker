import axios from "axios"
import { useState,useEffect,useRef } from "react"
import { useSelector,useDispatch } from "react-redux";
import { StoreActions } from "./Store/ExpenseReducer";

const Expenseshower=()=>{
    const [amount,setpremiumamount]= useState(0)
    if(amount>10000){
        alert('you need to purcahse premium ')
    }
    const [editid,seteleid] = useState('')
    const Dispatch = useDispatch()
    const expenseRedux = useSelector((state)=>state.expense.arr)
    const spentRef = useRef(null);
    const desRef = useRef(null);
    const selectorRef = useRef(null);
    const [expense,setexpense]=useState()
    const [per,setper]=useState()
    const [edit,setedit] = useState(false)
    useEffect(()=>{

        fetchdata()
    },[])
    async function fetchdata(){
        console.log('fetching')
        try{
            const res = await axios.get('https://authentication-1f2ad-default-rtdb.firebaseio.com/expense.json')
            // console.log(res.data.map((ele,item)=>(
            //     <p>{ele}</p>
            // )))
            console.log(res.data)
            
            const dataArray = Object.entries(res.data).map(([key, value]) => {
                
                return { id: key, ...value };
            });
            console.log(typeof(dataArray),dataArray[0].SPENT)
            let tempamount = 0; // Change from const to let
            for (let i = 0; i < dataArray.length; i++) {
                console.log(tempamount) // Use let instead of var
                tempamount += parseInt(dataArray[i].SPENT);
                console.log(tempamount,dataArray[i].SPENT)
                 // Accumulate the total spent amount
            }
            
            console.log(tempamount)
            setpremiumamount(tempamount)
            
            // setexpense(dataArray)
            // setper(dataArray)
            
            Dispatch(StoreActions.setexpense2(dataArray))
            
            // console.log(expenseRedux)
        }
        catch(err){
            console.log('err',expenseRedux)
        }

    }
    async function DeleteHandler(ele){
        // e.preventDefault()
        console.log(ele)
        try{

            const res = await axios.delete(`https://authentication-1f2ad-default-rtdb.firebaseio.com/expense/${ele.id}.json`)
            // const res2 = await axios.get('https://authentication-1f2ad-default-rtdb.firebaseio.com/expense.json')
            // const dataArray = Object.entries(res2.data).map(([key, value]) => {
            //     return { id: key, ...value };
            // });
            // setexpense(dataArray)
            Dispatch(StoreActions.setdelete(ele))
            setpremiumamount(amount - parseInt(ele.SPENT))

        
        }
        catch{
            console.log('err')

        }
    }
async function handleexpense(e,e2){

        e.preventDefault()


        const obj = {SPENT:e.target.spent.value,Des:e.target.des.value,Selector:e.target.selector.value}
        try{
            const res = await axios.post('https://authentication-1f2ad-default-rtdb.firebaseio.com/expense.json',obj)
            // const res2 = await axios.get('https://authentication-1f2ad-default-rtdb.firebaseio.com/expense.json')
            // const dataArray = Object.entries(res2.data).map(([key, value]) => {
            //     return { id: key, ...value }
            // })

            console.log('hello') 
            Dispatch(StoreActions.setexpense(obj))
            setpremiumamount(amount + parseInt(obj.SPENT))
            console.log(expenseRedux)        
            
            
            
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
        Dispatch(StoreActions.setdelete(ele)) 
        

        const obj = { SPENT:spentRef.current.value,Des:desRef.current.value,Selector:selectorRef.current.value}
        console.log(obj)
        try{
            const res = await axios.put(`https://authentication-1f2ad-default-rtdb.firebaseio.com/expense/${ele.id}.json`,obj)
  
            Dispatch(StoreActions.setexpense({...obj,id:ele.id})) 
            setpremiumamount(amount - parseInt(ele.SPENT))
            setpremiumamount(amount + parseInt(obj.SPENT))
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
       
        seteleid(ele.id)
        // const desValue = desRef.current.value;
        // const selectorValue = selectorRef.current.value;
        // spentValue=ele.SPENT
        // desValue=ele.des
        // selectorValue=ele.selector
    }
    console.log(expenseRedux)
    console.log(amount)
    // console.log(per)
    return(
        <>
            <div>
                <div>
                    <form onSubmit={handleexpense}>
                        <label htmlFor="spent">Money Spent</label>
                        <input id='spent' defaultValue={0} ref={spentRef}></input>
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
            {expenseRedux.map((ele, item) => {

                
                return (
                    <div key={item}>
                        <h3>{ele.SPENT}</h3>
                        <h3>{ele.Des}</h3>
                        <h3>{ele.Selector}</h3>
                        <button onClick={() => { DeleteHandler(ele) }}>Delete</button>
                        <button onClick={() => { Editfunc(ele) }}>Edit</button>
                        {edit &&  ele.id===editid && <button onClick={() => { handleedit(ele) }}>Submit Edit</button>}
                        <hr></hr>
                    </div>
                );
            })}


            </div>
        </>
    )
}
export default Expenseshower