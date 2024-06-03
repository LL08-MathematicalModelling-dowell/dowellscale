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
};


const allChannelsNameTag = "channel_all_x";

const channelNames = {
  [`${allChannelsNameTag}`]: "All Channels",
  channel_1: "Class Asessment",
};



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
  const [channels, setChannels] = useState([]);
  const [instances, setInstances] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState("");
  const [selectedInstance, setSelectedInstance] = useState("");
  const [scores, setScores] = useState(initialScoreData);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const[options,setOptions]=useState({})
  const [dateDataForChart, setDateDataForChart] = useState({
    labels: [],
    datasets: [],
  });
  const [displayDataForAllSelection, setDisplayDataForAllSelection] = useState(
    []
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedChannel.length < 1 || selectedInstance.length < 1) return;

    const { labels, datasetsInfo, totalItems,options } = extractLabelsAndDatasetsInfo(
      data.filter(
        (item) =>
          item.channel_name === selectedChannel &&
          item.instance_name.trim() === selectedInstance
      )
    );
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
  }, [selectedChannel, selectedInstance, data]);

  useEffect(() => {
    if (selectedChannel !== allChannelsNameTag)
      return setDisplayDataForAllSelection([]);

    const allData = instances.map((instance) => {
      const dataForInstance = data.filter(
        (item) => item.instance_name.trim() === instance
      );
      const scoreCounts = {
        Detractor: {
          count: 0,
          percentage: 0,
        },
        Passive: {
          count: 0,
          percentage: 0,
        },
        Promoter: {
          count: 0,
          percentage: 0,
        },
      };

      const { labels, datasetsInfo, totalItems,options } = extractLabelsAndDatasetsInfo(
        dataForInstance
      );
setOptions(options)
      scoreCounts.Detractor.count = datasetsInfo.detractorData.length;
      scoreCounts.Detractor.percentage =
        (datasetsInfo.detractorData.reduce((a, b) => a + b, 0) / totalItems) * 100;

      scoreCounts.Passive.count = datasetsInfo.passiveData.length;
      scoreCounts.Passive.percentage =
        (datasetsInfo.passiveData.reduce((a, b) => a + b, 0) / totalItems) * 100;

      scoreCounts.Promoter.count = datasetsInfo.promoterData.length;
      scoreCounts.Promoter.percentage =
        (datasetsInfo.promoterData.reduce((a, b) => a + b, 0) / totalItems) * 100;

      return {
        instanceName: instance,
        totalResponses: dataForInstance.length,
        scoreCounts,
        chartData: {
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
        },
      };
    });

    setDisplayDataForAllSelection(allData);
  }, [selectedChannel, data, instances]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://100035.pythonanywhere.com/addons/get-response/?scale_id=665d95ae7ee426d671222a7b"
      );
      const data = response.data.data;
      const uniqueChannels = Array.from(
        new Set(data.map((item) => item.channel_name))
      );
      const uniqueInstances = Array.from(
        new Set(data.map((item) => item.instance_name.trim()))
      );

      setChannels([allChannelsNameTag, ...uniqueChannels]);
      setInstances(uniqueInstances);
      setData(data);
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

    // Filter data based on the selected instance and channel
    const filteredData = data.filter(
      (item) =>
        item.instance_name.trim() === event.target.value &&
        item.channel_name === selectedChannel
    );
 
    // Count occurrences of each score
    const scoreCounts = { Detractor: 0, Passive: 0, Promoter: 0 };
    filteredData.forEach((item) => {
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
    const totalCount = filteredData.length;

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
            disabled={selectedChannel === allChannelsNameTag}
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
                <Line options={options} data={dateDataForChart} />
              </Box>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default App;
