import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Chip,
  Grid,
  Container,
  CircularProgress,
  TextField,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { useAppSelector } from "../app/hooks";
import { Pokedex } from "../app/features/Pokedex/pokeSlice";
import SelectType from "./Select";
interface SearchProps {
  setFilteredPokedex: React.Dispatch<React.SetStateAction<Pokedex[]>>;
}
function Searchbar({ setFilteredPokedex }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const Pokedex = useAppSelector((state) => state.pokedex.pokedex);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    if (value) {
      setSearchTerm(value);
      setFilteredPokedex((state) => {
        const regex = new RegExp(`${searchTerm}`, "gi");
        return state.filter((poke) => poke.name.match(regex));
      });
    } else {
      setSearchTerm("");
      setFilteredPokedex(Pokedex);
    }
  };

  return (
    <Container sx={{ mb: 3 }} maxWidth="lg">
      <Stack
        sx={{
          flexDirection: { md: "row" },
          alignItems: "center",
          gap: "5rem",
        }}
      >
        <TextField
          value={searchTerm}
          onChange={handleOnChange}
          sx={{ width: "100%", maxWidth: "50rem" }}
          id="filled-search"
          label="Search Pokemon"
          type="search"
        />
        <SelectType setFilteredPokedex={setFilteredPokedex} />
      </Stack>
    </Container>
  );
}

export default Searchbar;
