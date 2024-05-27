import { useEffect,useState } from "react"
import axios from "axios"
import LineChart from "../Components/LineChart"
const channels=["Classroom"]
const instances=["Student feedback" ]
export default function TeacherReport(){
const responseOptions=["Reading","Understanding","Explaining","Evaluating","Applying"]
   
     const[channelName,setChannelName]=useState("")
     const[feedbackName,setFeedbackName]=useState("")
     const[data,setData]=useState({})
     const[loading,setLoading]=useState(true)
    useEffect(()=>{
        getData()
    },[])

    async function getData(){
        try{
              const response=await axios.get("https://100035.pythonanywhere.com/addons/learning-index-report/?scale_id=66507d222b2f1ec67e2569a2")
              console.log(response.data.learning_index_data)
              let totalCount=response.data.learning_index_data.control_group_size
              let learningIndex=response.data.learning_index_data.learning_level_index
              let percentages=response.data.learning_index_data.learning_level_percentages
              let individualCount=response.data.learning_index_data.learning_level_count
              let studentData={totalCount,
                learningIndex,
                percentages,
                individualCount
              }
              let classroomData={
                studentData
            }
            setData((prev)=>({...prev,classroomData}))
              setLoading(false)
        }catch(error){
            console.log(error)
        }finally{
            console.log("finally")
        }
    }

    console.log(data[channelName] && data[channelName][feedbackName] ? data[channelName][feedbackName].learningIndex || 0 :1000)
    return(
        <>
        {loading ? (
           <div className="flex justify-center items-center h-screen w-screen">
           <div className="border rounded-full border-orange-600 h-24 w-24 flex items-center justify-center">loading...</div>
         </div>
        ):(
       <div>
        
            <p className="md:text-4xl sm:text-2xl text-xl flex justify-center p-2">Feedback Analysis Dashboard</p>
            <div className="grid md:flex md:justify-center gap-4 mt-4 md:items-center w-[80%] md:w-full ml-auto md:ml-0">
            <select value={channelName=="classroomData" ? "Classroom" : ""} onChange={(e)=>{
                if(e.target.value=="Classroom")
                  setChannelName("classroomData")}
            }
           
            className="w-[80%] md:w-1/3 bg-gray-100 p-4 border border-gray-500 hover:border-2 hover:border-orange-500 text-lg">
                <option value="" className="text-lg">Select Channel</option>
                {channels.map((channel, i) => (
                <option key={i} value={channel} className="bg-gray-200 text-lg">
                    {channel}
                </option>
                ))}
            </select>
            <select value={feedbackName=="studentData" ? "Student feedback" : ""} onChange={(e)=>{
                 if(e.target.value=="Student feedback")
                setFeedbackName("studentData")
            }}
            className="w-[80%] md:w-1/3 bg-gray-100 p-4 border border-gray-500 hover:border-2 hover:border-orange-500 text-lg">
                <option value="" className="text-lg">Select Instance</option>
                {instances.map((instance, i) => (
                <option key={i} value={instance} className="bg-gray-200 text-lg">
                    {instance}
                </option>
                ))}
            </select>
       </div>

            <p className="flex justify-center mt-4 text-lg">Total Responses :{data[channelName] && data[channelName][feedbackName] ? data[channelName][feedbackName].totalCount || 0 : 0}</p>
            <p className="flex justify-center mt-4 text-lg">Scores :</p>
            <div className="grid  gap-8  p-4 w-[90%] lg:w-[80%]  ml-auto ">
                {responseOptions.map((option,i)=>(
                    <div key={i} className="flex flex-col text-[18px]  gap-3   min-w-[50%] w-max">
                        <p>{option} : {data[channelName] && data[channelName][feedbackName] ?data[channelName][feedbackName] .individualCount[option.toLowerCase()] :""}  ({channelName=="Classroom" &&  classroomData[feedbackName].percentages[option.toLowerCase()].toFixed(1) } %)</p>
                        <span className="h-4 w-full bg-indigo-300 rounded-lg">
            <span style={{
                width: `${data[channelName] && data[channelName][feedbackName] ?data[channelName][feedbackName] .percentages[option.toLowerCase()] : 0}%`,
                backgroundColor: (() => {
              
                if (option=="Reading") return '#FF0000';        // Red
                if (option=="Understanding") return '#FF7F00';        // Orange
                if (option=="Explaining") return '#FFFF00';        // Yellow
                if (option=="Evaluating") return '#7FFF00';        // Light Green
                return '#00FF00';                           // Green
                })(),
                display: "block",
                height: "100%",
                borderRadius: "inherit"
            }}></span>
            </span>
                    </div>

                ))}
          <LineChart/>

            </div>
             </div>
                )}
        </>
    )
}