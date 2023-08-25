import BarChart from "../../components/barchart/BarChart"
import Stats from "../../components/stats/Stats"
import Table from "../../components/table/Table"

const Home = () => {
  return (
    <div className=" min-h-screen max-w-screen-xl w-full px-10 xl:px-0 mx-auto " >
      <h1 className="text-5xl text-center font-semibold py-4" >Transaction Dashboard</h1>
      <div>
        <Table />
        <Stats />
        <BarChart />
      </div>
    </div>
  )
}

export default Home