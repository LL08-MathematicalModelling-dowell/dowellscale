// import React, { useState, useEffect } from "react";
// import {
//   Select,
//   MenuItem,
//   CircularProgress,
//   LinearProgress,
//   Grid,
//   Typography,
//   Box,
// } from "@mui/material";
// import axios from "axios";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import { unclipArea } from "chart.js/helpers";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const instanceNames = {
//   instance_1: "Exhibition Feedback",
// };


// const allChannelsNameTag = "channel_all_x";

// const channelNames = {
//   [`${allChannelsNameTag}`]: "All Channels",
//   channel_1: "Exhibition Hall",
// };



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
//     promoterData: [],
//     detractorData: [],
//     passiveData: [],
//   };

//   labelsForCharts.forEach((item) => {
//     const matchingData = data.filter(
//       (dataItem) =>
//         dataItem?.dowell_time?.current_time &&
//         new Date(dataItem?.dowell_time?.current_time).toDateString() === item
//     );

//     datasetsForCharts.detractorData.push(
//       matchingData.filter((data) => data?.category === "detractor").length
//     );
//     datasetsForCharts.passiveData.push(
//       matchingData.filter((data) => data?.category === "passive").length
//     );
//     datasetsForCharts.promoterData.push(
//       matchingData.filter((data) => data?.category === "promoter").length
//     );
//   });

//   const totalItems =
//     datasetsForCharts.promoterData.reduce((a, b) => a + b, 0) +
//     datasetsForCharts.detractorData.reduce((a, b) => a + b, 0) +
//     datasetsForCharts.passiveData.reduce((a, b) => a + b, 0);

//     const maxDataValue = Math.max(
//         ...datasetsForCharts.promoterData,
//         ...datasetsForCharts.detractorData,
//         ...datasetsForCharts.passiveData
//       );
   
//       let stepSize=1
//       if(maxDataValue>5){
//         stepSize=Math.ceil(maxDataValue/5)
//       }
   
//       const options = {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//           legend: {
//             position: "top",
//           },
//           title: {
//             display: true,
//             text: "Responses Insights by Day",
//           },
//         },
//         scales: {
//           y: {
//             beginAtZero: true,
//             max: stepSize * 6,
//             ticks: {
//               stepSize: stepSize,
//             },
//           },
//         },
//       };
//   return {
//     labels: labelsForCharts,
//     datasetsInfo: datasetsForCharts,
//     totalItems,
//     options
//   };
// };

// const initialScoreData = {
//   Detractor: { count: 0, percentage: 0 },
//   Passive: { count: 0, percentage: 0 },
//   Promoter: { count: 0, percentage: 0 },
// };

// const App = () => {
//   const [channels, setChannels] = useState([]);
//   const [instances, setInstances] = useState([]);
//   const [selectedChannel, setSelectedChannel] = useState("");
//   const [selectedInstance, setSelectedInstance] = useState("");
//   const [scores, setScores] = useState(initialScoreData);
//   const [totalCount, setTotalCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState([]);
//   const[options,setOptions]=useState({})
//   const [dateDataForChart, setDateDataForChart] = useState({
//     labels: [],
//     datasets: [],
//   });
//   const [displayDataForAllSelection, setDisplayDataForAllSelection] = useState(
//     []
//   );

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (selectedChannel.length < 1 || selectedInstance.length < 1) return;

//     const { labels, datasetsInfo, totalItems,options } = extractLabelsAndDatasetsInfo(
//       data.filter(
//         (item) =>
//           item.channel_name === selectedChannel &&
//           item.instance_name.trim() === selectedInstance
//       )
//     );
//     setOptions(options)

//     setDateDataForChart({
//       labels: labels,
//       datasets: [
//         {
//           label: "Detractor",
//           data: datasetsInfo.detractorData,
//           borderColor: "red",
//           backgroundColor: "red",
//         },
//         {
//           label: "Promoter",
//           data: datasetsInfo.promoterData,
//           borderColor: "green",
//           backgroundColor: "green",
//         },
//         {
//           label: "Passive",
//           data: datasetsInfo.passiveData,
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
//         Detractor: {
//           count: 0,
//           percentage: 0,
//         },
//         Passive: {
//           count: 0,
//           percentage: 0,
//         },
//         Promoter: {
//           count: 0,
//           percentage: 0,
//         },
//       };

//       const { labels, datasetsInfo, totalItems,options } = extractLabelsAndDatasetsInfo(
//         dataForInstance
//       );
// setOptions(options)
//       scoreCounts.Detractor.count = datasetsInfo.detractorData.length;
//       scoreCounts.Detractor.percentage =
//         (datasetsInfo.detractorData.reduce((a, b) => a + b, 0) / totalItems) * 100;

//       scoreCounts.Passive.count = datasetsInfo.passiveData.length;
//       scoreCounts.Passive.percentage =
//         (datasetsInfo.passiveData.reduce((a, b) => a + b, 0) / totalItems) * 100;

//       scoreCounts.Promoter.count = datasetsInfo.promoterData.length;
//       scoreCounts.Promoter.percentage =
//         (datasetsInfo.promoterData.reduce((a, b) => a + b, 0) / totalItems) * 100;

//       return {
//         instanceName: instance,
//         totalResponses: dataForInstance.length,
//         scoreCounts,
//         chartData: {
//           labels: labels,
//           datasets: [
//             {
//               label: "Detractor",
//               data: datasetsInfo.detractorData,
//               borderColor: "red",
//               backgroundColor: "red",
//             },
//             {
//               label: "Promoter",
//               data: datasetsInfo.promoterData,
//               borderColor: "green",
//               backgroundColor: "green",
//             },
//             {
//               label: "Passive",
//               data: datasetsInfo.passiveData,
//               borderColor: "yellow",
//               backgroundColor: "yellow",
//             },
//           ],
//         },
//       };
//     });

