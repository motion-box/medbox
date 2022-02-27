import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import globalReducer from './reducers/GlobalSlice';
import userReducer from './reducers/UserSlice';
import paramsReducer from './reducers/ParamsSlice';
import {userAPI} from '../services/UserService';

const rootReducer = combineReducers({
  globalReducer,
  userReducer,
  paramsReducer,

  [userAPI.reducerPath]: userAPI.reducer,
});

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(userAPI.middleware),
    // devTools: false,
    // enhancers: [devToolsEnhancer({})],
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   AppState,
//   unknown,
//   Action<string>
// >;

export default store;
