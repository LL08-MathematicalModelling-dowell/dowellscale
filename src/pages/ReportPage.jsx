import { useState, useEffect } from "react";
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

const instanceNames = {
  instance_1: "Aspirational",
  instance_2: "LifeCycle",
  instance_3: "Unique",
  instance_4: "Evergreen",
  instance_5: "Valuable",
};

const channelNames = {
  channel_1: "Social media post",
};

const App = () => {
  const [channels, setChannels] = useState([]);
  const [instances, setInstances] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState("");
  const [selectedInstance, setSelectedInstance] = useState("");
  const [scores, setScores] = useState({
    No: { count: 0, percentage: 0 },
    Maybe: { count: 0, percentage: 0 },
    Yes: { count: 0, percentage: 0 },
  });
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://100035.pythonanywhere.com/addons/get-response/?scale_id=6634a67d2c8831894e461782"
      );
      const data = response.data.data;

      const uniqueChannels = Array.from(
        new Set(data.map((item) => item.channel_name))
      );
      const uniqueInstances = Array.from(
        new Set(data.map((item) => item.instance_name))
      );

      setChannels(uniqueChannels);
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
  };

  const handleInstanceSelect = (event) => {
    setSelectedInstance(event.target.value);

    // Filter data based on the selected instance and channel
    const filteredData = data.filter(
      (item) =>
        item.instance_name === event.target.value &&
        item.channel_name === selectedChannel
    );

    // Count occurrences of each score
    const scoreCounts = { No: 0, Maybe: 0, Yes: 0 };
    filteredData.forEach((item) => {
      switch (item.score) {
        case 0:
          scoreCounts["No"]++;
          break;
        case 1:
          scoreCounts["Maybe"]++;
          break;
        case 2:
          scoreCounts["Yes"]++;
          break;
        default:
          break;
      }
    });

    // Calculate total count
    const totalCount = filteredData.length;

    // Calculate percentage for each score
    const scorePercentages = {
      No: {
        count: scoreCounts["No"],
        percentage: (scoreCounts["No"] / totalCount) * 100,
      },
      Maybe: {
        count: scoreCounts["Maybe"],
        percentage: (scoreCounts["Maybe"] / totalCount) * 100,
      },
      Yes: {
        count: scoreCounts["Yes"],
        percentage: (scoreCounts["Yes"] / totalCount) * 100,
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
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        {Object.entries(scores).map(([score, data]) => (
          <Grid item xs={12} sm={4} key={score}>
            <Box textAlign="center">
              <Typography variant="subtitle1" gutterBottom>
                {`${score}: ${data.count} (${data.percentage.toFixed(2)}%)`}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={data.percentage}
                sx={{
                  height: "20px",
                  borderRadius: "10px",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: "10px",
                    backgroundColor:
                      score === "No"
                        ? "red"
                        : score === "Maybe"
                        ? "yellow"
                        : "green",
                  },
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default App;
