import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { SunLocationIcon } from "../icons/SunLocationIcon";

interface SunLocationCardProps {
  sunrise: number;
  sunset: number;
  time: number;
  color?: string;
}

const SunLocationCard: React.FC<SunLocationCardProps> = ({
  sunrise,
  sunset,
  time,
  color,
}) => {
  const rise_time = new Date(sunrise * 1000);
  const set_time = new Date(sunset * 1000);
  return (
    <Card
      sx={{
        width: 220,
        maxWidth: 250,
        maxHeight: 120,
        margin: "1rem auto",
        backgroundColor: color,
        borderRadius: 3,
        boxShadow: 5,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography fontSize="14px" color="#9C24FF">
            Güneş Konumu
          </Typography>
          <div style={{ width: "90px", height: "90px" }}>
            <SunLocationIcon sunrise={sunrise} sunset={sunset} time={time} />
          </div>
        </Box>

        <Box>
          <Typography fontSize="12px">Gün Doğumu</Typography>
          <Typography fontSize="14px" fontWeight="bold">
            {rise_time.toLocaleTimeString([], {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
          <Typography fontSize="12px">Gün Batımı</Typography>
          <Typography fontSize="14px" fontWeight="bold">
            {set_time.toLocaleTimeString([], {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SunLocationCard;
