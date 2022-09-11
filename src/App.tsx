import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { Button } from "@mui/material";
import { fetchPokedex } from "./app/features/Pokedex/pokeSlice";
import PokeDisplay from "./components/PokeDisplay";
import PokeList from "./components/PokeList";
import PokeDisplayOverview from "./components/PokeDisplayOverview";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";

let theme = createTheme();
theme = responsiveFontSizes(theme);

function App() {
  const [isShowList, setShowList] = useState(false);
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.pokedex.loading);

  useEffect(() => {
    dispatch(fetchPokedex());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <img className="pokedex" src="pokemon.png" alt="" />
        <PokeDisplay />
        <PokeDisplayOverview />
        {!loading && (
          <Button
            onClick={() => setShowList(true)}
            id="showPokeBtn"
            variant="outlined"
          >
            Select Pokemon
          </Button>
        )}

        {isShowList && <PokeList setShowList={setShowList} />}
      </div>
    </ThemeProvider>
  );
}

export default App;