//     setDisplayDataForAllSelection(allData);
//   }, [selectedChannel, data, instances]);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         "https://100035.pythonanywhere.com/addons/get-response/?scale_id=665d95ae7ee426d671222a7b"
//       );
//       const data = response.data.data;
//       const uniqueChannels = Array.from(
//         new Set(
//           data
//             .filter((item) => item.channel_name !== undefined) 
//             .map((item) => item.channel_name)
//         )
//       );

//       const uniqueInstances = Array.from(
//         new Set(
//           data
//             .filter((item) =>item.instance_name !== undefined) 
//             .map((item) => item.instance_name.trim())
//         )
//       );
      
      
    
//       setChannels([allChannelsNameTag, ...uniqueChannels]);
//       setInstances(uniqueInstances);
//       setData(data);
//       setLoading(false);

//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setLoading(false); // Set loading to false even in case of error
//     }
//   };

//   const handleChannelSelect = (event) => {
//     setSelectedChannel(event.target.value);

//     if (event.target.value === allChannelsNameTag) {
//       setSelectedInstance("");
//       setScores(initialScoreData);
//       setTotalCount(0);
//     }
//   };

//   const handleInstanceSelect = (event) => {
//     setSelectedInstance(event.target.value);

//     // Filter data based on the selected instance and channel
//     const filteredData = data.filter(
//       (item) =>
//         item.instance_name.trim() === event.target.value &&
//         item.channel_name === selectedChannel
//     );
 
//     // Count occurrences of each score
//     const scoreCounts = { Detractor: 0, Passive: 0, Promoter: 0 };
//     filteredData.forEach((item) => {
//       switch (item.category) {
//         case "detractor":
//           scoreCounts["Detractor"]++;
//           break;
//         case "passive":
//           scoreCounts["Passive"]++;
//           break;
//         case "promoter":
//           scoreCounts["Promoter"]++;
//           break;
//         default:
//           break;
//       }
//     });

//     // Calculate total count
//     const totalCount = filteredData.length;

//     // Calculate percentage for each score
//     const scorePercentages = {
//         Detractor: {
//         count: scoreCounts["Detractor"],
//         percentage: (scoreCounts["Detractor"] / totalCount) * 100,
//       },
//       Passive: {
//         count: scoreCounts["Passive"],
//         percentage: (scoreCounts["Passive"] / totalCount) * 100,
//       },
//       Promoter: {
//         count: scoreCounts["Promoter"],
//         percentage: (scoreCounts["Promoter"] / totalCount) * 100,
//       },
//     };

//     setScores(scorePercentages);
//     setTotalCount(totalCount);
//   };

//   if (loading) {
//     return <CircularProgress />;
//   }

//   return (
//     <Box p={3}>
//     <Typography variant="h6" align="center" gutterBottom >
//         Feedback Analysis Dashboard
//       </Typography>
     
      
//       <Grid container spacing={3} alignItems="center" justifyContent="center">
//         <Grid item xs={12} md={6}>
//           <Select
//             value={selectedChannel}
//             onChange={handleChannelSelect}
//             displayEmpty
//             fullWidth
//           >
//             <MenuItem value="" disabled>
//               Select Channel
//             </MenuItem>
//             {channels.map((channel,index) => (
//               <MenuItem key={index} value={channel}>
//                 {channelNames[channel]}
//               </MenuItem>
//             ))}
//           </Select>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Select
//             value={selectedInstance}
//             onChange={handleInstanceSelect}
//             displayEmpty
//             fullWidth
//             disabled={selectedChannel === allChannelsNameTag || selectedChannel.length==0}
//           >
//             <MenuItem value="" disabled>
//               Select Instance
//             </MenuItem>
//             {instances.map((instance) => (
//               <MenuItem key={instance} value={instance}>
//                 {instanceNames[instance]}
//               </MenuItem>
//             ))}
//           </Select>
//         </Grid>
//       </Grid>
//       {selectedChannel === allChannelsNameTag ? (
//         <>
//           {React.Children.toArray(
//             displayDataForAllSelection.map((item, index) => {
//               return (
//                 <>
//                   <Typography
//                     variant="h6"
//                     align="left"
//                     style={{ marginTop: "32px", marginBottom: "10px" }}
//                   >
//                     {index + 1}. {instanceNames[item?.instanceName.trim()]}
//                   </Typography>
//                   {item?.totalResponses==0 && <p className="text-red-500 self-center w-full flex justify-center">Provide feedback to check report</p>}
        
                 
//                   <div className="flex justify-center sm:gap-8 gap-4 text-[14px] sm:text-[18px] font-medium my-5">
//                       <p>
//                         Total Responses: {item?.totalResponses}
//                       </p>
//                       <p>
//                       Nps Score: {((item?.scoreCounts.Promoter.percentage || 0) - (item?.scoreCounts.Detractor.percentage || 0)).toFixed(2)}%
//                       </p>
//                  </div>
//                   <Typography variant="body1" align="center" gutterBottom>
//                     Scores:
//                   </Typography>
//                   <Grid
//                     container
//                     spacing={3}
//                     alignItems="center"
//                     justifyContent="center"
//                   >
//                     {Object.entries(item?.scoreCounts).map(
//                       ([score, data]) => (
//                         <Grid item xs={12} sm={4} key={score}>
//                           <Box textAlign="center">
//                             <Typography
//                               variant="subtitle1"
//                               gutterBottom
//                             >
//                               {`${score}: ${data.count} (${data.percentage.toFixed(
//                                 2
//                               ) || 0}%)`}
//                             </Typography>
//                             <LinearProgress
//                               variant="determinate"
//                               value={data.percentage}
//                               sx={{
//                                 height: "10px",
//                                 borderRadius: "10px",
//                                 "& .MuiLinearProgress-bar": {
//                                   borderRadius: "10px",
//                                   backgroundColor:
//                                     score === "Detractor"
//                                       ? "red"
//                                       : score === "Passive"
//                                       ? "yellow"
//                                       : "green",
//                                 },
//                               }}
//                             />
//                           </Box>
//                         </Grid>
//                       )
//                     )}
//                   </Grid>
//                   <>
//                     <Box
//                       sx={{
//                         mt: 4,
//                         width: "100%",
//                         height: { xs: "300px", sm: "400px" },
//                         maxWidth: "900px",
//                         mx: "auto",
//                       }}
//                     >
//                       <Line options={options} data={item?.chartData} />
//                     </Box>
//                   </>
//                 </>
//               );
//             })
//           )}
//         </>
//       ) : (
//         <>
            
