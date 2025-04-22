import { createSlice } from "@reduxjs/toolkit";
const Income = createSlice({
  initialState: { arr: [], totalincome: 0 },
  name: "income",
  reducers: {
    setincome(state, action) {
      state.arr = [...state.arr, action.payload];
    },
    setincome2(state, action) {
      state.arr = [...action.payload];
    },
    setdelete(state, action) {
      const new_arr = state.arr.filter(
        (ele, item) => ele.id !== action.payload.id
      );
      state.arr = [...new_arr];
    },
    settotalincome(state, action) {
      state.totalincome = action.payload;
    },
  },
});
export const IncomeReducerAction = Income.actions;
export default Income;
