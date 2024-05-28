// import { useEffect,useState } from "react"
// import axios from "axios"
// import LineChart from "../../Components/LineChart"
// import './TeacherReport.css';
// const channels=["Classroom"]
// const instances=["Student feedback" ]
// export default function TeacherReport(){
// const responseOptions=["Reading","Understanding","Explaining","Evaluating","Applying"]
   
//      const[channelName,setChannelName]=useState("")
//      const[feedbackName,setFeedbackName]=useState("")
//      const[data,setData]=useState({})
//      const[loading,setLoading]=useState(true)
//     useEffect(()=>{
//         getData()
//     },[])

//     async function getData(){
//         try{
//               const response=await axios.get("https://100035.pythonanywhere.com/addons/learning-index-report/?scale_id=66507d222b2f1ec67e2569a2")
//               console.log(response.data.learning_index_data)
//               let totalCount=response.data.learning_index_data.control_group_size
//               let learningIndex=response.data.learning_index_data.learning_level_index
//               let percentages=response.data.learning_index_data.learning_level_percentages
//               let individualCount=response.data.learning_index_data.learning_level_count
//               let studentData={totalCount,
//                 learningIndex,
//                 percentages,
//                 individualCount
//               }
//               let classroomData={
//                 studentData
//             }
//             setData((prev)=>({...prev,classroomData}))
//               setLoading(false)
//         }catch(error){
//             console.log(error)
//         }finally{
//             console.log("finally")
//         }
//     }
//     const index=data[channelName] && data[channelName][feedbackName] ? data[channelName][feedbackName].learningIndex || 0 :0
//     const totalCount=data[channelName] && data[channelName][feedbackName] ? data[channelName][feedbackName].totalCount || 0 : 0
//     const percentages=data[channelName] && data[channelName][feedbackName] ? data[channelName][feedbackName].percentages || 0 : 0
//     console.log(percentages)
//     return(
//         <>
//         {loading ? (
//             <>
//            <div className="flex justify-center items-center h-screen w-screen">
//            <button type="button" className="bg-indigo-500 text-white py-2 px-4 rounded flex items-center" disabled>
//         <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
//           <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//           <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" fill="none" />
//         </svg>
//         Loading...
//       </button>
//          </div>
//          </>
//         ):(
//        <div>
        
//             <p className="md:text-4xl sm:text-2xl text-xl flex justify-center p-2">Feedback Analysis Dashboard</p>
//             <div className="grid md:flex md:justify-center gap-4 mt-4 md:items-center w-[80%] md:w-full ml-auto md:ml-0">
//             <select value={channelName=="classroomData" ? "Classroom" : ""} onChange={(e)=>{
//                 if(e.target.value=="Classroom")
//                   setChannelName("classroomData")}
//             }
           
//             className="w-[80%] md:w-1/3 bg-gray-100 p-4 border border-gray-500 hover:border-2 hover:border-orange-500 text-lg">
//                 <option value="" className="text-lg">Select Channel</option>
//                 {channels.map((channel, i) => (
//                 <option key={i} value={channel} className="bg-gray-200 text-lg">
//                     {channel}
//                 </option>
//                 ))}
//             </select>
//             <select value={feedbackName=="studentData" ? "Student feedback" : ""} onChange={(e)=>{
//                  if(e.target.value=="Student feedback")
//                 setFeedbackName("studentData")
//             }}
//             className="w-[80%] md:w-1/3 bg-gray-100 p-4 border border-gray-500 hover:border-2 hover:border-orange-500 text-lg">
//                 <option value="" className="text-lg">Select Instance</option>
//                 {instances.map((instance, i) => (
//                 <option key={i} value={instance} className="bg-gray-200 text-lg">
//                     {instance}
//                 </option>
//                 ))}
//             </select>
//        </div>

