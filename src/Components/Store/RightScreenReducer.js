import { createSlice } from "@reduxjs/toolkit";
const initialstate={curstate:1}
const  RightscreenReducer=createSlice({
    name:'Rightscreen',
    initialState:initialstate,
    reducers:{
        setright(state,action){
            state.curstate=action.payload
        }
    }
})
export const  Rightscreenaction = RightscreenReducer.actions
export default RightscreenReducer