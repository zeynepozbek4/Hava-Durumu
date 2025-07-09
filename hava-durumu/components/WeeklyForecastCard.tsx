import React from "react";
import { Card, CardContent, Typography, Divider } from "@mui/material";
import Box from "@mui/material/Box";

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  const monthNames = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];
  return `${parseInt(day)} ${monthNames[parseInt(month) - 1]}`;
}

interface DayForecast {
  date: string;
  weather: string;
  maxTemp: number;
  minTemp: number;
}

interface WeeklyCardProps {
  forecastDays: DayForecast[];
  onDayClick: (date: string) => void;
}

const WeeklyCard: React.FC<WeeklyCardProps> = ({
  forecastDays,
  onDayClick,
}: WeeklyCardProps) => {
  return (
    <Card
      className="sub-second-step"
      sx={{
        maxWidth: 500,
        margin: "1rem auto",
        backgroundColor: "#EAFDFF",
        boxShadow: 5,
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Typography variant="h5" fontWeight="bold" color="#9C24FF">
          Haftalık Hava Durumu Tahmini
        </Typography>
        <Divider sx={{ margin: "1rem 0" }} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1px 1fr 1px 1fr",
            alignItems: "center",
            gap: 2,
            color: "#F582F1",
          }}
        >
          <Typography fontSize="15px" fontWeight="bold">
            Tarih
          </Typography>
          <Box sx={{ height: "100%", backgroundColor: "#F582F1" }} />
          <Typography fontSize="15px" fontWeight="bold">
            Hava Tahmini
          </Typography>
          <Box sx={{ height: "100%", backgroundColor: "#F582F1" }} />
          <Typography fontSize="15px" fontWeight="bold">
            Min / Maks
          </Typography>
        </Box>
        <Divider sx={{ margin: "1rem 0" }} />

        {forecastDays.map((day, index) => (
          <React.Fragment key={index}>
            <Box
              onClick={() => onDayClick(day.date)}
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1px 1fr 1px 1fr",
                alignItems: "center",
                gap: 2,
                marginBottom: "1rem",
              }}
            >
              <Typography fontSize="18px">{formatDate(day.date)}</Typography>
              <Box sx={{ height: "100%", backgroundColor: "#F582F1" }} />
              <Typography fontSize="18px">{day.weather}</Typography>
              <Box sx={{ height: "100%", backgroundColor: "#F582F1" }} />
              <Typography fontSize="18px">
                {Math.round(day.maxTemp)}°C / {Math.round(day.minTemp)}°C
              </Typography>
            </Box>
            {index < forecastDays.length - 1 && (
              <Divider sx={{ margin: "1rem 0" }} />
            )}
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
};

export default WeeklyCard;
