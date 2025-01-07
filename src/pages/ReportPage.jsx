import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  CircularProgress,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const timePeriods = [
  { label: "Last 7 Days", value: 7 },
  { label: "Last 30 Days", value: 30 },
  { label: "Last 90 Days", value: 90 },
];

const instanceNames = {
  instance_1: "Aspirational",
  instance_2: "LifeCycle",
  instance_3: "Unique",
  instance_4: "Evergreen",
  instance_5: "Valuable",
};

const allChannelsNameTag = "channel_all_x";

const channelNames = {
  [`${allChannelsNameTag}`]: "All Channels",
  channel_1: "Social media post",
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Responses Insights by Time",
    },
  },
};

const extractLabelsAndDatasetsInfo = (data = []) => {
  const labelsForCharts = [
    ...new Set(
      data.map(
        (item) =>
          item?.dowell_time?.current_time &&
          new Date(item?.dowell_time?.current_time).toDateString()
      )
    ),
  ];

  const datasetsForCharts = {
    yesData: [],
    noData: [],
    maybeData: [],
  };

  labelsForCharts.forEach((item) => {
    const matchingData = data.filter(
      (dataItem) =>
        dataItem?.dowell_time?.current_time &&
        new Date(dataItem?.dowell_time?.current_time).toDateString() === item
    );

    datasetsForCharts.noData.push(
      matchingData.filter((data) => data?.score === 0).length
    );
    datasetsForCharts.maybeData.push(
      matchingData.filter((data) => data?.score === 1).length
    );
    datasetsForCharts.yesData.push(
      matchingData.filter((data) => data?.score === 2).length
    );
  });

  return {
    labels: labelsForCharts,
    datasetsInfo: datasetsForCharts,
  };
};

const App = () => {
  const [channels, setChannels] = useState([]);
  const [instances, setInstances] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState("");
  const [selectedInstance, setSelectedInstance] = useState("");
  const [selectedTimePeriod, setSelectedTimePeriod] = useState(7); // Default to 7 days
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dateDataForChart, setDateDataForChart] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedChannel === allChannelsNameTag) {
      // When "All channels" is selected, generate charts for all instances.
      const allInstanceCharts = instances.map((instance) => {
        const filteredData = filterDataByTimePeriod(
          data.filter(
            (item) => item.instance_name === instance
          )
        );

        const { labels, datasetsInfo } = extractLabelsAndDatasetsInfo(filteredData);

        return {
          instanceName: instance,
          chartData: {
            labels: labels,
            datasets: [
              {
                label: "No",
                data: datasetsInfo.noData,
                borderColor: "red",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
                fill: true,
              },
              {
                label: "Yes",
                data: datasetsInfo.yesData,
                borderColor: "green",
                backgroundColor: "rgba(0, 255, 0, 0.2)",
                fill: true,
              },
              {
                label: "Maybe",
                data: datasetsInfo.maybeData,
                borderColor: "yellow",
                backgroundColor: "rgba(255, 255, 0, 0.2)",
                fill: true,
              },
            ],
          },
        };
      });

      setDateDataForChart(allInstanceCharts);
    } else {
      // When a specific channel is selected, use the current logic to generate a single chart.
      const filteredData = filterDataByTimePeriod(
        data.filter(
          (item) =>
            item.channel_name === selectedChannel &&
            item.instance_name === selectedInstance
        )
      );

      const { labels, datasetsInfo } = extractLabelsAndDatasetsInfo(filteredData);

      setDateDataForChart([
        {
          instanceName: selectedInstance,
          chartData: {
            labels: labels,
            datasets: [
              {
                label: "No",
                data: datasetsInfo.noData,
                borderColor: "red",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
                fill: true,
              },
              {
                label: "Yes",
                data: datasetsInfo.yesData,
                borderColor: "green",
                backgroundColor: "rgba(0, 255, 0, 0.2)",
                fill: true,
              },
              {
                label: "Maybe",
                data: datasetsInfo.maybeData,
                borderColor: "yellow",
                backgroundColor: "rgba(255, 255, 0, 0.2)",
                fill: true,
              },
            ],
          },
        },
      ]);
    }
  }, [selectedChannel, selectedInstance, selectedTimePeriod, data]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://www.scales.uxlivinglab.online/api/v1/get-response/?scale_id=6634a67d2c8831894e461782"
      );
      const data = response.data.data;

      const uniqueChannels = Array.from(
        new Set(data.map((item) => item.channel_name))
      );
      const uniqueInstances = Array.from(
        new Set(data.map((item) => item.instance_name))
      );

      setChannels([allChannelsNameTag, ...uniqueChannels]);
      setInstances(uniqueInstances);
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const filterDataByTimePeriod = (data) => {
    const now = new Date();
    const pastDate = new Date();
    pastDate.setDate(now.getDate() - selectedTimePeriod);

    return data.filter((item) => {
      const itemDate = new Date(item?.dowell_time?.current_time);
      return itemDate >= pastDate && itemDate <= now;
    });
  };

  const handleTimePeriodChange = (event) => {
    setSelectedTimePeriod(event.target.value);
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
        <Grid item xs={12} md={4}>
          <Select
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
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
            onChange={(e) => setSelectedInstance(e.target.value)}
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
        <Grid item xs={12} md={4}>
          <Select
            value={selectedTimePeriod}
            onChange={handleTimePeriodChange}
            displayEmpty
            fullWidth
          >
            {timePeriods.map((period) => (
              <MenuItem key={period.value} value={period.value}>
                {period.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>

      {/* Render charts for each instance */}
      <Box mt={5} display="flex" flexDirection="column" alignItems="center">
        {dateDataForChart.map((chart, index) => (
          <Box key={index} mt={5} display="flex" justifyContent="center" width="100%">
            <Box style={{ width: "80%", maxWidth: "1200px", height: "500px" }}>
              <Typography variant="h6" align="center">
                Instance: {instanceNames[chart.instanceName]}
              </Typography>
              <Line options={options} data={chart.chartData} />
            </Box>
          </Box>
        ))}
      </Box>

    </Box>
  );
};

export default App;