//                <div className="flex justify-center sm:gap-8 gap-4 text-[14px] sm:text-[18px] font-medium  my-5">
//                       <p>
//                         Total Responses: {totalCount}
//                       </p>
//                       <p>
//                       Nps Score: {((scores.Promoter.percentage || 0) - (scores.Detractor.percentage || 0)).toFixed(2)}%
//                       </p>
//                  </div>
//                   {totalCount==0 && selectedInstance.length>1 && selectedChannel.length>1 && <p className="text-red-500 self-center w-full flex justify-center">Provide feedback to check report</p>}
//           <Typography variant="body1" align="center" gutterBottom>
//             Scores:
//           </Typography>
//           <Grid
//             container
//             spacing={3}
//             alignItems="center"
//             justifyContent="center"
//           >
//             {Object.entries(scores).map(([score, data]) => (
//               <Grid item xs={12} sm={4} key={score}>
//                 <Box textAlign="center">
//                   <Typography variant="subtitle1" gutterBottom>
//                     {`${score}: ${data.count} (${data.percentage.toFixed(
//                       2
//                     )}%)`}
//                   </Typography>
//                   <LinearProgress
//                     variant="determinate"
//                     value={data.percentage || 0}
//                     sx={{
//                       height: "10px",
//                       borderRadius: "10px",
//                       "& .MuiLinearProgress-bar": {
//                         borderRadius: "10px",
//                         backgroundColor:
//                           score === "Detractor"
//                             ? "red"
//                             : score === "Passive"
//                             ? "yellow"
//                             : "green",
//                       },
//                     }}
//                   />
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//           {selectedChannel.length < 1 || selectedInstance.length < 1 ? null : (
//             <>
//               <Box
//                 sx={{
//                   mt: 4,
//                   width: "100%",
//                   height: { xs: "300px", sm: "400px" },
//                   maxWidth: "900px",
//                   mx: "auto",
//                 }}
//               >
//                 <Line options={options} data={dateDataForChart} />
//               </Box>
//             </>
//           )}
//         </>
//       )}
//     </Box>
//   );
// };

// export default App;



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
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);





const instanceNames = {
  instance_1: "Exhibition Feedback",
};


const allChannelsNameTag = "channel_all_x";

const channelNames = {
  [`${allChannelsNameTag}`]: "All Channels",
  channel_1: "Exhibition Hall",
};

const initialScoreData = {
    Detractor: { count: 0, percentage: 0 },
    Passive: { count: 0, percentage: 0 },
    Promoter: { count: 0, percentage: 0 },
   
};


function processData(responseData) {
  const dataByDate = {};
  let previousDateData = null;

  responseData.forEach((response) => {
    const dateCreated = formatDate(response.dowell_time.current_time);
    const category = response.category;
    let count = -1;

    if (category === "promoter") {
      count = 1;
    } else if (category !== "detractor") {
      count = 0;
    }

    if (!dataByDate[dateCreated]) {
      dataByDate[dateCreated] = { totalCount: 0, detractorCount: 0, promoterCount: 0, passiveCount: 0 };
    }

    if (count === 1) {
      dataByDate[dateCreated].promoterCount++;
    } else if(count==0) {
      dataByDate[dateCreated].passiveCount++;
    }else{
      dataByDate[dateCreated].detractorCount++;
    }

    dataByDate[dateCreated].totalCount++;
  });

  // Calculate cumulative counts and percentages
  Object.keys(dataByDate).forEach((date) => {
    const obj = dataByDate[date];
    if (previousDateData !== null) {
      obj.promoterCount += previousDateData.promoterCount;
      obj.passiveCount += previousDateData.passiveCount;
      obj.detractorCount += previousDateData.detractorCount;
      obj.totalCount += previousDateData.totalCount;
    }

   

    // Update previousDateData for next iteration
    previousDateData = obj;

  });

  return dataByDate;
}




function filterDataWithinDays(responseData,days) {
  const filteredData = responseData.filter(
    (item) =>
      isWithinLastDays(item.dowell_time.current_time, days)
  );

  return filteredData;
}

function isWithinLastDays(dateString, days) {
  const dateCreated = new Date(dateString);
  const today = new Date();
  const cutoffDate = new Date(today);
  cutoffDate.setDate(today.getDate() - days);

  return dateCreated >= cutoffDate && dateCreated <= today;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
}


