import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { WaterDropIcon } from "../icons/WaterDropIcon";

interface HumidityCardProps {
  humidity: number;
  color: string;
}

const HumidityCard: React.FC<HumidityCardProps> = ({ humidity, color }) => {
  return (
    <Card
      sx={{
        width: 130,
        height: 90,
        margin: "1rem auto",
        backgroundColor: color,
        borderRadius: 3,
        boxShadow: 5,
      }}
    >
      <CardContent sx={{ display: "flex", alignItems: "center", flexGrow: 10 }}>
        <Box
          className="fifth-step"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 0.5,
          }}
        >
          <Box display={"flex"} flexDirection="column" alignItems="center">
            <Typography fontSize="14px" color="#9C24FF">
              Nem
            </Typography>
            <Typography fontSize="22px" fontWeight="bold">
              %{humidity}
            </Typography>
          </Box>
          <div style={{ width: "50px", height: "50px" }}>
            <WaterDropIcon percentage={humidity} />
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HumidityCard;
