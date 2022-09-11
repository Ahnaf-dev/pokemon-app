import React from "react";
import {
  Box,
  Stack,
  Typography,
  Chip,
  Grid,
  CircularProgress,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { useAppSelector } from "../app/hooks";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#E3350D",
  padding: "0.5rem",
  borderRadius: "5%",
  height: "100%",
  textAlign: "center",
  width: "100%",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: "white",
  textAlign: "center",
  opacity: 0.8,
  fontWeight: "bold",
  fontSize: "1.5rem",
  "@media (min-width:900px)": {
    fontSize: "1.5rem",
  },
}));

function PokeDisplay() {
  const singlePoke = useAppSelector((state) => state.pokedex.singlePoke);
  const loading = useAppSelector((state) => state.pokedex.loading);

  return (
    <Box
      sx={{
        p: 1,
        position: "absolute",
        top: "14%",
        left: "44%",
        width: "27%",
        height: "27%",
        overflowY: "scroll",
        backgroundColor: "white",
        isolation: "isolate,",
        // "&::-webkit-scrollbar": {
        //   display: "none",
        // },
      }}
    >
      {loading ? (
        <CircularProgress
          sx={{ display: "flex", m: "1rem auto", textAlign: "center" }}
          color="secondary"
        />
      ) : (
        <>
          <Stack sx={{ mb: 1 }} direction="row" alignItems="center">
            <Typography
              sx={{
                backgroundColor: "#30A7D7",
                borderRadius: "50%",
                width: "fit-content",
                p: 1,
                color: "white",
                mr: { xs: 1, sm: 2 },
              }}
              variant="h5"
              component="p"
            >
              {singlePoke.id}
            </Typography>
            <Typography
              sx={{ textTransform: "capitalize" }}
              fontWeight="bold"
              component="h1"
              variant="h3"
            >
              {singlePoke.name}
            </Typography>
          </Stack>
          <Grid container spacing={1}>
            {singlePoke.moves.map((move, idx) => (
              <Grid key={idx} item xs={6}>
                <StyledBox>
                  <StyledTypography>{move}</StyledTypography>
                </StyledBox>
              </Grid>
            ))}
          </Grid>
          <Grid sx={{ maxWidth: "300px" }} mt={1} container spacing={1}>
            <Grid item xs={12} md={6}>
              <Stack mt={1} direction="row" spacing={1} alignItems="center">
                <Box>
                  {singlePoke.stats.slice(0, 3).map((stat, idx) => (
                    <Typography
                      key={idx}
                      variant="h6"
                      fontWeight="bold"
                      component="p"
                    >
                      {stat.statName}
                    </Typography>
                  ))}
                </Box>
                <Box>
                  {singlePoke.stats.slice(0, 3).map((stat, idx) => (
                    <Typography key={idx} variant="h6" component="p">
                      {stat.statNum}
                    </Typography>
                  ))}
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack mt={1} direction="row" spacing={1} alignItems="center">
                <Box>
                  {singlePoke.stats.slice(3, 6).map((stat, idx) => (
                    <Typography
                      key={idx}
                      variant="h6"
                      fontWeight="bold"
                      component="p"
                    >
                      {stat.statName}
                    </Typography>
                  ))}
                </Box>
                <Box>
                  {singlePoke.stats.slice(3, 6).map((stat, idx) => (
                    <Typography key={idx} variant="h6" component="p">
                      {stat.statNum}
                    </Typography>
                  ))}
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
}

export default PokeDisplay;