function transformData(originalData,days) {

  const transformedData = {};
  const endDate = new Date(); // Today's date
  const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000); // Today minus 7 days

  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateKey = formatDate(currentDate);

    if (originalData.hasOwnProperty(dateKey)) {
      const { detractorCount,promoterCount,passiveCount} = originalData[dateKey];
    
     transformedData[dateKey]={detractorCount,promoterCount,passiveCount}
    } else {
      transformedData[dateKey] = transformedData[formatDate(new Date(currentDate.getTime() - 86400000))] || {detractorCount: 0, promoterCount: 0, passiveCount: 0}; // Get the value of the previous day or 0 if it doesn't exist
    }

    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  }

  return transformedData;
}

function pickSevenKeys(transformedData) {

  const keys = Object.keys(transformedData);
  const totalKeys = keys.length;
  const interval = Math.floor(totalKeys / 6); // Calculate the interval to ensure 7 keys including the first and last
  const selectedKeys = [];

  // Add the first key
  selectedKeys.push(keys[0]);

  // Add keys at regular intervals
  for (let i = interval; i < totalKeys; i += interval) {
    selectedKeys.push(keys[i]);
  }

  // Add the last key
  selectedKeys.push(keys[totalKeys - 1]);

  const selectedKeysObject = {};
  selectedKeys.forEach(key => {
    selectedKeysObject[key] = transformedData[key];
  });

  return selectedKeysObject;
}



function getIndividualCounts(data) {
  let detractorCounts = [];
  let promoterCounts = [];
  let passiveCounts = [];

  data.forEach(entry => {
      detractorCounts.push(entry.detractorCount);
      promoterCounts.push(entry.promoterCount);
      passiveCounts.push(entry.passiveCount);
  });

  return {
      detractorCounts,
      promoterCounts,
      passiveCounts
  };
}



const App = () => {

const[options,setOptions]=useState({})
  const [responseData, setResponseData] = useState([]);
  const[learningIndexData,setLearningIndexData]=useState({})
  const[learningLevelIndex,setLearningLevelIndex]=useState(0)
  const[learningStage,setLearningStage]=useState("")
  const[indexes,setIndexes]=useState([])
  const[counts,setCounts]=useState([])

  const [channels, setChannels] = useState([]);
  const [instances, setInstances] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState("");
  const [selectedInstance, setSelectedInstance] = useState("");
  const [scores, setScores] = useState(initialScoreData);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  // const [data, setData] = useState([]);
  const [dataForChart, setDataForChart] = useState({
    labels: [],
    datasets: [],
  });
  const[npsDataForChart,setNpsDataForChart]=useState({
    labels: [],
    datasets: [],
  })
  const [displayDataForAllSelection, setDisplayDataForAllSelection] = useState(
    []
  );
  //   const[instanceNames,setInstanceNames]=useState({})
  // const[channelNames,setChannelNames]=useState({})
  const[dateIndexPair,setDateCountPair]=useState({})
  const[err,setErr]=useState(false)
  const[msg,setMsg]=useState(false)
const[selectedDays,setSelectedDays]=useState(7)
const[npsOptionData,setNpsOptionData]=useState({})
const[totalScore,setTotalScore]=useState(0)
  useEffect(() => {
    fetchData();
    const x=setInterval(()=>{
      fetchData();
    },10000)
 return(()=>{
 clearInterval(x)
 })
  }, []);




useEffect(()=>{
  if(selectedChannel.length==0 || selectedInstance.length==0 || selectedChannel == allChannelsNameTag)
    return

    const filteredData = responseData.filter(
      (item) =>
        item.instance_name.trim() === selectedInstance &&
        item.channel_name === selectedChannel
    );

  const arr = filterDataWithinDays(filteredData,selectedDays);

  if(arr.length==0){
    const scorePercentages = {
      Detractor: {
        count: 0,
        percentage: 0,
      },
      Passive: {
        count:0,
        percentage: 0,
      },
      Promoter: {
        count: 0,
        percentage:0,
      },
    };

setScores(scorePercentages)
setTotalCount(0)
setDataForChart({
  labels: [1,2,3,4,5],
  datasets: [
                {
                  label: "Detractor",
                  data:[0,0,0,0,0],
                  borderColor: "red",
                  backgroundColor: "red",
                },
                {
                  label: "Promoter",
                  data:[0,0,0,0,0],
                  borderColor: "green",
                  backgroundColor: "green",
                },
                {
                  label: "Passive",
                  data: [0,0,0,0,0],
                  borderColor: "yellow",
                  backgroundColor: "yellow",
                },
              ],
});
setNpsDataForChart({
  labels: [1,2,3,4,5],
  datasets: [
                {
                  label: "NPS",
                  data:[0,0,0,0,0],
                  borderColor: "red",
                  backgroundColor: "red",
                },
               
              ],
});
    setMsg(true)
    return
  }
  
  setMsg(false)
  let scoreCounts={
    detractor:0,
    passive:0,
    promoter:0
   
  }
  let score=0
  arr.forEach((res)=>{
    scoreCounts[res.category]+=1
    score+=res.score
  })
  setTotalScore(score)

  const totalResponses=arr.length

  let percentages={
    Detractor:((scoreCounts.detractor/totalResponses)*100),
    Passive:((scoreCounts.passive/totalResponses)*100),
    Promoter:((scoreCounts.promoter/totalResponses)*100),
   
  }

  const scorePercentages = {
    Detractor: {
      count: scoreCounts["detractor"],
      percentage: percentages["Detractor"],
    },
    Passive: {
      count: scoreCounts["passive"],
      percentage: percentages["Passive"],
    },
    Promoter: {
      count: scoreCounts["promoter"],
      percentage: percentages["Promoter"],
    },
  };

  const processedData = processData(arr);
 
 const transData=transformData(processedData,selectedDays)

 const objectPair=pickSevenKeys(transData)

  // setLearningIndexData(arr[arr.length-1].learning_index_data)

  setTotalCount(totalResponses);
setDateCountPair(objectPair)

  setScores(scorePercentages);
  // let x=Object.values(objectPair)
  // let llx=x[x.length-1]
  // setLearningLevelIndex(llx);
  // if(llx<1)
  //   setLearningStage("learning")
  // else
  // setLearningStage("applying in context")
  
  let labels,datasetsInfo,options,npsOptions
  let detractorCounts=[], passiveCounts=[], promoterCounts=[], npsCounts=[]
if(!objectPair || !arr || arr.length==0){
  labels= [1,2,3,4,5],
  datasetsInfo= [0,0,0,0,0],
  options=npsOptions={
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
        },
        beginAtZero: true,
      },
      x: {
        type: 'linear',
        position: 'bottom',
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
        },
        beginAtZero: true,
      },
    },
  }
  
}else{
  const isSmallScreen = window.innerWidth < 600;
   labels=Object.keys(objectPair)
   datasetsInfo=Object.values(objectPair)

   let obj=getIndividualCounts(datasetsInfo)
   detractorCounts=obj.detractorCounts
   promoterCounts=obj.promoterCounts
   passiveCounts=obj.passiveCounts
   const arr=[...detractorCounts,...passiveCounts,...promoterCounts]
   for(let i=0;i<detractorCounts.length;i++){
    const val=detractorCounts[i]+promoterCounts[i]+passiveCounts[i]
    if(val==0)
      npsCounts[i]=0
    else
    npsCounts[i]=(((promoterCounts[i]-detractorCounts[i])/val)*100).toFixed(2)
   }
   const maxValue=arr.reduce((val,ele)=>Number(val)>ele?val:ele,0)
   const minNps = Math.min(...npsCounts);
    options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
   
      // legend: {
      //   display: false, // This disables the legend entirely
      // },
      title: {
        display: true,
        text: "Responses Insights by Day",
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: isSmallScreen ? 90 : 0,  // Vertical on small screens
          minRotation: isSmallScreen ? 90 : 0,  // Vertical on small screens
        }
      },
      y: {
        min: 0,
        max:Math.ceil(maxValue)+Math.ceil(maxValue / 5)>5?Math.ceil(maxValue)+Math.ceil(maxValue / 5):5,
        ticks: {
          stepSize: Math.ceil(maxValue / 5),
        },
        beginAtZero: true,
      },
    },
  };
  npsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Daywise NPS",
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: isSmallScreen ? 90 : 0,
          minRotation: isSmallScreen ? 90 : 0,
        },
      },
      y: {
        min:minNps<0 ? -100:minNps, // Set the minimum to half of the range in negative
        max:100, // Set the maximum to half of the range in positive
        ticks: {
          stepSize: 25,
          callback: function(value) {
            return value; // Return the value as is, for negative and positive values
          }
        },
        beginAtZero: true,
      },
    },
  };
}

