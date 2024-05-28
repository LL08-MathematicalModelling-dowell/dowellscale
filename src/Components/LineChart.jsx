import { Line } from "react-chartjs-2";


export default function LineChart({ indexes, total }) {

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          stepSize: 1,
          min: 0,
          max: 5
        },
        beginAtZero: true
      },
      x: {
        type: 'linear',
        position: 'bottom',
        ticks: {
          stepSize: 10,
          min: 0,
          max: 50
        }
      }
    }
  };

  const data = {
    labels: total,
    datasets: [
      {
        label: "Learning Index",
        data: indexes,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        pointBackgroundColor: "blue",
        pointBorderColor: "blue",
        pointHoverBackgroundColor: "red",
        pointHoverBorderColor: "red",
      }
    ]
  };

  return (
    <div style={{ width: "100%", height: "100%" }} className="my-10">
      <p style={{ textAlign: "center", fontSize: "24px", color: "orange", marginTop: "16px", fontWeight: "bold" }}>
        Graphical View
      </p>
      <div style={{ position: "relative", height: "100%" }}>
        <Line options={options} data={data} />
      </div>
    </div>
  );
}
