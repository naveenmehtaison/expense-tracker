import { configureStore } from '@reduxjs/toolkit'
import counterSlice2 from './auth'
import Expense from './ExpenseReducer'
import Themereducer from './themeReducer'
import RightscreenReducer from './RightScreenReducer'
const Store  = configureStore({
    reducer:{auth:counterSlice2.reducer,expense:Expense.reducer,Theme:Themereducer.reducer,Rightscreen:RightscreenReducer.reducer},
    // reducer:counterSlice2.reducer
})


export default Store