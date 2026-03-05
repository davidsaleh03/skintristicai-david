import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface GenderState {
    selectedGender: string;
}

const initialState: GenderState = {
  selectedGender: "",
};

const genderSlice = createSlice({
  name: "gender",
  initialState,
  reducers: {
    setSelectedGender: (state, action: PayloadAction<string>) => {
      state.selectedGender = action.payload;
    },
    clearSelectedGender: (state) => {
      state.selectedGender = "";
    },
  },
});

export const { setSelectedGender, clearSelectedGender } = genderSlice.actions;
export default genderSlice.reducer;