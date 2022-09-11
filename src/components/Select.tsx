import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { Pokedex } from "../app/features/Pokedex/pokeSlice";
import { alpha, styled } from "@mui/material/styles";
import { useAppSelector } from "../app/hooks";

interface SearchProps {
  setFilteredPokedex: React.Dispatch<React.SetStateAction<Pokedex[]>>;
}

function SelectType({ setFilteredPokedex }: SearchProps) {
  const [pickedOption, setOption] = useState("");
  const Pokedex = useAppSelector((state) => state.pokedex.pokedex);
  const dynamicOptions = new Set();

  Pokedex.forEach((poke) => {
    dynamicOptions.add(poke.types[0].type);
  });

  function handleChange(event: SelectChangeEvent) {
    setFilteredPokedex(Pokedex);
    setOption(event.target.value);
    setFilteredPokedex((state) => {
      return state.filter(
        (poke) =>
          poke.types[0].type === event.target.value ||
          poke.types[1]?.type === event.target.value
      );
    });
  }

  return (
    <Stack sx={{ width: "100%" }}>
      <InputLabel id="type-label">Select Pokemon Type</InputLabel>
      <Select
        sx={{ width: "100%" }}
        onChange={handleChange}
        value={pickedOption}
        labelId="type-label"
        id="demo-simple-select"
        label="Age"
      >
        {Array.from(dynamicOptions).map((type: any, idx) => (
          <MenuItem key={idx} value={`${type}`}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
}

export default SelectType;
