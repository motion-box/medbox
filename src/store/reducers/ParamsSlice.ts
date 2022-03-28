import {NewsModel} from './../../models/NewsModel';
import {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

interface ParamsState {
  isLoading: boolean;
  isMenu: boolean;
  isQr: boolean;
  registerId: number | null;
  news: Array<NewsModel> | [];
}

const initialState: ParamsState = {
  isLoading: false,
  isMenu: false,
  isQr: false,
  registerId: null,
  news: [],
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
    setQr(state, action: PayloadAction<boolean>) {
      state.isQr = action.payload;
    },
    setRegisterId(state, action: PayloadAction<number | null>) {
      state.registerId = action.payload;
    },
    setNews(state, action: PayloadAction<NewsModel[] | []>) {
      state.news = action.payload;
    },
  },
});

export default paramsSlice.reducer;
