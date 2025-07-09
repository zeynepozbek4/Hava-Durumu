import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { MoonLocationIcon } from "../icons/MoonLocationIcon";

interface MoonLocationCardProps {
  moonrise: number;
  moonset: number;
  time: number;
  color?: string;
}

const MoonLocationCard: React.FC<MoonLocationCardProps> = ({
  moonrise,
  moonset,
  time,
  color,
}) => {
  const rise_time = new Date(moonrise * 1000);
  const set_time = new Date(moonset * 1000);
  return (
    <Card
      sx={{
        width: 200,
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
            Ay Konumu
          </Typography>
          <div style={{ width: "90px", height: "90px" }}>
            <MoonLocationIcon
              moonrise={moonrise}
              moonset={moonset}
              time={time}
            />
          </div>
        </Box>
        <Box>
          <Typography fontSize="12px">Ay Doğumu</Typography>
          <Typography fontSize="14px" fontWeight="bold">
            {rise_time.toLocaleTimeString([], {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
          <Typography fontSize="12px">Ay Batımı</Typography>
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

export default MoonLocationCard;
