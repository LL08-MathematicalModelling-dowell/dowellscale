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
  scales: {
    y: {
      min: 0, // Ensure Y-axis starts from 0
    },
  },
};

const generateDateRange = (startDate, endDate) => {
  const dateArray = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dateArray.push(new Date(currentDate).toDateString());
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
};

const extractLabelsAndDatasetsInfo = (data = [], dateRange) => {
  const datasetsForCharts = {
    yesData: new Array(dateRange.length).fill(0),
    noData: new Array(dateRange.length).fill(0),
    maybeData: new Array(dateRange.length).fill(0),
  };

  dateRange.forEach((date, index) => {
    const matchingData = data.filter(
      (dataItem) =>
        new Date(dataItem?.dowell_time?.current_time).toDateString() === date
    );

    datasetsForCharts.noData[index] = matchingData.filter(
      (data) => data?.score === 0
    ).length;
    datasetsForCharts.maybeData[index] = matchingData.filter(
      (data) => data?.score === 1
    ).length;
    datasetsForCharts.yesData[index] = matchingData.filter(
      (data) => data?.score === 2
    ).length;
  });

  return datasetsForCharts;
};

const App = () => {
  const [channels, setChannels] = useState([]);
  const [instances, setInstances] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(""); // Start with an empty value to show message
  const [selectedInstance, setSelectedInstance] = useState("");
  const [selectedTimePeriod, setSelectedTimePeriod] = useState(7); // Default to 7 days
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dateDataForChart, setDateDataForChart] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!data || data.length === 0 || selectedChannel === "") return;

    // If "All Channels" is selected, render separate charts for each instance
    const filteredData =
      selectedChannel === allChannelsNameTag
        ? data
        : data.filter(
            (item) =>
              item.channel_name === selectedChannel &&
              (selectedInstance === "" || item.instance_name === selectedInstance)
          );

    const now = new Date();
    const pastDate = new Date();
    pastDate.setDate(now.getDate() - selectedTimePeriod);

    const dateRange = generateDateRange(pastDate, now);
    const datasetsInfo = extractLabelsAndDatasetsInfo(filteredData, dateRange);

    setDateDataForChart({
      labels: dateRange,
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
    });
  }, [selectedChannel, selectedInstance, selectedTimePeriod, data]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://www.scales.uxlivinglab.online/api/v1/get-response/?scale_id=6634a67d2c8831894e461782"
      );
      const fetchedData = response.data.data;

      const uniqueChannels = Array.from(
        new Set(fetchedData.map((item) => item.channel_name))
      );
      const uniqueInstances = Array.from(
        new Set(fetchedData.map((item) => item.instance_name))
      );

      setChannels([allChannelsNameTag, ...uniqueChannels]);
      setInstances(uniqueInstances);
      setData(fetchedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
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
              Select channel
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
            disabled={selectedChannel === allChannelsNameTag} // Disable if All Channels is selected
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

      {/* Centered message when no channel is selected */}
      {!selectedChannel && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ height: "300px" }}
        >
          <Typography variant="h6" align="center">
            Please make a selection to generate the report
          </Typography>
        </Box>
      )}

      {/* Only show the charts if a channel has been selected */}
      {selectedChannel && (
        <Box mt={5} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          {selectedChannel === allChannelsNameTag
            ? instances.map((instance) => {
                // Filter data specific to each instance
                const instanceData = data.filter(
                  (item) => item.instance_name === instance
                );
                const now = new Date();
                const pastDate = new Date();
                pastDate.setDate(now.getDate() - selectedTimePeriod);
                const dateRange = generateDateRange(pastDate, now);
                const datasetsInfo = extractLabelsAndDatasetsInfo(instanceData, dateRange);

                return (
                  <Box key={instance} style={{ width: "1200px", height: "500px", marginBottom: "40px" }}>
                    <Typography variant="h6" align="center" gutterBottom>
                      {instanceNames[instance]}
                    </Typography>
                    <Line
                      options={options}
                      data={{
                        labels: dateRange,
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
                      }}
                    />
                  </Box>
                );
              })
            : selectedInstance && (
                <Box style={{ width: "1200px", height: "500px", marginBottom: "40px" }}>
                  <Typography variant="h6" align="center" gutterBottom>
                    {instanceNames[selectedInstance]}
                  </Typography>
                  <Line options={options} data={dateDataForChart} />
                </Box>
              )}
        </Box>
      )}
    </Box>
  );
};

export default App;
