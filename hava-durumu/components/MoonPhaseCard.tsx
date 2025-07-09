import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { MoonPhaseIcon } from "../icons/MoonPhaseIcon";

interface MoonPhaseCardProps {
  moon_phase_lunation: number;
  latitude: number;
  color?: string;
}

const MoonPhaseCard: React.FC<MoonPhaseCardProps> = ({
  moon_phase_lunation,
  latitude,
  color,
}) => {
  const phase_name = () => {
    if (moon_phase_lunation < 0.01) return "Yeni Ay";
    if (moon_phase_lunation > 0.99) return "Dolunay";

    const isWaxing = moon_phase_lunation < 0.5;

    if (isWaxing) {
      if (moon_phase_lunation < 0.25) return "Hilal";
      if (Math.abs(moon_phase_lunation - 0.25) < 0.02) return "İlk Dördün";
      return "Şişkin Ay";
    } else {
      if (moon_phase_lunation > 0.75) return "Hilal";
      if (Math.abs(moon_phase_lunation - 0.75) < 0.02) return "Son Dördün";
      return "Şişkin Ay";
    }
  };
  return (
    <Card
      sx={{
        maxWidth: 170,
        maxHeight: 100,
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
          justifyContent: "space-around",
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
              Ay Fazı
            </Typography>
            <Typography fontSize="18px" fontWeight="bold">
              {phase_name()}
            </Typography>
          </Box>

          <div style={{ width: "80px", height: "80px" }}>
            <MoonPhaseIcon
              moon_phase_lunation={moon_phase_lunation}
              latitude={latitude}
            />
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MoonPhaseCard;
