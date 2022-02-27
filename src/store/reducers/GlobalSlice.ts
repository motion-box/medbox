import {GlobalState} from './../../models/GlobalModel';
import {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

const initialState: GlobalState = {
  screen: {
    width: 0,
    height: 0,
    hasNotch: undefined,
    headerSize: null,
  },
  os: undefined,
  lang: 'en',
  bottomTabVisible: true,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setScreenParams(
      state,
      action: PayloadAction<{
        width: number;
        height: number;
        hasNotch: boolean;
        headerSize: number | null;
      }>,
    ) {
      state.screen = action.payload;
    },
    setOS(state, action: PayloadAction<'ios' | 'android'>) {
      state.os = action.payload;
    },
    setAppLanguage(state, action: PayloadAction<'en' | 'ru' | 'uz'>) {
      state.lang = action.payload;
    },
    setBottomTabVisible(state, action: PayloadAction<boolean>) {
      state.bottomTabVisible = action.payload;
    },
  },
});

export default globalSlice.reducer;
