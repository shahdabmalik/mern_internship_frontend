import { useEffect, useState } from "react"
import SelectInput from "../select/SelectInput"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { SET_LIST } from "../../redux/features/transaction/transactionSlice"

const ApiUrl = import.meta.env.VITE_APIURL


const Table = () => {

    const dispatch = useDispatch()

    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    // Getting states from redux
    const { selectedMonth, transactions, totalPages } = useSelector(state => state.transaction)

    // api request
    useEffect(() => {
        async function getList() {
            try {
                const { data } = await axios.get(`${ApiUrl}/transactions?month=${selectedMonth.value}&search=${search}&page=${currentPage}`)
                dispatch(SET_LIST(data))
            } catch (error) {
                console.log(error);
            }
        }
        getList()
    }, [selectedMonth, search, currentPage, dispatch])

    // Next buttun handler
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }
    // Prev button handler
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    return (
        <div className="my-10 " >
            <div className="flex justify-between">
                <div className="max-w-sm w-full" >
                    <input className="w-full border border-slate-300 p-1.5 rounded-md focus:outline-none" type="text" value={search} placeholder="Search transaction" onChange={(e) => setSearch(e.target.value)} />
                </div>
                <SelectInput />
            </div>
            <div className="my-5 overflow-auto" >
            <h3 className="text-2xl pb-5 font-medium" >Table</h3>
                <table className="border-seprate w-full px-5" >
                    <thead className="border" >
                        <tr className="border" >
                            <th className="w-[50px] border text-left p-2" >Id</th>
                            <th className="w-[200px] border text-left p-2" >Title</th>
                            <th className="w-[400px] border text-left p-2 ">Description</th>
                            <th className="w-[150px] border text-left p-2">Price</th>
                            <th className="w-[200px] border text-left p-2">Category</th>
                            <th className="w-10 border text-left p-2">Sold</th>
                            <th className="w-[60px] border text-left p-2 overflow-hidden">Image</th>
                        </tr>
                    </thead>
                    <tbody className="border">
                        {transactions.map((t) => {
                            return (
                                <tr className="border" key={t?.id}>
                                    <td className="border p-2 ">{t?.id}</td>
                                    <td className="border p-2">{t?.title.substr(0, 20) + "..."}</td>
                                    <td className="border p-2 w-[400px]">{t?.description.substr(0, 55) + "..."}</td>
                                    <td className="border p-2">{t?.price}</td>
                                    <td className="border p-2">{t?.category}</td>
                                    <td className="border p-2">{t.sold === true ? "True" : "False"}</td>
                                    <td className="border p-2"><img src={t?.image} alt="product image" className="w-full aspect-square " /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className="flex justify-between py-5" >
                    <p>Page: {currentPage}</p>
                    <div className="flex flex-grow justify-center gap-4 items-center" >
                        <button type="button" disabled={currentPage === 1 && true} onClick={handlePrevPage} >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 p-1 bg-slate-100 rounded-full">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <p>{currentPage}/{totalPages}</p>
                        <button type="button" disabled={currentPage === totalPages && true} onClick={handleNextPage} >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 p-1 bg-slate-100 rounded-full">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                    <p>Perpage : 10</p>
                </div>
            </div>
        </div>
    )
}

export default Table