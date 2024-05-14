import { createSlice } from "@reduxjs/toolkit";
const initialstate={curstate:false}
const Themereducer=createSlice({
    name:'Theme',
    initialState:initialstate,
    reducers:{
        setdaymode(state,action){
            state.curstate=!state.curstate
        }
    }
})
export const  ThemeReduceraction = Themereducer.actions
export default Themereducer
