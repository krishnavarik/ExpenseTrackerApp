import { configureStore } from "@reduxjs/toolkit";

import expenseReducer from "./expenseReducer";

const store = configureStore({
  reducer: { expense: expenseReducer },
});

export default store;
