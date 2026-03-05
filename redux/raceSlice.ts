import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface RaceState {
    selectedRace: string;
}

const initialState: RaceState = {
  selectedRace: "",
};

const raceSlice = createSlice({
  name: "race",
  initialState,
  reducers: {
    setSelectedRace: (state, action: PayloadAction<string>) => {
      state.selectedRace = action.payload;
    },
    clearSelectedRace: (state) => {
      state.selectedRace = "";
    },
  },
});

export const { setSelectedRace, clearSelectedRace } = raceSlice.actions;
export default raceSlice.reducer;