

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
  const [responseData, setResponseData] = useState([]);
  const[learningIndexData,setLearningIndexData]=useState({})
  const[learningLevelIndex,setLearningLevelIndex]=useState(0)
  const[indexes,setIndexes]=useState([])
  const[counts,setCounts]=useState([])
useEffect(()=>{
  fetchData()
},[])

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://100035.pythonanywhere.com/addons/learning-index-report/?scale_id=66581beae29ef8faa980b1c2"
      );
      const data = response.data.data;

      setChannels(["channel_1"]);
      setInstances(["instance_1"]);
      setResponseData(data);
      setLearningIndexData(data[data.length - 1].learning_index_data);
      setLearningLevelIndex(data[data.length - 1].learning_index_data.learning_level_index.toFixed(2))
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChannelSelect = (event) => {
    setSelectedChannel(event.target.value);
  };

  const handleInstanceSelect = (event) => {
    setSelectedInstance(event.target.value);
    const scoreCounts = learningIndexData.learning_level_count;
    const percentages = learningIndexData.learning_level_percentages;

    setTotalCount(learningIndexData.control_group_size);

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

    setScores(scorePercentages);
    setLearningLevelIndex(learningIndexData.learning_level_index);
    getChartDetails();
  };

  const getChartDetails = () => {
    const lengthOfResponses = responseData.length;
    if (lengthOfResponses < 5) {
      const newIndexes = [];
      const newCounts = [];
      responseData.forEach((obj) => {
        newIndexes.push(obj.learning_index_data.learning_level_index);
        newCounts.push(obj.learning_index_data.control_group_size);
      });
      setIndexes(newIndexes);
      setCounts(newCounts);
    } else {
      const increment = Math.floor(lengthOfResponses / 5);
      const newIndexes = [0];
      const newCounts = [0];
      for (let i = increment - 1; i < lengthOfResponses; i += increment) {
        newIndexes.push(responseData[i].learning_index_data.learning_level_index.toFixed(2));
        newCounts.push(responseData[i].learning_index_data.control_group_size);
      }
      setIndexes(newIndexes);
      setCounts(newCounts);
    }
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
    <div className="flex justify-center items-center gap-2 sm:gap-6 mt-10 flex-wrap">
  <Typography variant="body1" align="center" gutterBottom >
    Total Responses: {totalCount}
  </Typography>
  <Typography variant="body1" align="center" gutterBottom >
    Learning Index: {learningLevelIndex}
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
            {totalCount !== 0 && <LineChart indexes={indexes} total={counts} stepSize={Math.floor(responseData.length / 5)} />}
          </Box>
        </>
      )}
    </>
  </Box>
  );
};

export default App;
