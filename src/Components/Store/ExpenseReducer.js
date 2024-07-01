import { createSlice } from "@reduxjs/toolkit";

const initialstate = {arr:[]}
const Expense = createSlice({
    name:'expense',
    initialState:initialstate,
    reducers:{
        setexpense(state, action) {
            // console.log(state.arr,'statearr')
            // console.log(action.payload,'actionpayload')
            // console.log('hii')

            state.arr= [ ...state.arr,action.payload] 
            // console.log(state.arr,'statearr')
            // console.log(action.payload,'actionpayload')

        },
        setexpense2(state, action) {
            console.log(state.arr,'statearr')
            console.log(action.payload,'actionpayload')
            console.log('hii')

            state.arr= [...action.payload] 
            console.log(state.arr,'statearr')
            console.log(action.payload,'actionpayload')

        },
        setdelete(state,action){
            console.log('inside delete redux')
            const new_arr = state.arr.filter((ele,item)=>(
                ele.id!==action.payload.id
            ))
            state.arr=[...new_arr]
            console.log(new_arr)

        }
    }
})

export const StoreActions = Expense.actions
export const {setexpense}= StoreActions
export default Expense
