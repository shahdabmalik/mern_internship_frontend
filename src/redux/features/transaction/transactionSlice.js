import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    transactions: [],
    totalCount: null,
    totalPages: null,
    currentPage: 1,
    selectedMonth: { value: 3, label: "March" },
    totalSoldItems: null,
    totalNotSoldItems: null,
    totalSaleAmount: null,
    barChart: [],
    pieChart: []

}

const tableSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        SET_SELECTED_MONTH(state, action) {
            state.selectedMonth = action.payload
        },
        SET_LIST(state, action) {
            const { transactions, totalPages, currentPage } = action.payload
            state.transactions = transactions
            state.totalPages = totalPages
            state.currentPage = currentPage
        },
        SET_STATS(state, action) {
            const { totalNotSoldItems, totalSaleAmount, totalSoldItems } = action.payload
            state.totalNotSoldItems = totalNotSoldItems
            state.totalSoldItems = totalSoldItems
            state.totalSaleAmount = totalSaleAmount
        },
        SET_BARCHART(state, action) {
            state.barChart = action.payload
        },
        SET_PIECHART(state, action) {
            state.pieChart = action.payload
        }

    }
});

export const { SET_SELECTED_MONTH, SET_LIST, SET_STATS, SET_BARCHART, SET_PIECHART } = tableSlice.actions

export default tableSlice.reducer