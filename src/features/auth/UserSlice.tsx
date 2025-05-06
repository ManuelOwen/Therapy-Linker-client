import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: number;
  full_name: string;
  email: string;
  contact_phone: string;
  password: string;
  user_id: number;
  profile_picture: string;
  therapist: boolean;
}

export interface UserState {
  user: User | null;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  token: null
 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSucces: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token

    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },

  },
});

export const { loginSucces, logout } = userSlice.actions;
export default userSlice.reducer;