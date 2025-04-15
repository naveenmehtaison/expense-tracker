import { createSlice } from "@reduxjs/toolkit";

const initialstate = {arr:[]}
const Expense = createSlice({
    name:'expense',
    initialState:initialstate,
    reducers:{
        setexpense(state, action) {
            state.arr= [ ...state.arr,action.payload] 
        },
        setexpense2(state, action) {
            state.arr= [...action.payload] 

        },
        setdelete(state,action){
            const new_arr = state.arr.filter((ele,item)=>(
                ele.id!==action.payload.id
            ))
            state.arr=[...new_arr]

        }
    }
})

export const StoreActions = Expense.actions
export const {setexpense}= StoreActions
export default Expense
