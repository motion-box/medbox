import {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

interface ParamsState {
  isLoading: boolean;
}

const initialState: ParamsState = {
  isLoading: false,
};

export const paramsSlice = createSlice({
  name: 'params',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export default paramsSlice.reducer;
