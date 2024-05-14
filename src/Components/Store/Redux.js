import { configureStore } from '@reduxjs/toolkit'
import counterSlice2 from './auth'
import Expense from './ExpenseReducer'
const Store  = configureStore({
    reducer:{auth:counterSlice2.reducer,expense:Expense.reducer},
    // reducer:counterSlice2.reducer
})


export default Store