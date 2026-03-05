import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './dataSlice'
import raceReducer from "./raceSlice";
import ageReducer from "./ageSlice";
import genderReducer from "./genderSlice";

export const store = configureStore({
  reducer: {
    data: dataSlice,
    race: raceReducer,
    age: ageReducer,
    gender: genderReducer,
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch