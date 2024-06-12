

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
  instance_1: "Student feedback",
  instance_2:"Example1",
  instance_3:"Example2"
};

 const allChannelsNameTag = "channel_all_x";

const channelNames = {
   [`${allChannelsNameTag}`]: "All Channels",
  channel_1: "Classroom",
};





const initialScoreData = {
    Reading: { count: 0, percentage: 0 },
    Understanding: { count: 0, percentage: 0 },
    Explaining: { count: 0, percentage: 0 },
    Evaluating: { count: 0, percentage: 0 },
    Applying: { count: 0, percentage: 0 }
};
// const extractLabelsAndDatasetsInfo = (data = []) => {
// if(data.length==0)
//   return {labels: [1,2,3,4,5],
//     datasetsInfo: [0,0,0,0,0],
//     options:{
//       responsive: true,
//       maintainAspectRatio: false,
//       scales: {
//         y: {
//           min: 0,
//           max: 5,
//           ticks: {
//             stepSize: 1,
//           },
//           beginAtZero: true,
//         },
//         x: {
//           type: 'linear',
//           position: 'bottom',
//           min: 0,
//           max: 5,
//           ticks: {
//             stepSize: 1,
//           },
//           beginAtZero: true,
//         },
//       },
//     }
//     }
  
//   let length=data.length;
//   let arr=data 
  
//   if(length>5){
//     let x=Math.floor(length/5);
//      arr=[]
//      for(let i=0;i<length;i+=x){
 
//       arr.push(data[i])
//      }
//      if (!arr.includes(data[length - 1])) {
//       arr.push(data[length - 1]);
//     }
//   }

//   let labelsForCharts = [
//     ...new Set(
//       arr
//         .map(
//           (item) =>
//             item?.learning_index_data ?.control_group_size
            
//         )
//     ),
//   ];

//   if (!labelsForCharts.includes(0)) {
//     labelsForCharts = [0, ...labelsForCharts];
//   }
//   let datasetsForCharts = {
//     indexData: [],

//   };


// arr.forEach((data)=>{
//   datasetsForCharts.indexData.push(data.learning_index_data ?.learning_level_index)
// })
 

//   datasetsForCharts.indexData = [0, ...datasetsForCharts.indexData];

//   let stepSize, max, index;
//   if (arr.length === 0) {
//     max = 5;
//     stepSize = 0;
//   } else {
//     index = arr.reduce((initial, ele) => {
//       const currentIndex = ele?.learning_index_data?.learning_level_index;
//       if (currentIndex !== undefined && currentIndex > initial) {
//         return currentIndex;
//       } else {
//         return initial;
//       }
//     }, 0);
   
//   }


//     const options = {
//       responsive: true,
//       maintainAspectRatio: false,
//       plugins: {
//         legend: {
//           position: "top",
//         },
//         title: {
//           display: true,
//           text: "Learning Indexes",
//         },
//       },
//       scales: {
//         y: {
//           min: 0,
//           max:index+1,
//           ticks: {
//             stepSize:Math.ceil(index / 5) || 1
//           },
//           beginAtZero: true,
//         },
//         x: {
//           type: 'linear',
//           position: 'bottom',
//           max:max || arr[arr.length-1].learning_index_data.control_group_size+2,
//           ticks: {
//             stepSize:stepSize || Math.floor(arr[arr.length-1].learning_index_data.control_group_size/5),
//             min: 0,
          
//           },
//           beginAtZero: true
//         },
//       },
//     };

//   return {
//     labels: labelsForCharts,
//     datasetsInfo: datasetsForCharts,
//     options
//   };
// };


