import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { BarometerIcon } from "../icons/BarometerIcon";

interface PressureCardProps {
  pressure: number;
  color: string;
}

const PressureCard: React.FC<PressureCardProps> = ({ pressure, color }) => {
  return (
    <Card
      sx={{
        width: 130,
        height: 100,
        margin: "1rem auto",
        backgroundColor: color,
        borderRadius: 3,
        boxShadow: 5,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          flexGrow: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 0.5,
          }}
        >
          <Box display={"flex"} flexDirection="column" alignItems="center">
            <Typography fontSize="14px" color="#9C24FF">
              Basınç
            </Typography>
            <Typography fontSize="22px" fontWeight="bold">
              {pressure}
            </Typography>
            <Typography fontSize="14px">hPa</Typography>
          </Box>
          <div style={{ width: "60px", height: "60px" }}>
            <BarometerIcon pressure={pressure} />
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PressureCard;
