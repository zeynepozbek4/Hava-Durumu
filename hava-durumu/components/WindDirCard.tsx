import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { WindDirIcon } from "../icons/WindDirIcon";

interface WindDirCardProps {
  wind_dir: number;
  wind_speed: number;
  color: string;
}

const WindDirCard: React.FC<WindDirCardProps> = ({
  wind_dir,
  wind_speed,
  color,
}) => {
  const direction = () => {
    if (wind_dir >= 0 && wind_dir < 22.5) return "Kuzey";
    if (wind_dir >= 22.5 && wind_dir < 67.5) return "Kuzeydoğu";
    if (wind_dir >= 67.5 && wind_dir < 112.5) return "Doğu";
    if (wind_dir >= 112.5 && wind_dir < 157.5) return "Güneydoğu";
    if (wind_dir >= 157.5 && wind_dir < 202.5) return "Güney";
    if (wind_dir >= 202.5 && wind_dir < 247.5) return "Güneybatı";
    if (wind_dir >= 247.5 && wind_dir < 292.5) return "Batı";
    if (wind_dir >= 292.5 && wind_dir < 337.5) return "Kuzeybatı";
    if (wind_dir >= 337.5 && wind_dir <= 360) return "Kuzey";
  };

  const wind_intensity = () => {
    if (wind_speed < 0.2) return "Sakin";
    else if (wind_speed < 1.5) return "Esinti";
    else if (wind_speed < 3.3) return "Hafif Rüzgar";
    else if (wind_speed < 5.4) return "Tatlı Rüzgar";
    else if (wind_speed < 7.9) return "Orta Rüzgar";
    else if (wind_speed < 10.7) return "Sert Rüzgar";
    else if (wind_speed < 13.8) return "Fırtınamsı Rüzgar";
    else return "Fırtına";
  };
  return (
    <Card
      sx={{
        maxWidth: 250,
        maxHeight: 150,
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
          justifyContent: "space-between",
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
              Rüzgar
            </Typography>
            <Typography fontSize="22px" fontWeight="bold">
              {direction()}, {wind_speed}
            </Typography>
            <Typography fontSize="14px">m/s</Typography>
            <Typography fontSize="14px">{wind_intensity()}</Typography>
          </Box>

          <div style={{ width: "90px", height: "90px" }}>
            <WindDirIcon wind_dir={wind_dir} />
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WindDirCard;
