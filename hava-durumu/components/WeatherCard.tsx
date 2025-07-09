import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Box from "@mui/material/Box";

interface WeatherCardProps {
  day: number;
  month: string;
  year: number;
  dayOfWeek: string;
  city: string;
  country: string;
  iconUrl: string;
  description: string;
  temperature: number;
  felt_temp: number;
  max_temp: number;
  min_temp: number;
  color: string;
  onWeatherCardClick: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  day,
  month,
  year,
  dayOfWeek,
  city,
  country,
  iconUrl,
  description,
  temperature,
  felt_temp,
  max_temp,
  min_temp,
  color,
  onWeatherCardClick,
}) => {
  return (
    <Card
      sx={{
        maxWidth: 250,
        margin: "1rem auto",
        backgroundColor: color,
        borderRadius: 3,
        boxShadow: 5,
      }}
      onClick={onWeatherCardClick}
    >
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {day} {month} {year}, {dayOfWeek}
        </Typography>
        <Typography variant="h5" fontWeight="bold" color="#9C24FF">
          {city}, {country}
        </Typography>
        <Typography variant="h4" color="#F582F1" fontWeight="bold">
          {Math.round(temperature)}°C
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={iconUrl}
            alt={description}
            style={{ width: 50, height: 50 }}
          />
          <Typography variant="h6">{description}</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Hissedilen Sıcaklık: {Math.round(felt_temp)} ℃
        </Typography>
        <Typography variant="body2" color="text.secondary">
          En Yüksek: {Math.round(max_temp)} ℃
        </Typography>
        <Typography variant="body2" color="text.secondary">
          En Düşük: {Math.round(min_temp)} ℃
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
