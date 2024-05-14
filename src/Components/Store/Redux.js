import { configureStore } from '@reduxjs/toolkit'
import counterSlice2 from './auth'
import Expense from './ExpenseReducer'
import Themereducer from './themeReducer'
const Store  = configureStore({
    reducer:{auth:counterSlice2.reducer,expense:Expense.reducer,Theme:Themereducer.reducer},
    // reducer:counterSlice2.reducer
})


export default Store