//             <p className="flex justify-center mt-4 text-lg">Total Responses :{totalCount}</p>
//             <p className="flex justify-center mt-4 text-lg">Scores :</p>
//             <div className="grid  gap-8  p-4 w-[90%] lg:w-[80%]  ml-auto ">
//                 {responseOptions.map((option,i)=>(
//                     <div key={i} className="flex flex-col text-[18px]  gap-3   min-w-[50%] w-max">
//                         <p>{option} : {data[channelName] && data[channelName][feedbackName] ?data[channelName][feedbackName].individualCount[option.toLowerCase()] :""}  ({data[channelName] && data[channelName][feedbackName] ?data[channelName][feedbackName].percentages[option.toLowerCase()].toFixed(1) : 0} %)</p>
//                         <span className="h-4 w-full bg-indigo-300 rounded-lg">
//             <span style={{
//                 width: `${data[channelName] && data[channelName][feedbackName] ?data[channelName][feedbackName].percentages[option.toLowerCase()] : 0}%`,
//                 backgroundColor: (() => {
              
//                 if (option=="Reading") return '#FF0000';        // Red
//                 if (option=="Understanding") return '#FF7F00';        // Orange
//                 if (option=="Explaining") return '#FFFF00';        // Yellow
//                 if (option=="Evaluating") return '#7FFF00';        // Light Green
//                 return '#00FF00';                           // Green
//                 })(),
//                 display: "block",
//                 height: "100%",
//                 borderRadius: "inherit"
//             }}></span>
//             </span>
//                     </div>

//                 ))}
//                {totalCount!=0 &&   <LineChart indexes={[index,3,1,4]} total={[totalCount,12,23,40]}/>}
        

//             </div>
//              </div>
//                 )}
//         </>
//     )
// }


import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  CircularProgress,
  LinearProgress,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);
import LineChart from "../../Components/LineChart"
const instanceNames = {
  instance_1: "Student feedback",

};

// const allChannelsNameTag = "channel_all_x";

const channelNames = {
//   [`${allChannelsNameTag}`]: "All Channels",
  channel_1: "Classroom",
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Responses Insights by Day",
    },
  },
};

// const extractLabelsAndDatasetsInfo = (data = []) => {
//   const labelsForCharts = [
//     ...new Set(
//       data
//         .map(
//           (item) =>
//             item?.dowell_time?.current_time &&
//             new Date(item?.dowell_time?.current_time).toDateString()
//         )
//     ),
//   ];

//   const datasetsForCharts = {
//     yesData: [],
//     noData: [],
//     maybeData: [],
//   };

//   labelsForCharts.forEach((item) => {
//     const matchingData = data.filter(
//       (dataItem) =>
//         dataItem?.dowell_time?.current_time &&
//         new Date(dataItem?.dowell_time?.current_time).toDateString() === item
//     );

//     datasetsForCharts.noData.push(
//       matchingData.filter((data) => data?.score === 0).length
//     );
//     datasetsForCharts.maybeData.push(
//       matchingData.filter((data) => data?.score === 1).length
//     );
//     datasetsForCharts.yesData.push(
//       matchingData.filter((data) => data?.score === 2).length
//     );
//   });

//   const totalItems =
//     datasetsForCharts.yesData.reduce((a, b) => a + b, 0) +
//     datasetsForCharts.noData.reduce((a, b) => a + b, 0) +
//     datasetsForCharts.maybeData.reduce((a, b) => a + b, 0);

//   return {
//     labels: labelsForCharts,
//     datasetsInfo: datasetsForCharts,
//     totalItems,
//   };
// };

const initialScoreData = {
    Reading: { count: 0, percentage: 0 },
    Understanding: { count: 0, percentage: 0 },
    Explaining: { count: 0, percentage: 0 },
    Evaluating: { count: 0, percentage: 0 },
    Applying: { count: 0, percentage: 0 }
};

