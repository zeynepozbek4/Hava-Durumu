import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

function formatHour(hour: number) {
  return hour.toString().padStart(2, "0") + ".00";
}

interface TemperatureLineChartProps {
  series: {
    data: number[];
    color: string;
    valueFormatter: (value: number) => string;
  }[];
}

const TemperatureLineChart: React.FC<TemperatureLineChartProps> = ({
  series,
}) => {
  return (
    <Card
      className="subsub-second-step"
      sx={{
        maxWidth: 600,
        margin: "1rem auto",
        backgroundColor: "#EAFDFF",
        borderRadius: 3,
        boxShadow: 5,
      }}
    >
      <CardContent
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        <Typography variant="h5" color="#9C24FF" fontWeight="bold">
          Saatlik Sıcaklık Değişimi
        </Typography>
        <LineChart
          title="Saatlik Sıcaklık"
          xAxis={[
            {
              data: [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                18, 19, 20, 21, 22, 23,
              ],
              valueFormatter: formatHour,
            },
          ]}
          series={series}
          height={300}
          width={600}
        />
      </CardContent>
    </Card>
  );
};

export default TemperatureLineChart;
