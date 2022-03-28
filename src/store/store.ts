import {configureStore, combineReducers} from '@reduxjs/toolkit';
import globalReducer from './reducers/GlobalSlice';
import userReducer from './reducers/UserSlice';
import paramsReducer from './reducers/ParamsSlice';
import classifiersReucer from './reducers/ClassifiersSlice';
import {userAPI} from '../services/UserService';
import {classifiersAPI} from './../services/ClassifiersService';
import {doctorAPI} from '../services/DoctorService';
import {registerAPI} from '../services/RegisterService';

const rootReducer = combineReducers({
  globalReducer,
  userReducer,
  paramsReducer,
  classifiersReucer,

  [userAPI.reducerPath]: userAPI.reducer,
  [classifiersAPI.reducerPath]: classifiersAPI.reducer,
  [doctorAPI.reducerPath]: doctorAPI.reducer,
  [registerAPI.reducerPath]: registerAPI.reducer,
});

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(
        userAPI.middleware,
        classifiersAPI.middleware,
        doctorAPI.middleware,
        registerAPI.middleware,
      ),
    // devTools: false,
    // enhancers: [devToolsEnhancer({})],
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
