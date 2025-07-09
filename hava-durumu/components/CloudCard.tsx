import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { CloudIcon } from "../icons/CloudIcon";

interface CloudCardProps {
  cloudiness: number;
  color: string;
}

const CloudCard: React.FC<CloudCardProps> = ({ cloudiness, color }) => {
  return (
    <Card
      sx={{
        width: 160,
        height: 100,
        margin: "1rem auto",
        backgroundColor: color,
        borderRadius: 3,
        boxShadow: 5,
      }}
    >
      <CardContent sx={{ position: "relative", paddingBottom: "3rem" }}>
        <Typography fontSize="14px" color="#9C24FF">
          Bulutluluk
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            marginTop: "0.3rem",
            position: "relative",
          }}
        >
          <Typography
            fontSize="22px"
            fontWeight="bold"
            sx={{ position: "absolute", left: 5, top: 0 }}
          >
            %{cloudiness}
          </Typography>
          <Box
            sx={{
              width: 80,
              height: 80,
              position: "absolute",
              left: 60, // adjust this to align
              top: -26, // adjust this to pull it up
            }}
          >
            <CloudIcon percentage={cloudiness} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CloudCard;
