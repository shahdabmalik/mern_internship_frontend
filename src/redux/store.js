import { configureStore } from "@reduxjs/toolkit";

import tableReducer from "./features/transaction/transactionSlice"

const store = configureStore({
    reducer: {
        transaction: tableReducer,
    }
})

export default store