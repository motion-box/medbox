import {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

type roleType = 'client' | 'doctor';

interface UserState {
  role: roleType | undefined;
  companion:
    | {
        username: string;
        display_name: string;
      }
    | undefined;
}

const initialState: UserState = {
  role: undefined,
  companion: undefined,
};

export const userSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setUserRole(state, action: PayloadAction<roleType>) {
      state.role = action.payload;
    },
    setCompanion(
      state,
      action: PayloadAction<{username: string; display_name: string}>,
    ) {
      state.companion = action.payload;
    },
  },
});

export default userSlice.reducer;