setNpsOptionData(npsOptions)
  setOptions(options)
  setDataForChart({
    labels: labels,
    datasets: [
                  {
                    label: "Detractor",
                    data: detractorCounts,
                    borderColor: "red",
                    backgroundColor: "red",
                  },
                  {
                    label: "Promoter",
                    data:promoterCounts,
                    borderColor: "green",
                    backgroundColor: "green",
                  },
                  {
                    label: "Passive",
                    data: passiveCounts,
                    borderColor: "yellow",
                    backgroundColor: "yellow",
                  },
                ],
  });
  setNpsDataForChart({
    labels: labels,
    datasets: [
                  {
                    label: "NPS",
                    data: npsCounts,
                    borderColor: "red",
                    backgroundColor: "red",
                  },]
  })
},[selectedDays,selectedInstance,responseData,selectedChannel])



  useEffect(() => {
    if (selectedChannel !== allChannelsNameTag){
      if(selectedInstance.length==0){
        const scorePercentages = {
          Detractor: {
            count: 0,
            percentage: 0,
          },
          Passive: {
            count:0,
            percentage: 0,
          },
          Promoter: {
            count: 0,
            percentage:0,
          },
        };
    
    setScores(scorePercentages)
      }
    setDisplayDataForAllSelection([]);
      return 
  }

    if(responseData.length==0){
      setMsg(true)
      return
    }
    
    const allData = instances.map((instance) => {
      const dataForInstance = responseData.filter(
        (item) => item.instance_name.trim() === instance
      );
    
      let dummyCount={
        detractor: 0,
         passive: 0,
          promoter: 0, 
         
      }
      let dummyPercentages={
        detractor: 0,
        passive: 0,
         promoter: 0, 
      }
  
let scoreCounts,percentages,objectPair,totalResponses, score=0
  if(dataForInstance.length==0 ){
     scoreCounts=dummyCount
     percentages=dummyPercentages
  }else{
  
  const arr = filterDataWithinDays(dataForInstance,selectedDays)
  if(arr.length==0){

    setMsg(true)
    return
  }
  
  setMsg(false)
   scoreCounts={
    detractor:0,
    passive:0,
    promoter:0
   
  }

  arr.forEach((res)=>{
    scoreCounts[res.category]+=1
    score+=res.score
  })

   totalResponses=arr.length

   percentages={
    Detractor:((scoreCounts.detractor/totalResponses)*100),
    Passive:((scoreCounts.passive/totalResponses)*100),
    Promoter:((scoreCounts.promoter/totalResponses)*100),
   
  }
  const processedData = processData(arr);

  const transData=transformData(processedData,selectedDays)
   objectPair=pickSevenKeys(transData)
  }
  
   const scorePercentages = {
    Detractor: {
      count: scoreCounts["detractor"],
      percentage: percentages["Detractor"],
    },
    Passive: {
      count: scoreCounts["passive"],
      percentage: percentages["Passive"],
    },
    Promoter: {
      count: scoreCounts["promoter"],
      percentage: percentages["Promoter"],
    },
  };

  setScores(scorePercentages);


   
     let labels,datasetsInfo,options,npsOptions
     let detractorCounts=[], passiveCounts=[], promoterCounts=[], npsCounts=[]
if(!objectPair || dataForInstance.length==0){
  labels= [1,2,3,4,5],
  datasetsInfo= [0,0,0,0,0],
  options=npsOptions={
    responsive: true,
    maintainAspectRatio: false,
    scales: {
    
      y: {
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
        },
        beginAtZero: true,
      },
      x: {
        type: 'linear',
        position: 'bottom',
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
        },
        beginAtZero: true,
      },
    },
  }
  
}else{
  const isSmallScreen = window.innerWidth < 600;
   labels=Object.keys(objectPair)
   datasetsInfo=Object.values(objectPair)

   let obj=getIndividualCounts(datasetsInfo)
   detractorCounts=obj.detractorCounts
   promoterCounts=obj.promoterCounts
   passiveCounts=obj.passiveCounts

   for(let i=0;i<detractorCounts.length;i++){
    const val=detractorCounts[i]+promoterCounts[i]+passiveCounts[i]
    if(val==0)
      npsCounts[i]=0
    else
    npsCounts[i]=(((promoterCounts[i]-detractorCounts[i])/val)*100).toFixed(2)
   }
  //  npsCounts[0]=-20
  //  npsCounts[1]=-80
  //  npsCounts[2]=-100

   const arr=[...detractorCounts,...passiveCounts,...promoterCounts]
   const maxValue=arr.reduce((val,ele)=>Number(val)>ele?val:ele,0)

    options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
   
      // legend: {
      //   display: false, // This disables the legend entirely
      // },
      title: {
        display: true,
        text: "Responses Insights by Day",
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: isSmallScreen ? 90 : 0,  // Vertical on small screens
          minRotation: isSmallScreen ? 90 : 0,  // Vertical on small screens
        }
      },
      y: {
        min: 0,
        max:Math.ceil(maxValue)+Math.ceil(maxValue / 5)>5?Math.ceil(maxValue)+Math.ceil(maxValue / 5):5,
        ticks: {
          stepSize: Math.ceil(maxValue / 5),
        },
        beginAtZero: true,
      },
    },
  };
  const maxNps = Math.max(...npsCounts);
