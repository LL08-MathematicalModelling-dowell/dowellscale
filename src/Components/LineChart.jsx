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
export default function LineChart({indexes,total}){
    const options = {
        scales: {
          y: {
            ticks: {
              stepSize: 1,
              min: 0,
              max: 5
            },
            beginAtZero: true
          },
          x: {
            type: 'linear',
            position: 'bottom',
            ticks: {
              stepSize: 10,
              min: 0,
              max: 50
            }
          }
        }
      };
 let data

        data={
            labels:total,
            datasets:[
                {
                    label:"Learning Index",
                    data:indexes,
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