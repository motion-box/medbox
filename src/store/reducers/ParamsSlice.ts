import {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

interface ParamsState {
  isLoading: boolean;
  isMenu: boolean;
}

const initialState: ParamsState = {
  isLoading: false,
  isMenu: false,
};

export const paramsSlice = createSlice({
  name: 'params',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setMenu(state, action: PayloadAction<boolean>) {
      state.isMenu = action.payload;
    },
  },
});

export default paramsSlice.reducer;
