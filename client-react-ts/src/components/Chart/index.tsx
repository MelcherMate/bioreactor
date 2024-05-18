import { isEmpty, isUndefined } from "lodash";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./Chart.css";

interface ChartProps {
  name: string;
  label: string;
  url: string;
}

const Chart: React.FC<ChartProps> = (props) => {
  const [data, setData] = useState<any[]>([]);
  const [formattedData, setFormattedData] = useState<any[]>([]);

  // Function to get sensor value from database
  useEffect(() => {
    if (!isUndefined(props.url) && !isUndefined(props.name)) {
      fetch(`${import.meta.env.VITE_SERVER_BASE_URL + props.url}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response Error");
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
          //console.log("Data pull success:", data);
        })
        .catch((error) => console.error("Fetch error:", error));
    }
  }, [props.url, props.name]);

  // Function to format sensor data for the chart
  useEffect(() => {
    if (!isEmpty(data)) {
      // Filter data by props.name
      const filteredData = data.filter((item: any) => item.name === props.name);

      // Select the last 6 data points
      const lastSixData = filteredData.slice(-6);

      // Prepare data for the chart (selecting only 'name' and 'pv' fields)
      const chartData = lastSixData.map((item) => ({
        time: reduceTimestampLength(item.createdAt), // X-axis
        value: item.value, // Y-axis
      }));
      // console.log(chartData);
      setFormattedData(chartData);
    }
  }, [data, props.name]);

  // Function to reduce timestamp length to "HH:mm" format
  const reduceTimestampLength = (timestamp: string) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  return (
    <div>
      <h3 id="title">{props.label}</h3>
      <LineChart
        width={200}
        height={200}
        data={formattedData}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};

export default Chart;