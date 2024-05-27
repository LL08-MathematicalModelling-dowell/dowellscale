import { Line } from "react-chartjs-2"
import {Chart as ChartJS, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,Legend,
    Tooltip } from "chart.js"

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Legend,
        Tooltip
    )
export default function LineChart(){
    const options={}
    const data={
        labels:[
            0,10,20,30,40,50
        ],
        datasets:[
            {
                label:"Learning Index",
                data:[0,1,3,2,5,4],
                borderColor:"rgb(75,192,192)"
            }
        ]
    }
    return(
        <div className=" w-[80%]">
        <p className="w-full flex justify-center items-center text-2xl mt-3 text-orange-600 p-2 font-medium">Graphical view </p>
        <Line className=" bg-red" options={options} data={data}/>
        </div>
    )
}