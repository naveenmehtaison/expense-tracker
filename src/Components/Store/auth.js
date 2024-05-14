import { createSlice } from "@reduxjs/toolkit";
const initialState2 = {isauth:false, token:'', id:''}
const counterSlice2= createSlice({
    name:'auth',
    initialState:initialState2,
    reducers:{
        login(state){
            state.isauth=true
        },
        logout(state){
            state.isauth=false
        },
        istoken(state){
            state.token=localStorage.getItem('token')
            console.log(state.token)
        },
        nottoken(state){
            state.token=''
        },
        userid(state,action){
            state.id=action.payload
            console.log(state.id)
            console.log(action.payload)
        },
        notuserid(state){
            state.id=''
        }
    }
}
)
export const StoreActions2 = counterSlice2.actions
export const { login, logout, istoken, nottoken, userid, notuserid } = counterSlice2.actions
export default counterSlice2