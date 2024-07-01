import axios from "axios"
import { useState,useEffect,useRef } from "react"
import { useSelector,useDispatch } from "react-redux";
import { StoreActions } from "./Store/ExpenseReducer";
import Button from "./PremiumActivities/Button";
import FileDownloader from "./PremiumActivities/FileDownloader";

import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Expenseshower=()=>{
    const [amount,setpremiumamount]= useState(0)
    const [per,setper]=useState(false)
    if(amount>10000 && !per){
        toast.success('premium purchased')
        alert('Do U want to Buy Premium')
        setper(true)
        
        
    }
    // if(amount<10000 && per){
    //     setper(false)      
    // }
    const Theme = useSelector((state)=>state.Theme.curstate)
    console.log(Theme)
    const [editid,seteleid] = useState('')
    const Dispatch = useDispatch()
    const expenseRedux = useSelector((state)=>state.expense.arr)
    const spentRef = useRef(null);
    const desRef = useRef(null);
    const selectorRef = useRef(null);
    const [expense,setexpense]=useState()
    
    const [edit,setedit] = useState(false)
    useEffect(()=>{

        fetchdata()
    },[])
    async function fetchdata(){
        console.log('fetching')
        try{
            const res = await axios.get('https://expensetracker-27a82-default-rtdb.firebaseio.com/expense.json')
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
        console.log(ele,'inside delete func')
        try{

            const res = await axios.delete(`https://expensetracker-27a82-default-rtdb.firebaseio.com/expense/${ele.id}.json`)
            // const res2 = await axios.get('https://authentication-1f2ad-default-rtdb.firebaseio.com/expense.json')
            // const dataArray = Object.entries(res2.data).map(([key, value]) => {
            //     return { id: key, ...value };
            // });
            // setexpense(dataArray)
            await Dispatch(StoreActions.setdelete(ele))
            await setpremiumamount(amount - parseInt(ele.SPENT))

        
        }
        catch{
            console.log('err')

        }
    }
async function handleexpense(e,e2){

        e.preventDefault()
        console.log(e)
        const d = new Date


        const obj = {SPENT:e.target.spent.value,Des:e.target.des.value,Selector:e.target.selector.value, date:`${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`,time:`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`}
        console.log(obj.date,d.getDay(),d.getMonth()+1,d.getFullYear())
        try{
            const res = await axios.post('https://expensetracker-27a82-default-rtdb.firebaseio.com/expense.json',obj)
            // const res2 = await axios.get('https://authentication-1f2ad-default-rtdb.firebaseio.com/expense.json')
            // const dataArray = Object.entries(res2.data).map(([key, value]) => {
            //     return { id: key, ...value }
            // })
            console.log(res.data)
            obj.id=res.data.name

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
            const res = await axios.put(`https://expensetracker-27a82-default-rtdb.firebaseio.com//expense/${ele.id}.json`,obj)
  
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

    // console.log(per)
    return(
        <div style={!Theme ? { backgroundColor: ''} : {backgroundColor: "#292c35"}} >
            {per && 
                <div className="mx-20">

                    
                    <Button></Button>
                    
                </div>
            }
            <div >
                {!per && <div >
                                
                    <button>Buy Premium</button>
                </div>}

                <FileDownloader c props={expenseRedux}/>
                <p className=" font-extrabold  text-5xl flex">Total Amount : <span className="flex-shrink-0">{amount}</span></p>
                <div className="bg-white">
                
                </div>
                <div className="flex  justify-center h-20 mt-3 p-7 gap-2 bg-slate-600" >
                    <form onSubmit={handleexpense}>
                        <label htmlFor="spent">Money Spent</label>
                        <input id='spent' defaultValue={0} ref={spentRef} placeholder="amount"></input>
                        <label htmlFor="des">Description</label>
                        <input id='des' ref={desRef} placeholder="des"></input>
                        <select  ref={selectorRef} id="selector">
                            <option value="Food">FOOD</option>
                            <option value="Electricity">ELECTRICITY</option>
                            <option value="Travel">TRAVEL</option>
                            <option value="Rent">RENT</option>
                        </select>
                        {!edit && <button className="bg-blue-400 rounded-md" type="submit">Add</button>}
                    </form>
                    
                </div>        
            
            
            </div>
            
            <div className="mx-80 shadow-2xl">
                <div>
                    <div className="flex gap-12 items-center justify-between bg-red-500 p-4">
                        
                            <h3 className='font-bold'>Spent</h3>
                        
 
                            <h3 className='font-bold'>Des</h3>

                            <h3 className='font-bold'>Category</h3>

                            <h3 className='font-bold'>Date</h3>

                            <h3 className='font-bold'>Time</h3>
                            {/* <h3 className='font-bold'>Actions</h3> */}

                    </div>
                    <hr className="w-full mt-2" />
                </div>
                
                <div >
                    {expenseRedux.map((ele, index) => (
                        <div key={ele.id || index} className="bg-red-200 p-4 mb-4  ">
                            <div className="flex gap-12 items-center justify-between font-semibold">
                                
                                    <h3 className="mx-3 max-w-6">{ele.SPENT}</h3>
                                
        
                                    <h3 className="" >{ele.Des}</h3>

                                    <h3>{ele?.Selector}</h3>
                                    <h3>{ele?.date}</h3>
                                    <h3>{ele?.time}</h3>


                            </div>
                            
                            <hr className="w-full mt-2" />
                            <div className="flex gap-4">
                                <button onClick={() => DeleteHandler(ele)}>Delete</button>

                                <button onClick={() => Editfunc(ele)}>Edit</button>

                                {edit && ele.id === editid && (

                                    <button onClick={() => handleedit(ele)}>Submit Edit</button>

                                )}
                            </div>
                        </div>
                        
                    ))}
                </div>



            </div>
        </div>
    )
}
export default Expenseshower