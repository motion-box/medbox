import {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {
  SpecialityModel,
  ClassifiersModel,
  HourIntervalsModel,
} from './../../models/ClassifiersModel';

const initialState: ClassifiersModel = {
  specialities: [],
  hourIntervals: [],
};

export const classifiersSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setSpecialitiesList(state, action: PayloadAction<Array<SpecialityModel>>) {
      state.specialities = action.payload;
    },
    setHourIntervals(state, action: PayloadAction<Array<HourIntervalsModel>>) {
      state.hourIntervals = action.payload;
    },
  },
});
export default classifiersSlice.reducer;