const minNps = Math.min(...npsCounts);




 npsOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "Daywise NPS",
    },
  },
  scales: {
    x: {
      ticks: {
        maxRotation: isSmallScreen ? 90 : 0,
        minRotation: isSmallScreen ? 90 : 0,
      },
    },
    y: {
      min:minNps<0 ? -100:minNps, // Set the minimum to half of the range in negative
      max:100, // Set the maximum to half of the range in positive
      ticks: {
        stepSize: 25,
        callback: function(value) {
          return value; // Return the value as is, for negative and positive values
        }
      },
      beginAtZero: true,
    },
  },
};

}
   
   setOptions(options)
setNpsOptionData(npsOptions)
      return {
        instanceName: instance,
        totalResponses: totalResponses,
        totalScoreData:score,
        scoreCounts:scorePercentages,
        chartData: {
          labels: labels,
          datasets: [
                        {
                          label: "Detractor",
                          data:detractorCounts,
                          borderColor: "red",
                          backgroundColor: "red",
                        },
                        {
                          label: "Promoter",
                          data: promoterCounts,
                          borderColor: "green",
                          backgroundColor: "green",
                        },
                        {
                          label: "Passive",
                          data:passiveCounts,
                          borderColor: "yellow",
                          backgroundColor: "yellow",
                        },
                      ],
       
        },
        npsData:{
          labels: labels,
          datasets: [{
                          label: "NPS",
                          data:npsCounts,
                          borderColor: "red",
                          backgroundColor: "red",
                        }]
        }
      };
    });

    setDisplayDataForAllSelection(allData);
  }, [selectedChannel, responseData, instances,selectedDays]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://100035.pythonanywhere.com/addons/get-response/?scale_id=665d95ae7ee426d671222a7b"
      );
const data=response.data.data

let uniqueInstanceNames = {};
let uniqueInstances = new Set();
let uniqueChannelNames = {};
let uniqueChannels = new Set();

data.forEach((item) => {
  const name=item.instance_name || item.instance
  const trimmedName = name.trim() ;
  if (trimmedName !== "instance_${index 1}" && !uniqueInstances.has(trimmedName)) {
    // uniqueInstanceNames[trimmedName] = item.instance_display_name;
    uniqueInstances.add(trimmedName);
  }
});
// setInstanceNames(uniqueInstanceNames)
data.forEach((item) => {

const name=item.channel_name || item.channel
  const trimmedName = name.trim();
  if (!uniqueChannels.has(trimmedName)) {
    // uniqueChannelNames[trimmedName] = item.channel_display_name;
    uniqueChannels.add(trimmedName);
  }
});
uniqueChannelNames [`${allChannelsNameTag}`]= "All Channels"
setChannels([allChannelsNameTag, ...Array.from(uniqueChannels)]);
setInstances(Array.from(uniqueInstances));
// setChannelNames(uniqueChannelNames)
      setResponseData(data);
      setLoading(false);
    
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Set loading to false even in case of error
    }
  };

  const handleChannelSelect = (event) => {
    setSelectedChannel(event.target.value);

    if (event.target.value === allChannelsNameTag) {
      setSelectedInstance("");
      setScores(initialScoreData);
      setTotalCount(0);
    }
  };

  const handleInstanceSelect = (event) => {
    setSelectedInstance(event.target.value);
  

    
  };

