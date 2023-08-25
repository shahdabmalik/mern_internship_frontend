import axios from "axios"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label } from 'recharts';
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SET_BARCHART } from "../../redux/features/transaction/transactionSlice"

const ApiUrl = import.meta.env.VITE_APIURL


const BarCharts = () => {

    const dispatch = useDispatch()

    // getting states from redux
    const { selectedMonth, barChart } = useSelector(state => state.transaction)

    // Api request
    useEffect(() => {
        async function getBarChartData() {

            try {
                const { data } = await axios.get(`${ApiUrl}/barchart?month=${selectedMonth.value}`)
                dispatch(SET_BARCHART(data))
            } catch (error) {
                console.log(error);
            }

        }
        getBarChartData()
    }, [selectedMonth, dispatch])

    return (
        <div className="my-10" >
            <h3 className="text-2xl pb-5 font-medium" >Bar Chart Stats - {selectedMonth.label} </h3>
            <div className="max-w-2xl w-full max-h-96 h-full overflow-auto" >
                <BarChart
                    width={500}
                    height={300}
                    data={barChart}
                    barSize={40}
                    barGap={1}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 0,
                        bottom: 25,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" direction={1}  >
                        <Label value="Price Range" offset={5} position={"bottom"} />
                    </XAxis>
                    <YAxis allowDecimals={false} >
                        <Label value="Number of items" offset={-20} angle={-90} position={"left"} />
                    </YAxis>
                    <Tooltip />
                    {/* <Legend /> */}
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </div>
        </div>
    )
}

export default BarCharts