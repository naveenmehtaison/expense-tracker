import { createSlice } from "@reduxjs/toolkit";
const initialstate={curstate:'white'}
const Themereducer=createSlice({
    name:'Theme',
    initialState:initialstate,
    reducers:{
        setdaymode(state,action){
            if(state.curstate==='white'){
                state.curstate='#111827'
            }
            else{
                state.curstate='white'
            }
            // state.curstate=!state.curstate
        }
    }
})
export const  ThemeReduceraction = Themereducer.actions
export default Themereducer