const extractLabelsAndDatasetsInfo = (data = [],days) => {
  if(data.length==0)
    return {labels: [1,2,3,4,5],
      datasetsInfo: [0,0,0,0,0],
      options:{
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
      }
    
    let length=data.length;
    let arr=data 
    
    if(length>5){
      let x=Math.floor(length/5);
       arr=[]
       for(let i=0;i<length;i+=x){
   
        arr.push(data[i])
       }
       if (!arr.includes(data[length - 1])) {
        arr.push(data[length - 1]);
      }
    }
    function formatDate(dateString) {
      const date = new Date(dateString);
      return date.toDateString();
    }
    
  
    
    // Function to create the object pair
    function createObjectPair(responses) {
      const result = {};
    
      responses.forEach(response => {
        const readableDate = formatDate(response.date_created);
        const learningLevelIndex = response.learning_index_data.learning_level_index;
    
      
          result[readableDate] = learningLevelIndex;
       
      });
    
      return result;
    }
    
    // Function to get the last 7 days and fill in missing values
    function getLastXDaysData(responses,days) {
      const objectPair = createObjectPair(responses);
  
      const result = {};
      const now = new Date();
    
      for (let i = days-1; i >= 0; i--) {
        const date = new Date();
        date.setDate(now.getDate() - i);
        const dateString = date.toDateString();
    
        if (objectPair.hasOwnProperty(dateString)) {
          result[dateString] = objectPair[dateString];
        } else {
          let previousValue = 0;
          let valueArray=Object.values(result)
          if(valueArray.length>0){
              previousValue=valueArray[valueArray.length-1]
          }else{
         
          for (let j = 1; j <= i; j++) {
            const previousDate = new Date(date);
            previousDate.setDate(date.getDate() - j);
            const previousDateString = previousDate.toDateString();

        if (objectPair.hasOwnProperty(previousDateString)) {
          previousValue = objectPair[previousDateString];
          break;
        }
      }
      }

      result[dateString] = previousValue;
      
        }
      }
      const keys = Object.keys(result);
  if (keys.length > 10) {
    const step = Math.ceil((keys.length - 2) / 8); // 8 steps between the first and last
    const selectedKeys = [keys[0]]; // Always include the first key
    for (let i = step; i < keys.length - 1; i += step) {
      selectedKeys.push(keys[i]);
      if (selectedKeys.length === 9) break; // Ensure only 8 middle values are selected
    }
    selectedKeys.push(keys[keys.length - 1]); // Always include the last key

    // Construct a new result object with only the selected keys
    const selectedResult = {};
    selectedKeys.forEach(key => {
      selectedResult[key] = result[key];
    });

    return selectedResult;
  }
      
      return result;
    }

    // Create the object pair
    const objectPair = getLastXDaysData(arr,days)

    let labelsForCharts = [
      ...new Set(
        arr
          .map(
            (item) =>
              item?.learning_index_data ?.control_group_size
              
          )
      ),
    ];
  
    if (!labelsForCharts.includes(0)) {
      labelsForCharts = [0, ...labelsForCharts];
    }
    let datasetsForCharts = {
      indexData: Object.values(objectPair),
  
    };
  
  const maxValue=Object.values(objectPair).reduce((val,ele)=>val>ele?val:ele,0)
 
  
  
   
  
   
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
    scales: {
      y: {
        min: 0,
        max:Math.ceil(maxValue+2),
        ticks: {
          stepSize: Math.ceil(maxValue / 5),
        },
        beginAtZero: true,
      },
    },
  };
  
    return {
      labels: Object.keys(objectPair),
      datasetsInfo: datasetsForCharts,
      options
    };
  };


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
  const [learningIndexDataForChart, setLearningIndexDataForChart] = useState({
    labels: [],
    datasets: [],
  });
  const [displayDataForAllSelection, setDisplayDataForAllSelection] = useState(
    []
  );
  const[err,setErr]=useState(false)
  const[msg,setMsg]=useState(false)
const[selectedDays,setSelectedDays]=useState(7)
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedChannel.length < 1 || selectedInstance.length < 1) return;
    
      if(responseData.length==0){
        setMsg(true)
        return
      }
   
      const arr= responseData.filter(
        (item) =>
          item.channel === selectedChannel &&
          item.instance.trim() === selectedInstance
      )
      if(arr.length==0){
    
        setMsg(true)
        return
      }
      setMsg(false)
    const { labels, datasetsInfo,options } = extractLabelsAndDatasetsInfo(arr,selectedDays);

