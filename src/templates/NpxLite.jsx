
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


const allChannelsNameTag = "channel_all_x";


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
  const [learningIndexDataForChart, setLearningIndexDataForChart] = useState({
    labels: [],
    datasets: [],
  });
  const [displayDataForAllSelection, setDisplayDataForAllSelection] = useState(
    []
  );
    const[instanceNames,setInstanceNames]=useState({})
  const[channelNames,setChannelNames]=useState({})
  const[dateIndexPair,setDateCountPair]=useState({})
  const[err,setErr]=useState(false)
  const[msg,setMsg]=useState(false)
const[selectedDays,setSelectedDays]=useState(7)


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
setLearningIndexDataForChart({
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
    setMsg(true)
    return
  }
  
  setMsg(false)
  let scoreCounts={
    detractor:0,
    passive:0,
    promoter:0
   
  }
  arr.forEach((res)=>{
    scoreCounts[res.category]+=1
  })
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
  
  let labels,datasetsInfo,options
  let detractorCounts=[], passiveCounts=[], promoterCounts=[]
if(!objectPair || !arr || arr.length==0){
  labels= [1,2,3,4,5],
  datasetsInfo= [0,0,0,0,0],
  options={
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
}


  setOptions(options)
  setLearningIndexDataForChart({
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
  
let scoreCounts,percentages,objectPair,totalResponses
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
  })
  const totalResponses=arr.length

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


   
     let labels,datasetsInfo,options
     let detractorCounts=[], passiveCounts=[], promoterCounts=[]
if(!objectPair || dataForInstance.length==0){
  labels= [1,2,3,4,5],
  datasetsInfo= [0,0,0,0,0],
  options={
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
}
     
   

   setOptions(options)

      return {
        instanceName: instance,
        totalResponses: totalResponses,
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
      };
    });

    setDisplayDataForAllSelection(allData);
  }, [selectedChannel, responseData, instances,selectedDays]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://100035.pythonanywhere.com/addons/get-response/?scale_id=666bf1dfd4ec1a2b3f7ab5b0"
      );
const data=response.data.data

let uniqueInstanceNames = {};
let uniqueInstances = new Set();
let uniqueChannelNames = {};
let uniqueChannels = new Set();

data.forEach((item) => {
  const trimmedName = item.instance_name.trim();
  if (trimmedName !== "instance_${index 1}" && !uniqueInstances.has(trimmedName)) {
    uniqueInstanceNames[trimmedName] = item.instance_display_name;
    uniqueInstances.add(trimmedName);
  }
});
setInstanceNames(uniqueInstanceNames)
data.forEach((item) => {

  const trimmedName = item.channel_name.trim();
  if (!uniqueChannels.has(trimmedName)) {
    uniqueChannelNames[trimmedName] = item.channel_display_name;
    uniqueChannels.add(trimmedName);
  }
});
uniqueChannelNames [`${allChannelsNameTag}`]= "All Channels"
setChannels([allChannelsNameTag, ...Array.from(uniqueChannels)]);
setInstances(Array.from(uniqueInstances));
setChannelNames(uniqueChannelNames)
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
      DoWell Learning Level Index
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
                  <Grid item xs={12} md={0} className="block md:hidden">
 
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
            </>
         
  </Grid>
      <p 
     
      
        className="text-orange-600 font-bold text-[16px] ml-5 mt-5 mb-5 sm:mb-0"
      >
        Learning funnel:
  </p>
    <Grid
  container
  spacing={10}
  alignItems="center"
  justifyContent="center"
>
  {/* Left side with score counts */}
  <Grid item xs={12} md={7}  sx={{
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
      >
        <div className="grid lg:flex lg:justify-between">
        {/* <span className="text-[12px] flex items-start justify-start">{questionData[index]}</span> */}
        <div className="flex justify-center items-center">
        <span className="text-[16px] font-medium">{smallText[index]}: </span>
        <span className="font-bold mx-2">{data.count}</span>
        <span className="font-medium">({(data.percentage ? data.percentage.toFixed(2) : 0)}%)</span>
        </div>
        </div>
        {/* {`${questionData[index]}: ${data.count} (${data.percentage.toFixed(2) || 0}%)`} */}
        <LinearProgress
          variant="determinate"
          className="mt-2"
          value={data.percentage || 0}
          sx={{
            height: "10px",
            
            borderRadius: "10px",
            "& .MuiLinearProgress-bar": {
              borderRadius: "10px",
              backgroundColor: (() => {
                if (score === "Detractor") return "#FF0000"; // Red
        
                if (score === "Passive") return "#FFFF00"; // Yellow
               
                return "#00FF00"; // Green
              })(),
            },
          }}
        />
      </Box>
    ))}
  </Grid>

  {/* Right side with chart data */}
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
</Grid>


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
                <Line options={options} data={learningIndexDataForChart} />
              </Box>
            </>
          )}
  </Grid>
  <p 
     
      
     className="text-orange-600 font-bold text-[16px] ml-5 mt-5 mb-5 sm:mb-0"
   >
     Learning funnel:
</p>
  <Grid
  container
  spacing={10}
  alignItems="center"
  justifyContent="center"
>
  {/* Left side with score counts */}

  <Grid item xs={12}   sx={{
      mt: { xs: 0, md: 5 },
    }} md={selectedChannel.length==0 || (selectedChannel=="channel_1" && selectedInstance.length==0) ? 11 : 7}
    lg={selectedInstance.length==0 ? 9 : 7}
    >
    {Object.entries(scores).map(([score, data], index) => (
      <Box
        key={score}
        sx={{
          maxWidth: { xs: "100%", sm: "90%", md: "85%", lg: "100%" },
          mx: "10px",
        
          textAlign: "center",
          mb: 4,
        }}
      >
       
     
        <div className="grid lg:flex lg:justify-between">
        {/* <span className="text-[12px] flex items-start justify-start">{questionData[index]}</span> */}
        <div className="flex justify-center items-center">
        <span className="md:text-[16px]  ">{smallText[index]}: </span>
        <span className="font-bold mx-2">{data.count}</span>
        <span className="font-medium">({(data.percentage ? data.percentage.toFixed(2) : 0)}%)</span>
        </div>
        </div>
        <LinearProgress
          variant="determinate"
          value={data.percentage || 0}
          className="mt-2"
          sx={{
            height: "10px",
            
            borderRadius: "10px",
            "& .MuiLinearProgress-bar": {
              borderRadius: "10px",
              backgroundColor: (() => {
                if (score === "Detractor") return "#FF0000"; // Red
                if (score === "Passive") return "#FFFF00"; // Yellow
                 return "#00FF00"; // Green
              })(),
            },
          }}
        />
      </Box>
    ))}
  </Grid>

  {/* Right side with chart data */}
  <Grid item md={5} className="hidden md:block">
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
  </Grid>
</Grid>

        
          
        </>
      )}
    </Box>
  );
};

export default App

