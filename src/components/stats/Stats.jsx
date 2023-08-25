import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SET_STATS } from "../../redux/features/transaction/transactionSlice"

const ApiUrl = import.meta.env.VITE_APIURL

const Stats = () => {

    const dispatch = useDispatch()

    // getting states from redux
    const { selectedMonth, totalSaleAmount, totalSoldItems, totalNotSoldItems } = useSelector(state => state.transaction)

    // Api Request
    useEffect(() => {
        async function getStats() {
            try {
                const { data } = await axios.get(`${ApiUrl}/statistics?month=${selectedMonth.value}`)
                dispatch(SET_STATS(data))
            } catch (error) {
                console.log(error);
            }
        }
        getStats()
    }, [selectedMonth, dispatch])

    return (
        <div>
            <h3 className="text-2xl pb-5 font-medium" >Statistics - {selectedMonth.label} </h3>
            <div className=" max-w-sm bg-slate-100 flex flex-col gap-3 p-5 rounded-md" >
                <p>Total Sales : {totalSaleAmount?.toFixed(2)}$</p>
                <p>Total Sold Items : {totalSoldItems}</p>
                <p>Total Not Sold Items : {totalNotSoldItems}</p>
            </div>
        </div>
    )
}

export default Stats