const App = () => {
  const [channels, setChannels] = useState([]);
  const [instances, setInstances] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState("");
  const [selectedInstance, setSelectedInstance] = useState("");
  const [scores, setScores] = useState(initialScoreData);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const[leaningIndexData,setLearningIndexData]=useState({})
  const[leaningLevelIndex,setLearningLevelIndex]=useState(0)
//   const [dateDataForChart, setDateDataForChart] = useState({
//     labels: [],
//     datasets: [],
//   });
//   const [displayDataForAllSelection, setDisplayDataForAllSelection] = useState(
//     []
//   );

  useEffect(() => {
    fetchData();
  }, []);

//   useEffect(() => {
//     if (selectedChannel.length < 1 || selectedInstance.length < 1) return;

    // const { labels, datasetsInfo, totalItems } = extractLabelsAndDatasetsInfo(
    //   data.filter(
    //     (item) =>
    //       item.channel_name === selectedChannel &&
    //       item.instance_name.trim() === selectedInstance
    //   )
    // );

//     setDateDataForChart({
//       labels: labels,
//       datasets: [
//         {
//           label: "No",
//           data: datasetsInfo.noData,
//           borderColor: "red",
//           backgroundColor: "red",
//         },
//         {
//           label: "Yes",
//           data: datasetsInfo.yesData,
//           borderColor: "green",
//           backgroundColor: "green",
//         },
//         {
//           label: "Maybe",
//           data: datasetsInfo.maybeData,
//           borderColor: "yellow",
//           backgroundColor: "yellow",
//         },
//       ],
//     });
//   }, [selectedChannel, selectedInstance, data]);

//   useEffect(() => {
//     if (selectedChannel !== allChannelsNameTag)
//       return setDisplayDataForAllSelection([]);

//     const allData = instances.map((instance) => {
//       const dataForInstance = data.filter(
//         (item) => item.instance_name.trim() === instance
//       );
//       const scoreCounts = {
//         Reading: { count: 0, percentage: 0 },
//         Understanding: { count: 0, percentage: 0 },
//         Explaining: { count: 0, percentage: 0 },
//         Evaluating: { count: 0, percentage: 0 },
//         Applying: { count: 0, percentage: 0 }
//       };

    //   const { labels, datasetsInfo, totalItems } =    (
    //     dataForInstance
    //   );

    //   scoreCounts.Reading.count = datasetsInfo.noData.length;
    //   scoreCounts.Reading.percentage =
    //     (datasetsInfo.noData.reduce((a, b) => a + b, 0) / totalItems) * 100;

    //   scoreCounts.Maybe.count = datasetsInfo.maybeData.length;
    //   scoreCounts.Maybe.percentage =
    //     (datasetsInfo.maybeData.reduce((a, b) => a + b, 0) / totalItems) * 100;

    //   scoreCounts.Yes.count = datasetsInfo.yesData.length;
    //   scoreCounts.Yes.percentage =
    //     (datasetsInfo.yesData.reduce((a, b) => a + b, 0) / totalItems) * 100;

//       return {
//         instanceName: instance,
//         totalResponses: dataForInstance.length,
//         scoreCounts,
//         chartData: {
//           labels: labels,
//           datasets: [
//             {
//               label: "No",
//               data: datasetsInfo.noData,
//               borderColor: "red",
//               backgroundColor: "red",
//             },
//             {
//               label: "Yes",
//               data: datasetsInfo.yesData,
//               borderColor: "green",
//               backgroundColor: "green",
//             },
//             {
//               label: "Maybe",
//               data: datasetsInfo.maybeData,
//               borderColor: "yellow",
//               backgroundColor: "yellow",
//             },
//           ],
//         },
//       };
//     });

//     setDisplayDataForAllSelection(allData);
//   }, [selectedChannel, data, instances]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://100035.pythonanywhere.com/addons/learning-index-report/?scale_id=66507d222b2f1ec67e2569a2"
      );
      const data = response.data.data;

      const uniqueChannels = Array.from(
        new Set(data.map((item) => item.channel_name))
      );
      const uniqueInstances = Array.from(
        new Set(data.map((item) => item.instance_name.trim()))
      );

      setChannels([ ...uniqueChannels]);
      setInstances(uniqueInstances);
      setData(data);
      setLearningIndexData(response.data.learning_index_data)
      setLoading(false);
    
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Set loading to false even in case of error
    }
  };

  const handleChannelSelect = (event) => {
    setSelectedChannel(event.target.value);

    // if (event.target.value === allChannelsNameTag) {
    //   setSelectedInstance("");
    //   setScores(initialScoreData);
    //   setTotalCount(0);
    // }
  };

  const handleInstanceSelect = (event) => {
    setSelectedInstance(event.target.value);
    const scoreCounts = leaningIndexData.learning_level_count;
    const percentages=leaningIndexData.learning_level_percentages

    setTotalCount(leaningIndexData.control_group_size)
    // Filter data based on the selected instance and channel
    // const filteredData = data.filter(
    //   (item) =>
    //     item.instance_name.trim() === event.target.value &&
    //     item.channel_name === selectedChannel
    // );
 
    // // Count occurrences of each score
   
    // filteredData.forEach((item) => {
    //   switch (item.score) {
    //     case 0:
    //       scoreCounts["Reading"]++;
    //       break;
    //     case 1:
    //       scoreCounts["Understanding"]++;
    //       break;
    //     case 2:
    //       scoreCounts["Explaining"]++;
    //       break;
    //     case 3:
    //       scoreCounts["Evaluating"]++;
    //       break;
    //     case 4:
    //       scoreCounts["Applying"]++;
    //        break;
    //     default:
    //       break;
    //   }
    // });

    // // Calculate total count
    // const totalCount = filteredData.length;

    // // Calculate percentage for each score
    const scorePercentages = {
        Reading: {
        count: scoreCounts["reading"],
        percentage: percentages["reading"] ,
      },
      Understanding: {
        count: scoreCounts["understanding"],
        percentage:  percentages["understanding"],
      },
      Explaining: {
        count: scoreCounts["explaining"],
        percentage:  percentages["explaining"],
      },
      Evaluating: {
        count: scoreCounts["evaluating"],
        percentage:  percentages["evaluating"],
      },
      Applying: {
        count: scoreCounts["applying"],
        percentage: percentages["applying"],
      },
    };

    setScores(scorePercentages);
    setLearningLevelIndex(leaningIndexData.learning_level_index)

  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box p={3}>
    <Typography variant="h4" align="center" gutterBottom>
      Feedback Analysis Dashboard
    </Typography>
    <Grid container spacing={3} alignItems="center" justifyContent="center">
      <Grid item xs={12} md={6}>
        <Select
          value={selectedChannel}
          onChange={handleChannelSelect}
          displayEmpty
          fullWidth
        >
          <MenuItem value="" disabled>
            Select Channel
          </MenuItem>
          {channels.map((channel) => (
            <MenuItem key={channel} value={channel}>
              {channelNames[channel]}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={12} md={6}>
        <Select
          value={selectedInstance}
          onChange={handleInstanceSelect}
          displayEmpty
          fullWidth
        >
          <MenuItem value="" disabled>
            Select Instance
          </MenuItem>
          {instances.map((instance) => (
            <MenuItem key={instance} value={instance}>
              {instanceNames[instance]}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
    
    <>
      <Typography
        variant="body1"
        align="center"
        gutterBottom
        style={{ marginTop: "16px" }}
      >
        Total Responses: {totalCount}
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Scores:
      </Typography>
      <Grid container spacing={3} justifyContent="center">
  {Object.entries(scores).map(([score, data]) => (
    <Grid item xs={12} key={score}>
      <Box
        sx={{
          maxWidth: { xs: "100%", sm: "80%", md: "70%", lg: "60%" },
          mx: "auto",
          textAlign: "center",
        }}
      >
        <Typography variant="subtitle1" gutterBottom>
          {`${score}: ${data.count} (${data.percentage.toFixed(2)}%)`}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={data.percentage || 0}
          sx={{
            height: "10px",
            borderRadius: "10px",
            "& .MuiLinearProgress-bar": {
              borderRadius: "10px",
              backgroundColor: (() => {
                if (score === "Reading") return "#FF0000"; // Red
                if (score === "Understanding") return "#FF7F00"; // Orange
                if (score === "Explaining") return "#FFFF00"; // Yellow
                if (score === "Evaluating") return "#7FFF00"; // Light Green
                return "#00FF00"; // Green
              })(),
            },
          }}
        />
      </Box>
    </Grid>
  ))}
</Grid>

      {selectedChannel.length < 1 || selectedInstance.length < 1 ? null : (
        <>
          <Box
            sx={{
              mt: 4,
              width: "100%",
              height: { xs: "300px", sm: "400px" },
              maxWidth: "900px",
              mx: "auto",
            }}
          >
            {totalCount !== 0 && <LineChart indexes={[leaningLevelIndex, 3, 1, 4]} total={[totalCount, 12, 23, 40]} />}
          </Box>
        </>
      )}
    </>
  </Box>
  );
};

export default App;