// const questionData=["Do you need more reading or explanation on the topic?",
//   "Did you understand the topic well?",
//   "Did you feel confident explaining the topic to your friends/classmates?",
//   "Can you evaluate others explanation on the topic?",
//   "Can you apply what you understood from the topic in real life or role plays?"]

  const smallText=["Detractor","Passive","Promoter"]

  if (loading) {
    return <CircularProgress />;
  }
  if(err){
    return(
      <>
      <p className="w-screen h-screen flex justify-center items-center p-2 text-red-600">Something went wrong contact admin!..</p>
      </>
    )
  }
  

  return (
    <Box p={1}>
      <Typography variant="h6" align="center" gutterBottom>
      Net Promoter Score
      </Typography>
      {msg && <p className="text-red-500 self-center w-full flex justify-center">Provide feedback to check report</p>}
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={4}>
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
        <Grid item xs={12} md={4}>
          <Select
            value={selectedInstance}
            onChange={handleInstanceSelect}
            displayEmpty
            fullWidth
            disabled={selectedChannel === allChannelsNameTag || selectedChannel.length==0}
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
        <Grid item xs={12} md={3}>
  <Select
    value={selectedDays}
    onChange={(e) => setSelectedDays(parseInt(e.target.value))}
    fullWidth
    disabled={selectedChannel.length === 0}
  >
    <MenuItem key={1} value={7}>
      7 days
    </MenuItem>
    <MenuItem key={2} value={30}>
      30 days
    </MenuItem>
    <MenuItem key={3} value={90}>
      90 days
    </MenuItem>
  </Select>
</Grid>



      
         
      </Grid>
      {selectedChannel === allChannelsNameTag ? (
        <>
          {React.Children.toArray(
            displayDataForAllSelection.map((item, index) => {
         
              return (
                <>
                  <Typography
                    variant="h6"
                    align="left"
                    style={{ marginTop: "16px"}}
                  >
                    {index + 1}. {instanceNames[item?.instanceName.trim()]}
                  </Typography>
                  <div className="flex justify-center items-center gap-2 sm:gap-6 mt-5 mb-4 flex-wrap">
                  <Typography
                    variant="body1"
                    align="center"
                    gutterBottom
                    
                  >
                    Total Responses: {item?.totalResponses}
                  </Typography>
                  <Typography variant="body1" align="center" gutterBottom >
          Total Score: {item?.totalScoreData}/{item?.totalResponses*10}
        </Typography>
        <Typography variant="body1" align="center" gutterBottom >
         NPS:  {(item.scoreCounts.Promoter.percentage-item.scoreCounts.Detractor.percentage).toFixed(2)}
        </Typography>
        </div>
                  <Grid item xs={12} md={0} className="block mb-5 md:hidden " >
 
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
                <Line options={options} data={item.chartData} />
              </Box>
              <Box
                sx={{
                  my: 4,
                  width: "100%",
                  height: { xs: "300px", sm: "400px" },
                  maxWidth: "900px",
                  mx: "auto",
                }}
              >
                 <Line options={npsOptionData} data={item?.npsData} />
              </Box>
            </>
   
  </Grid>
      {/* <p 
     
      
        className="text-orange-600 font-bold text-[16px] ml-5 mt-5 mb-5 sm:mb-0"
      >
        Learning funnel:
  </p> */}
 

<Grid
                    container
                    spacing={3}
                    alignItems="center"
                    justifyContent="center"
                    className="my-8 mt-20"
                  >
                    {Object.entries(item?.scoreCounts).map(
                      ([score, data]) => (
                        <Grid item xs={12} sm={4} key={score}>
                          <Box textAlign="center">
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                            >
                              {`${score}: ${data.count} (${data.percentage.toFixed(
                                2
                              ) || 0}%)`}
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={data.percentage}
                              sx={{
                                height: "10px",
                                borderRadius: "10px",
                                "& .MuiLinearProgress-bar": {
                                  borderRadius: "10px",
                                  backgroundColor:
                                    score === "Detractor"
                                      ? "red"
                                      : score === "Passive"
                                      ? "yellow"
                                      : "green",
                                },
                              }}
                            />
                          </Box>
                        </Grid>
                      )
                    )}
                  </Grid>
                  <div className="hidden md:flex justify-center items-center mt-10 gap-12 flex-wrap" >
  <Grid item xs={12} md={5}>
    <Box sx={{ width: '600px', height: { xs: '300px', sm: '380px' } }}>
      <Line options={options} data={item?.chartData} />
    </Box>
  </Grid>
  <Grid item xs={12} md={5}>
    <Box sx={{ width: '600px', height: { xs: '300px', sm: '380px' } }}>
      <Line options={npsOptionData} data={item?.npsData} />
    </Box>
  </Grid>
</div>


  {/* <Grid item xs={12} md={7}  sx={{
    mt: { xs: 0, md: 5 },
  }}>
<Grid item xs={12} md={5} className="hidden md:block">
    <Box
      sx={{
         ml:"10px",
        width: "100%",
        height: { xs: "300px", sm: "380px" },
        maxWidth: "900px",
        mx: "auto",
      }}
    >
      <Line options={options} data={item?.chartData} />
    </Box>
  </Grid>
  <Grid item xs={12} md={5} className="hidden md:block">
    <Box
      sx={{
         ml:"10px",
        width: "100%",
        height: { xs: "300px", sm: "380px" },
        maxWidth: "900px",
        mx: "auto",
      }}
    >
      <Line options={options} data={item?.chartData} />
    </Box>
  </Grid>
  </Grid> */}
                </>
              );
            })
          )}
        </>
      ) : (
        <>
         <div className="flex justify-center items-center gap-2 sm:gap-6 mt-10 flex-wrap mb-6">
        <Typography variant="body1" align="center" gutterBottom >
          Total Responses: {totalCount}
        </Typography>
        <Typography variant="body1" align="center" gutterBottom >
          Total Score: {totalScore}/{totalCount*10}
        </Typography>
        <Typography variant="body1" align="center" gutterBottom >
         NPS:  {(scores.Promoter.percentage-scores.Detractor.percentage).toFixed(2)}
        </Typography>
      </div>
      <Grid item xs={12} md={0} className="block md:hidden">
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
                <Line options={options} data={dataForChart} />
              </Box>
              <Box
                sx={{
                  my: 4,
                  width: "100%",
                  height: { xs: "300px", sm: "400px" },
                  maxWidth: "900px",
                  mx: "auto",
                }}
              >
                <Line options={npsOptionData} data={npsDataForChart} />
              </Box>
            </>
          )}
  </Grid>
  {/* <p 
     
      
     className="text-orange-600 font-bold text-[16px] ml-5 mt-5 mb-5 sm:mb-0"
   >
     Learning funnel:
</p> */}

  {/* Left side with score counts */}

 
  <Grid
                    container
                    spacing={3}
                    alignItems="center"
                    justifyContent="center"
                    className="my-8 mt-20"
                  >
                    {Object.entries(scores).map(([score, data], index) => (
                     
                        <Grid item xs={12} sm={4} key={score}>
                          <Box textAlign="center">
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                            >
                              {`${score}: ${data.count} (${data.percentage.toFixed(
                                2
                              ) || 0}%)`}
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={data.percentage}
                              sx={{
                                height: "10px",
                                borderRadius: "10px",
                                "& .MuiLinearProgress-bar": {
                                  borderRadius: "10px",
                                  backgroundColor:
                                    score === "Detractor"
                                      ? "red"
                                      : score === "Passive"
                                      ? "yellow"
                                      : "green",
                                },
                              }}
                            />
                          </Box>
                        </Grid>
                      )
                    )}
                  </Grid>
  {/* Right side with chart data */}



<div className="hidden md:flex justify-center items-center mt-10 gap-12 flex-wrap" >
  {selectedChannel.length < 1 || selectedInstance.length < 1 ? null : (
    <>
  <Grid item xs={12} md={5}>
    <Box sx={{ width: '600px', height: { xs: '300px', sm: '380px' } }}>
      <Line options={options} data={dataForChart} />
    </Box>
  </Grid>
  <Grid item xs={12} md={5}>
    <Box sx={{ width: '600px', height: { xs: '300px', sm: '380px' } }}>
      <Line options={npsOptionData} data={npsDataForChart} />
    </Box>
  </Grid>
  </>
  )}
</div>
        
          
        </>
      )}
    </Box>
  );
};

