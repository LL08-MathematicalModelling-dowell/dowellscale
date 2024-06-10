import React, { useState, useEffect } from "react";
import {

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
import { useSearchParams } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);



const extractLabelsAndDatasetsInfo = (data = []) => {
  const labelsForCharts = [
    ...new Set(
      data
        .map(
          (item) =>
            item?.dowell_time?.current_time &&
            new Date(item?.dowell_time?.current_time).toDateString()
        )
    ),
  ];

  const datasetsForCharts = {
    promoterData: [],
    detractorData: [],
    passiveData: [],
  };

  labelsForCharts.forEach((item) => {
    const matchingData = data.filter(
      (dataItem) =>
        dataItem?.dowell_time?.current_time &&
        new Date(dataItem?.dowell_time?.current_time).toDateString() === item
    );

    datasetsForCharts.detractorData.push(
      matchingData.filter((data) => data?.category === "detractor").length
    );
    datasetsForCharts.passiveData.push(
      matchingData.filter((data) => data?.category === "passive").length
    );
    datasetsForCharts.promoterData.push(
      matchingData.filter((data) => data?.category === "promoter").length
    );
  });

  const totalItems =
    datasetsForCharts.promoterData.reduce((a, b) => a + b, 0) +
    datasetsForCharts.detractorData.reduce((a, b) => a + b, 0) +
    datasetsForCharts.passiveData.reduce((a, b) => a + b, 0);

    const maxDataValue = Math.max(
        ...datasetsForCharts.promoterData,
        ...datasetsForCharts.detractorData,
        ...datasetsForCharts.passiveData
      );
   
      let stepSize=1
      if(maxDataValue>5){
        stepSize=Math.ceil(maxDataValue/5)
      }
   
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
            beginAtZero: true,
            max: stepSize * 6,
            ticks: {
              stepSize: stepSize,
            },
          },
        },
      };
  return {
    labels: labelsForCharts,
    datasetsInfo: datasetsForCharts,
    totalItems,
    options
  };
};

const initialScoreData = {
  Detractor: { count: 0, percentage: 0 },
  Passive: { count: 0, percentage: 0 },
  Promoter: { count: 0, percentage: 0 },
};

const App = () => {

  const [scores, setScores] = useState(initialScoreData);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const[options,setOptions]=useState({})
  const [dateDataForChart, setDateDataForChart] = useState({
    labels: [],
    datasets: [],
  });

const[searchParams,setsearchParams]=useSearchParams({})
const scaleId=searchParams.get("scale_id")
const channelName=searchParams.get("channel_name")
const instanceName=searchParams.get("instance_name")
const[err,setErr]=useState(false)

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {

  const scoreCounts = { Detractor: 0, Passive: 0, Promoter: 0 };
  data.forEach((item) => {
    switch (item.category) {
      case "detractor":
        scoreCounts["Detractor"]++;
        break;
      case "passive":
        scoreCounts["Passive"]++;
        break;
      case "promoter":
        scoreCounts["Promoter"]++;
        break;
      default:
        break;
    }
  });

  // Calculate total count
  const totalCount = data.length;

  // Calculate percentage for each score
  const scorePercentages = {
      Detractor: {
      count: scoreCounts["Detractor"],
      percentage: (scoreCounts["Detractor"] / totalCount) * 100,
    },
    Passive: {
      count: scoreCounts["Passive"],
      percentage: (scoreCounts["Passive"] / totalCount) * 100,
    },
    Promoter: {
      count: scoreCounts["Promoter"],
      percentage: (scoreCounts["Promoter"] / totalCount) * 100,
    },
  };

  setScores(scorePercentages);
  setTotalCount(totalCount);
    const { labels, datasetsInfo, totalItems,options } = extractLabelsAndDatasetsInfo(data);
    setOptions(options)

    setDateDataForChart({
      labels: labels,
      datasets: [
        {
          label: "Detractor",
          data: datasetsInfo.detractorData,
          borderColor: "red",
          backgroundColor: "red",
        },
        {
          label: "Promoter",
          data: datasetsInfo.promoterData,
          borderColor: "green",
          backgroundColor: "green",
        },
        {
          label: "Passive",
          data: datasetsInfo.passiveData,
          borderColor: "yellow",
          backgroundColor: "yellow",
        },
      ],
    });
  }, [data]);

  

  const fetchData = async () => {
    
    try {
      const response = await axios.get(`https://100035.pythonanywhere.com/addons/get-response/?scale_id=${scaleId}&channel_name=${channelName}&instance_name=${instanceName}`);
      const data = response.data.data;
      if(data==undefined){
        setErr(true)
        return
      }
        

const filteredData=data.filter((res)=>res.instance_name==instanceName)
      setData(filteredData);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
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
      <Typography variant="h6" align="center" gutterBottom >
        Feedback Analysis Dashboard
      </Typography>
      {totalCount==0 && <p className="text-red-500 self-center w-full flex justify-center">Provide feedback to check report</p>}
      <div className="flex justify-center sm:gap-8 gap-4 text-[14px] sm:text-[18px] font-medium  my-5">
                      <p>
                        Total Responses: {totalCount}
                      </p>
                      <p>
                      Nps Score: {((scores.Promoter.percentage || 0) - (scores.Detractor.percentage || 0)).toFixed(2)}%
                      </p>
          </div>
          <Typography variant="body1" align="center" gutterBottom>
            Scores:
          </Typography>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            {Object.entries(scores).map(([score, data]) => (
              <Grid item xs={12} sm={4} key={score}>
                <Box textAlign="center">
                  <Typography variant="subtitle1" gutterBottom>
                    {`${score}: ${data.count} (${data.percentage.toFixed(
                      2
                    )}%)`}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={data.percentage || 0}
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
            ))}
          </Grid>
          
              <Box
                sx={{
                  mt: 4,
                  width: "100%",
                  height: { xs: "300px", sm: "400px" },
                  maxWidth: "900px",
                  mx: "auto",
                }}
              >
                <Line options={options} data={dateDataForChart} />
              </Box>
           
      
    </Box>
  );
};

export default App;
