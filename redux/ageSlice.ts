import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AgeState {
    selectedAge: string;
}

const initialState: AgeState = {
  selectedAge: "",
};

const ageSlice = createSlice({
  name: "age",
  initialState,
  reducers: {
    setSelectedAge: (state, action: PayloadAction<string>) => {
      state.selectedAge = action.payload;
    },
    clearSelectedAge: (state) => {
      state.selectedAge = "";
    },
  },
});

export const { setSelectedAge, clearSelectedAge } = ageSlice.actions;
export default ageSlice.reducer;