export default App


{/* <Grid
container
spacing={10}
alignItems="center"
justifyContent="center"
>
{/* Left side with score counts */}
{/* <Grid item xs={12} md={7}  sx={{
    mt: { xs: 0, md: 5 },
  }}>
  {Object.entries(item?.scoreCounts).map(([score, data], index) => (
    <Box
      key={score}
      sx={{
        maxWidth: { xs: "100%", sm: "90%", md: "85%", lg: "100%" },
        mx: "10px",
      
        textAlign: "center",
        mb: 4,
      }}
    //> */}
      //<div className="grid lg:flex lg:justify-between">
      {/* <span className="text-[12px] flex items-start justify-start">{questionData[index]}</span> */}
      //<div className="flex justify-center items-center w-full">
      //<span className="text-[16px] md:text-[18px]">{smallText[index]}: </span>
//<span className="font-bold mx-2">{data.count}</span>
      //<span className="font-medium">({(data.percentage ? data.percentage.toFixed(2) : 0)}%)</span>
//</div>
      //</div>
      {/* {`${questionData[index]}: ${data.count} (${data.percentage.toFixed(2) || 0}%)`} */}
     // <LinearProgress
      //  variant="determinate"
       // className="mt-2"
       // value={data.percentage || 0}
       // sx={{
         // height: "10px",
          
        //  borderRadius: "10px",
         // "& .MuiLinearProgress-bar": {
            // borderRadius: "10px",
            // backgroundColor: (() => {
            //   if (score === "Detractor") return "#FF0000"; // Red
      
            //   if (score === "Passive") return "#FFFF00"; // Yellow
             
            //   return "#00FF00"; // Green
            // })(),
  //         },
  //       }}
  //     />
  //   </Box>
  // ))}
// </Grid>

{/* Right side with chart data */}
{/* <Grid item xs={12} md={5} className="hidden md:block">
  <Box
    sx={{
       ml:"10px",
      width: "100%",
      height: { xs: "300px", sm: "380px" },
      maxWidth: "900px",
      mx: "auto",
    }}
  >
    <Line options={options} data={item?.chartData} />
  </Box>
</Grid> */}
//</Grid> */}