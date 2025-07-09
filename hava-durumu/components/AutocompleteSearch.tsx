// AutocompleteSearch.tsx
import { InputAdornment, styled } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import * as React from "react";
import allCities, { type CityOptionType } from "../allCities.ts";
import SearchIcon from "@mui/icons-material/Search";

const filter = createFilterOptions<CityOptionType>();

interface AutocompleteSearchProps {
  onAddCity: (city: string) => void;
}

const SearchIconWrapper = styled("div")(() => ({
  height: "100%",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#9C24FF",
}));

export default function AutocompleteSearch({
  onAddCity,
}: AutocompleteSearchProps) {
  const [value, setValue] = React.useState<CityOptionType | null>(null);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setValue({ label: newValue });
          onAddCity(newValue);
        } else if (newValue && "label" in newValue) {
          setValue(newValue);
          onAddCity(newValue.label);
        }
        setValue(null);
      }}
      filterOptions={(options, params) => filter(options, params)}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={allCities}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.label
      }
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            {option.label}
          </li>
        );
      }}
      sx={{ width: 200, borderRadius: 3, boxShadow: 3 }}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Şehir ara..."
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderRadius: 3 },
            },
          }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
