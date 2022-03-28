import {
  RegisterModel,
  UserRegistersModel,
} from './../../models/HistoryItemsModel';
import {UserModel} from './../../models/UserModal';
import {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

type RoleType = 'client' | 'doctor';
type AccessType = {
  id: number;
  token: string;
  phone_number: string;
};

interface UserState {
  role: RoleType | undefined;
  userData: UserModel | undefined;
  accessData: AccessType | undefined;
  userRegisters: UserRegistersModel;
  userLocation: LocationType | null;
  choosenLocation: LocationType | null;
  companion:
    | {
        username: string;
        display_name: string;
      }
    | undefined;
}
type LocationType = {latitude: string; longitude: string; address: string};

const initialState: UserState = {
  role: undefined,
  userData: undefined,
  accessData: undefined,
  userRegisters: {
    active: [],
    history: [],
    last: [],
  },
  companion: undefined,
  userLocation: null,
  choosenLocation: null,
};

export const userSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setUserRole(state, action: PayloadAction<RoleType>) {
      state.role = action.payload;
    },
    setCompanion(
      state,
      action: PayloadAction<{username: string; display_name: string}>,
    ) {
      state.companion = action.payload;
    },
    setUserData(state, action: PayloadAction<UserModel>) {
      state.userData = action.payload;
    },
    setAccessData(state, action: PayloadAction<AccessType>) {
      state.accessData = action.payload;
    },
    setUserLocation(state, action: PayloadAction<LocationType>) {
      state.userLocation = action.payload;
    },
    setChoosenLocation(state, action: PayloadAction<LocationType | null>) {
      state.choosenLocation = action.payload;
    },
    setUserRegisters(state, action: PayloadAction<UserRegistersModel>) {
      state.userRegisters = action.payload;
    },
  },
});

export default userSlice.reducer;
