import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  current,
} from "@reduxjs/toolkit";
import { useAppDispatch } from "../../hooks";
const axios = require("axios").default;

export interface Pokedex {
  id: number;
  image: string;
  moves: string[];
  name: string;
  stats: { statNum: number; statName: string }[];
  types: { type: string }[];
}

interface PokedexInit {
  pokedex: Pokedex[];
  singlePoke: Pokedex;
  loading: boolean;
}
const initialState: PokedexInit = {
  pokedex: [],
  singlePoke: {
    id: 0,
    image: "",
    moves: ["", ""],
    name: "",
    stats: [{ statNum: 0, statName: "" }],
    types: [{ type: "" }],
  },
  loading: false,
};

export const fetchPokedex = createAsyncThunk(
  "pokedex/fetchPokedex",
  async (thunkAPI) => {
    const {
      data: { results },
    } = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100");

    const pokeData = await results.map(async (res: any) => {
      const { data } = await axios.get(res.url);
      const { id, moves, name, sprites, stats, types } = data;

      const allTypes = types.map((type: any) => {
        return { type: type.type.name };
      });

      const allMoves = moves.slice(0, 4).map((move: any) => {
        return move.move.name;
      });
      const allStats = stats.map((item: any) => {
        return {
          statNum: item.base_stat,
          statName: item.stat.name,
        };
      });
      const image = sprites.front_default;

      return {
        id,
        name,
        image,
        moves: allMoves,
        stats: allStats,
        types: allTypes,
      };
    });

    return Promise.all(pokeData).then((value) => {
      return value;
    });
  }
);

const pokeSlice = createSlice({
  name: "pokedex",
  initialState,
  reducers: {
    setSinglePoke: (state, action: PayloadAction<number>) => {
      const newPoke = current(state).pokedex.find(
        (poke) => poke.id === action.payload
      );

      if (!newPoke) {
        throw new Error("invalid poke");
      }
      state.singlePoke = newPoke;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokedex.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      fetchPokedex.fulfilled,
      (state, action: PayloadAction<any>) => {
        action.payload.forEach((poke: Pokedex) => {
          state.pokedex.push(poke);
        });
        state.singlePoke = action.payload[0];
        state.loading = false;
      }
    );
    builder.addCase(fetchPokedex.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
    });
    // Add reducers for additional action types here, and handle loading state as needed
  },
});

export const { setSinglePoke } = pokeSlice.actions;

export default pokeSlice.reducer;
