import React from "react";
import { Box, Stack, Typography, Chip, Grid } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { useAppSelector } from "../app/hooks";

function PokeDisplayOverview() {
  const singlePoke = useAppSelector((state) => state.pokedex.singlePoke);
  const loading = useAppSelector((state) => state.pokedex.loading);

  return (
    <Box
      sx={{
        p: 1,
        position: "absolute",
        top: "61.5%",
        left: "43.5%",
        width: "27.5%",
        height: "26%",
        backgroundColor: "white",
        isolation: "isolate,",
      }}
    >
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <img
            className="display-poke"
            src={singlePoke.image}
            alt={singlePoke.name}
          />
          <Stack
            sx={{
              flexDirection: { lg: "row" },
              alignItems: "baseline",
              justifyContent: { lg: "space-between" },
            }}
          >
            <Typography
              sx={{ zIndex: 1, textTransform: "capitalize" }}
              mb={1}
              color="primary"
              variant="h3"
              component="h2"
            >
              {singlePoke.name}
            </Typography>
            <Stack
              sx={{
                flexDirection: {
                  xs: "row",
                  lg: "column",
                },
                gap: "1rem",
                alignItems: "center",
              }}
            >
              {singlePoke.types.map((type, idx) => (
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
          </Stack>
        </>
      )}
    </Box>
  );
}

export default PokeDisplayOverview;
