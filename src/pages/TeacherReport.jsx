import { useEffect,useState } from "react"
import axios from "axios"
const channels=["Classroom"]
const instances=["Student feedback" ]
export default function TeacherReport(){

    const[responseOptions,setResponseOptions]=useState([])
     const[totalCount,setTotalCount]=useState(0)
     const[learningIndex,setLearningIndex]=useState(0)
     const[percentages,setPercentages]=useState({})
     const[optionsData,setOptionsData]=useState([])
     const[optionsDataResults,setOptionsDataResults]=useState([])
    useEffect(()=>{
        getData()
    },[])

    async function getData(){
        try{
              const response=await axios.get("https://100035.pythonanywhere.com/addons/learning-index-report/?scale_id=6645f30f1cddfeac941274cb")
              console.log(response.data.learning_index_data)
              setTotalCount(response.data.learning_index_data.control_group_size)
              setLearningIndex(response.data.learning_index_data.learning_level_index)
              setPercentages(response.data.learning_index_data.learning_level_percentages)
              setOptionsData(Object.keys(response.data.learning_index_data.learning_level_count))
              setOptionsDataResults(response.data.learning_index_data.learning_level_count)
        }catch(error){
            console.log(error)
        }finally{
            console.log("finally")
        }
    }

    console.log(totalCount,learningIndex,percentages,optionsData,optionsDataResults)
    return(
        <>
            <p className="text-4xl flex justify-center p-2">Feedback Analysis Dashboard</p>
            <div className="flex justify-center gap-4 mt-4 items-center">
                <select className="w-1/3 bg-gray-100 p-4 border border-gray-500 hover:border-2 hover:border-orange-500 text-lg">
                    <option value="" className="text-lg">Select Channel</option>
                 {channels.map((channel,i)=>(
                    <option key={i} value={channel} className=" bg-gray-200 text-lg">
                        {channel}
                    </option>
                 ))}
                </select>
                <select className="w-1/3 bg-gray-100 p-4 border border-gray-500 hover:border-2 hover:border-orange-500 text-lg">
                    <option value="" className="text-lg">Select Instance</option>
                 {instances.map((instance,i)=>(
                    <option key={i} value={instance}  className=" bg-gray-200 text-lg">
                        {instances}
                    </option>
                 ))}
                </select>
            </div>
            <p className="flex justify-center mt-4 text-lg">Total Responses :</p>
            <p className="flex justify-center mt-4 text-lg">Scores :</p>
        </>
    )
}