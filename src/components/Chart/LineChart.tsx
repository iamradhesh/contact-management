import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
} from "chart.js";
import { Box, Card, Typography } from "@mui/material";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title);

const LineChart: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
      );
      const result = await response.json();
      const dates = Object.keys(result.cases);
      const cases = Object.values(result.cases);
      setData({
        labels: dates,
        datasets: [
          {
            label: "COVID-19 Cases",
            data: cases,
            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(75,192,192,0.2)",
          },
        ],
      });
    };
    fetchData();
  }, []);

  return (
    <Box alignContent={"center"} sx={{height:100, width:"100%", margin:"20px auto"}} >
      <Card variant="outlined" sx={{ width:"50%", height:"auto", margin:"20px auto"}}>
        <Typography variant="h3" fontFamily="'Montserrat', sans-serif" sx={{textAlign:"center"}} color="text.secondary">
          COVID-19 Cases Over Time
        </Typography>
        {data ? <Line data={data} /> : <p>Loading...</p>}
      </Card>
    </Box>
  );
};

export default LineChart;
