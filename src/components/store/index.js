import { configureStore } from "@reduxjs/toolkit";

import expenseReducer from "./expenseReducer";
import themeReducer from "./themeReducer";

const store = configureStore({
  reducer: { expense: expenseReducer, theme: themeReducer },
});

export default store;