setOptions(options)
    setLearningIndexDataForChart({
      labels: labels,
      datasets: [
        {
          label: "Index Data",
          data: datasetsInfo.indexData,
          borderColor: "red",
          backgroundColor: "red",
        },
       
      ],
    });
  }, [selectedChannel, selectedInstance, responseData,selectedDays]);

  useEffect(() => {
    if (selectedChannel !== allChannelsNameTag)
      return setDisplayDataForAllSelection([]);

    if(responseData.length==0){
      setMsg(true)
      return
    }
    
    const allData = instances.map((instance) => {
      const dataForInstance = responseData.filter(
        (item) => item.instance.trim() === instance
      );
      let dummyCount={
        reading: 0,
         understanding: 0,
          explaining: 0, 
          evaluating: 0,applying: 0
      }
      let dummyPercentages={
        reading: 0, understanding: 0, explaining: 0, evaluating: 0, applying: 0
      }
  
let scoreCounts,percentages
  if(dataForInstance.length==0 || !dataForInstance[dataForInstance.length - 1].learning_index_data ||  !dataForInstance[dataForInstance.length - 1].learning_index_data.learning_level_count){
     scoreCounts=dummyCount
     percentages=dummyPercentages
  }else{
    scoreCounts = dataForInstance[dataForInstance.length - 1].learning_index_data?.learning_level_count 
    percentages = dataForInstance[dataForInstance.length - 1].learning_index_data?.learning_level_percentages
  }

  
  
  
      const scorePercentages = {
        Reading: {
          count: scoreCounts["reading"],
          percentage: percentages["reading"],
        },
        Understanding: {
          count: scoreCounts["understanding"],
          percentage: percentages["understanding"],
        },
        Explaining: {
          count: scoreCounts["explaining"],
          percentage: percentages["explaining"],
        },
        Evaluating: {
          count: scoreCounts["evaluating"],
          percentage: percentages["evaluating"],
        },
        Applying: {
          count: scoreCounts["applying"],
          percentage: percentages["applying"],
        },
      };
  //     setLearningIndexData(filteredData[filteredData.length-1].learning_index_data)
  //     const totalCount = filteredData.length;
  //     setTotalCount(totalCount);
  // setLearningStage(responseData[responseData.length-1].learning_index_data.learning_stage)
      setScores(scorePercentages);
     // setLearningLevelIndex(filteredData[filteredData.length-1].learning_index_data.learning_level_index.toFixed(2));
      

      const { labels, datasetsInfo, options } = extractLabelsAndDatasetsInfo(
        dataForInstance
      );

   setOptions(options)

      return {
        instanceName: instance,
        totalResponses: dataForInstance.length,
        scoreCounts:scorePercentages,
        chartData: {
          labels: labels,
          datasets: [
            {
              label: "Index Data",
              data: datasetsInfo.indexData,
              borderColor: "red",
              backgroundColor: "red",
            },
           
          ],
        },
      };
    });

    setDisplayDataForAllSelection(allData);
  }, [selectedChannel, responseData, instances]);

  const fetchData = async () => {
   
    try {
      const response = await axios.get(
        "https://100035.pythonanywhere.com/addons/learning-index-report/?scale_id=665ed9b87db9a73b55dd515f"
      );
     const data=response.data.data
    if(data==undefined){
      setErr(true)
      return
    }
setErr(false)
      const uniqueChannels = Array.from(
        new Set(data.map((item) => item.channel))
      );
      const uniqueInstances = Array.from(
        new Set(data.map((item) => item.instance.trim()))
      );

      setChannels([allChannelsNameTag, ...uniqueChannels]);
      setInstances(uniqueInstances);
      setResponseData(data);
      setLoading(false);
    
    } catch (error) {
      console.error("Error fetching data:", error);
      setErr(true)
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
  
    // Filter data based on the selected instance and channel
    const filteredData = responseData.filter(
      (item) =>
        item.instance.trim() === event.target.value &&
        item.channel === selectedChannel
    );
    
    if(filteredData.length==0){
      setMsg(true)
      return
    }
    setMsg(false)
    const scoreCounts = filteredData[filteredData.length - 1]?.learning_index_data?.learning_level_count ?? [];
    const percentages = filteredData[filteredData.length - 1]?.learning_index_data?.learning_level_percentages ?? [];

    const scorePercentages = {
      Reading: {
        count: scoreCounts["reading"],
        percentage: percentages["reading"],
      },
      Understanding: {
        count: scoreCounts["understanding"],
        percentage: percentages["understanding"],
      },
      Explaining: {
        count: scoreCounts["explaining"],
        percentage: percentages["explaining"],
      },
      Evaluating: {
        count: scoreCounts["evaluating"],
        percentage: percentages["evaluating"],
      },
      Applying: {
        count: scoreCounts["applying"],
        percentage: percentages["applying"],
      },
    };
    setLearningIndexData(filteredData[filteredData.length-1].learning_index_data)
    const totalCount = filteredData.length;
    setTotalCount(totalCount);
setLearningStage(responseData[responseData.length-1].learning_index_data.learning_stage)
    setScores(scorePercentages);
    setLearningLevelIndex(filteredData[filteredData.length-1].learning_index_data.learning_level_index.toFixed(2));
    
  };




  

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
        Feedback Analysis Dashboard
      </Typography>
      {msg && <p className="text-red-500 self-center w-full flex justify-center">Provide feedback to check report</p>}
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
                    style={{ marginTop: "32px", marginBottom: "10px" }}
                  >
                    {index + 1}. {instanceNames[item?.instanceName.trim()]}
                  </Typography>

                  <Typography
                    variant="body1"
                    align="center"
                    gutterBottom
                    style={{ marginTop: "16px" }}
                  >
                    Total Responses: {item?.totalResponses}
                  </Typography>
                  <Typography variant="body1" align="center" gutterBottom>
                    Scores:
                  </Typography>
                  <Grid
                    container
                    spacing={3}
                    alignItems="center"
                    justifyContent="center"
                  >
                    {Object.entries(item?.scoreCounts).map(
                      ([score, data]) => (
                        <Grid item xs={12} key={score}>
                              <Box
                                sx={{
                                  maxWidth: { xs: "100%", sm: "80%", md: "70%", lg: "60%" },
                                  mx: "auto",
                                  textAlign: "center",
                                }}
                              >
                              {`${score}: ${data.count} (${data.percentage.toFixed(
                                2
                              ) || 0}%)`}
                          
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
                      )
                    )}
                  </Grid>
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
                      <Line options={options} data={item?.chartData} />
                    </Box>
                  </>
                </>
              );
            })
          )}
        </>
      ) : (
        <>
         <div className="flex justify-center items-center gap-2 sm:gap-6 mt-10 flex-wrap">
        <Typography variant="body1" align="center" gutterBottom >
          Total Responses: {totalCount}
        </Typography>
        <Typography variant="body1" align="center" gutterBottom >
          Learning Index: {learningLevelIndex}
        </Typography>
        <Typography variant="body1" align="center" gutterBottom >
        Learning Stage: {learningStage}
        </Typography>
      </div>

      <Typography 
        variant="body1" 
        align="center" 
        gutterBottom 

        style={{ color: 'orange',fontWeight:"bold" }}
      >
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
        <div className="w-full flex flex-col justify-end items-end sm:justify-center sm:items-center p-2 mt-5">
        <label htmlFor="days " className="text-[12px] sm:text-[14px]">Select Days: </label>
      <select id="days" value={selectedDays} onChange={(e)=>setSelectedDays(e.target.value)} className="mr-2  mt-1text-[12px] bg-gray-100 p-1 rounded-lg">
        <option value={7}> 7</option>
        <option value={30}> 30</option>
        <option value={90}> 90</option>
      </select>
        </div>
         
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
                <Line options={options} data={learningIndexDataForChart} />
              </Box>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default App
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


// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );
// import LineChart from "../../Components/LineChart"
// const instanceNames = {
//   instance_1: "Student feedback",

// };

// // const allChannelsNameTag = "channel_all_x";

// const channelNames = {
// //   [`${allChannelsNameTag}`]: "All Channels",
//   channel_1: "Classroom",
// };

// const options = {
//   responsive: true,
//   maintainAspectRatio: false,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//     title: {
//       display: true,
//       text: "Responses Insights by Day",
//     },
//   },
// };



// const initialScoreData = {
//     Reading: { count: 0, percentage: 0 },
//     Understanding: { count: 0, percentage: 0 },
//     Explaining: { count: 0, percentage: 0 },
//     Evaluating: { count: 0, percentage: 0 },
//     Applying: { count: 0, percentage: 0 }
// };

// const App = () => {
//   const [channels, setChannels] = useState([]);
//   const [instances, setInstances] = useState([]);
//   const [selectedChannel, setSelectedChannel] = useState("");
//   const [selectedInstance, setSelectedInstance] = useState("");
//   const [scores, setScores] = useState(initialScoreData);
//   const [totalCount, setTotalCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [responseData, setResponseData] = useState([]);
//   const[learningIndexData,setLearningIndexData]=useState({})
//   const[learningLevelIndex,setLearningLevelIndex]=useState(0)
//   const[learningStage,setLearningStage]=useState("")
//   const[indexes,setIndexes]=useState([])
//   const[counts,setCounts]=useState([])
//   const[responseForChannles,setResponseForChannels]=useState([{
//     channelName:"",
//     instances:[{
//       instanceNames
//     }]
//   }])


// useEffect(()=>{
//   fetchData()
// },[])

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         "https://100035.pythonanywhere.com/addons/learning-index-report/?scale_id=66581beae29ef8faa980b1c2"
//       );
//       const data = response.data.data;

//       setChannels(["channel_1"]);
//       setInstances(["instance_1"]);
//       setResponseData(data);
//       setLearningIndexData(data[data.length - 1].learning_index_data);
   
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChannelSelect = (event) => {
//     setSelectedChannel(event.target.value);
//   };

//   const handleInstanceSelect = (event) => {
//     setSelectedInstance(event.target.value);
//     const scoreCounts = learningIndexData.learning_level_count;
//     const percentages = learningIndexData.learning_level_percentages;

//     setTotalCount(learningIndexData.control_group_size);

//     const scorePercentages = {
//       Reading: {
//         count: scoreCounts["reading"],
//         percentage: percentages["reading"],
//       },
//       Understanding: {
//         count: scoreCounts["understanding"],
//         percentage: percentages["understanding"],
//       },
//       Explaining: {
//         count: scoreCounts["explaining"],
//         percentage: percentages["explaining"],
//       },
//       Evaluating: {
//         count: scoreCounts["evaluating"],
//         percentage: percentages["evaluating"],
//       },
//       Applying: {
//         count: scoreCounts["applying"],
//         percentage: percentages["applying"],
//       },
//     };
// setLearningStage(responseData[responseData.length-1].learning_index_data.learning_stage)
//     setScores(scorePercentages);
//     setLearningLevelIndex(learningIndexData.learning_level_index.toFixed(2));
//     getChartDetails();
//   };

//   const getChartDetails = () => {
//     const lengthOfResponses = responseData.length;
//     if (lengthOfResponses < 5) {
//       const newIndexes = [];
//       const newCounts = [];
//       responseData.forEach((obj) => {
//         newIndexes.push(obj.learning_index_data.learning_level_index);
//         newCounts.push(obj.learning_index_data.control_group_size);
//       });
//       setIndexes(newIndexes);
//       setCounts(newCounts);
//     } else {
//       const increment = Math.floor(lengthOfResponses / 5);
//       const newIndexes = [0];
//       const newCounts = [0];
//       for (let i = increment - 1; i < lengthOfResponses; i += increment) {
//         newIndexes.push(responseData[i].learning_index_data.learning_level_index.toFixed(2));
//         newCounts.push(responseData[i].learning_index_data.control_group_size);
//       }
//       setIndexes(newIndexes);
//       setCounts(newCounts);
//     }
//   };



//   if (loading) {
//     return <CircularProgress />;
//   }

//   return (
//     <Box p={3}>
//     <Typography variant="h4" align="center" gutterBottom>
//       Feedback Analysis Dashboard
//     </Typography>
//     <Grid container spacing={3} alignItems="center" justifyContent="center">
//       <Grid item xs={12} md={6}>
//         <Select
//           value={selectedChannel}
//           onChange={handleChannelSelect}
//           displayEmpty
//           fullWidth
//         >
//           <MenuItem value="" disabled>
//             Select Channel
//           </MenuItem>
//           {channels.map((channel) => (
//             <MenuItem key={channel} value={channel}>
//               {channelNames[channel]}
//             </MenuItem>
//           ))}
//         </Select>
//       </Grid>
//       <Grid item xs={12} md={6}>
//         <Select
//           value={selectedInstance}
//           onChange={handleInstanceSelect}
//           displayEmpty
//           fullWidth
//         >
//           <MenuItem value="" disabled>
//             Select Instance
//           </MenuItem>
//           {instances.map((instance) => (
//             <MenuItem key={instance} value={instance}>
//               {instanceNames[instance]}
//             </MenuItem>
//           ))}
//         </Select>
//       </Grid>
//     </Grid>
    
//     <>
//     <div className="flex justify-center items-center gap-2 sm:gap-6 mt-10 flex-wrap">
//   <Typography variant="body1" align="center" gutterBottom >
//     Total Responses: {totalCount}
//   </Typography>
//   <Typography variant="body1" align="center" gutterBottom >
//     Learning Index: {learningLevelIndex}
//   </Typography>
//   <Typography variant="body1" align="center" gutterBottom >
//    Learning Stage: {learningStage}
//   </Typography>
// </div>

// <Typography 
//   variant="body1" 
//   align="center" 
//   gutterBottom 

//   style={{ color: 'orange',fontWeight:"bold" }}
// >
//   Scores:
// </Typography>

//       <Grid container spacing={3} justifyContent="center">
//   {Object.entries(scores).map(([score, data]) => (
//     <Grid item xs={12} key={score}>
//       <Box
//         sx={{
//           maxWidth: { xs: "100%", sm: "80%", md: "70%", lg: "60%" },
//           mx: "auto",
//           textAlign: "center",
//         }}
//       >
//         <Typography variant="subtitle1" gutterBottom>
//           {`${score}: ${data.count} (${data.percentage.toFixed(2)}%)`}
//         </Typography>
//         <LinearProgress
//           variant="determinate"
//           value={data.percentage || 0}
//           sx={{
//             height: "10px",
//             borderRadius: "10px",
//             "& .MuiLinearProgress-bar": {
//               borderRadius: "10px",
//               backgroundColor: (() => {
//                 if (score === "Reading") return "#FF0000"; // Red
//                 if (score === "Understanding") return "#FF7F00"; // Orange
//                 if (score === "Explaining") return "#FFFF00"; // Yellow
//                 if (score === "Evaluating") return "#7FFF00"; // Light Green
//                 return "#00FF00"; // Green
//               })(),
//             },
//           }}
//         />
//       </Box>
//     </Grid>
//   ))}
// </Grid>

//       {selectedChannel.length < 1 || selectedInstance.length < 1 ? null : (
//         <>
//           <Box
//             sx={{
//               mt: 4,
//               width: "100%",
//               height: { xs: "300px", sm: "400px" },
//               maxWidth: "900px",
//               mx: "auto",
//             }}
//           >
//             {totalCount !== 0 && <LineChart indexes={indexes} total={counts} stepSize={Math.floor(responseData.length / 5)} />}
//           </Box>
//         </>
//       )}
//     </>
//   </Box>
//   );
// };

// export default App;
