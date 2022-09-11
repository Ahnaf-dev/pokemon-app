import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Chip,
  Grid,
  Container,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { setSinglePoke } from "../app/features/Pokedex/pokeSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import Searchbar from "./SearchBar";
import SelectType from "./Select";

interface PokeProps {
  setShowList: React.Dispatch<React.SetStateAction<boolean>>;
}

function PokeList({ setShowList }: PokeProps) {
  const Pokedex = useAppSelector((state) => state.pokedex.pokedex);
  const loading = useAppSelector((state) => state.pokedex.loading);
  const dispatch = useAppDispatch();
  const [filteredPokedex, setFilteredPokedex] = useState(Pokedex);

  function selectPokemon(id: number) {
    dispatch(setSinglePoke(id));
    setShowList(false);
  }

  return (
    <Box
      sx={{
        position: "fixed",
        overflowY: "scroll",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        zIndex: 100,
        p: 2,
      }}
    >
      {!loading && <Searchbar setFilteredPokedex={setFilteredPokedex} />}
      <Typography
        textAlign="center"
        fontWeight="bold"
        variant="h2"
        component="h1"
      >
        Select Pokemon
      </Typography>
      {loading ? (
        <CircularProgress
          sx={{ display: "flex", m: "1rem auto", textAlign: "center" }}
          color="secondary"
        />
      ) : (
        <Container maxWidth="lg" sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {filteredPokedex.map((poke) => (
              <Grid
                onClick={() => selectPokemon(poke.id)}
                key={poke.id}
                item
                xs={6}
                md={4}
                lg={3}
              >
                <Paper
                  sx={{
                    "& img": {
                      width: "100%",
                      height: "20rem",
                      objectFit: "contain",
                    },
                    "&:hover": { cursor: "pointer", transform: "scale(1.1)" },
                  }}
                  elevation={3}
                >
                  <img src={poke.image} alt={poke.name} />
                  <Box sx={{ padding: "0 1rem", pb: 3 }}>
                    <Typography
                      sx={{ opacity: 0.7, mb: 1 }}
                      variant="body2"
                      component="p"
                    >
                      {poke.id < 10 ? `#00${poke.id}` : `#${poke.id}`}
                    </Typography>
                    <Typography
                      variant="h2"
                      component="h2"
                      sx={{
                        fontWeight: "bold",
                        mb: 1,
                        textTransform: "capitalize",
                      }}
                    >
                      {poke.name}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      {poke.types.map((type, idx) => (
                        <Box
                          key={idx}
                          className={type.type}
                          sx={{
                            textAlign: "center",
                            maxWidth: "10rem",
                            width: "100%",
                            padding: { xs: "0.3rem" },
                          }}
                        >
                          <Typography variant="h4">{type.type}</Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Paper>
              </Grid>
            ))}
            {/* <Grid item xs={6} md={4} lg={3}>
            <Paper
              sx={{
                "& img": {
                  width: "100%",
                  height: "20rem",
                  objectFit: "contain",
                },
                "&:hover": { cursor: "pointer" },
              }}
              elevation={3}
            >
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png"
                alt=""
              />
              <Box sx={{ padding: "0 1rem", pb: 3 }}>
                <Typography
                  sx={{ opacity: 0.7, mb: 1 }}
                  variant="body2"
                  component="p"
                >
                  #001
                </Typography>
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{ fontWeight: "bold" }}
                >
                  Bulbasaur
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Button sx={{ cursor: "initial" }} variant="text">
                    Contained
                  </Button>
                  <Button sx={{ cursor: "initial" }} variant="text">
                    Contained
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Grid> */}
          </Grid>
        </Container>
      )}
    </Box>
  );
}

export default PokeList;
