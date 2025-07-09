import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AutocompleteSearch from "./AutocompleteSearch";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha("#FFFFF", 0.15),
  "&:hover": {
    backgroundColor: alpha("#FFFFF", 0.25),
  },
  color: "#9C24FF",
  marginLeft: 0,
  width: "100%",

  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

interface SearchAppBarProps {
  onSearch: (city: string) => void;
}

const SearchAppBar: React.FC<SearchAppBarProps> = ({ onSearch }) => {
  const [input, setInput] = React.useState("");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(input);
      setInput(""); // clear input
    }
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
          backgroundColor: "#f7e4f6",
          background:
            "linear-gradient(90deg, rgba(247, 228, 246, 1) 0%, rgba(239, 194, 255, 1) 33%, rgba(151, 238, 247, 1) 66%, rgba(208, 247, 247, 1) 100%)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              alignItems: "left",
              color: "#9C24FF",
              fontWeight: "bold",
            }}
          >
            🌤 Hava Durumu
          </Typography>
          <Search>
            <Box
              sx={{ display: "flex", alignItems: "center" }}
              className="third-step"
            >
              <AutocompleteSearch onAddCity={onSearch} />
            </Box>
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SearchAppBar;
