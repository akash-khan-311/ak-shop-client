
import { IUser } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";

type TAuthState = {
  user: null | IUser;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      const { user, token } = payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

interface RootState {
  auth: TAuthState;
}

export const selectCurrentUser = (state: RootState): TAuthState["user"] =>
  state.auth.user;

export const selectCurrentToken = (state: RootState): TAuthState["token"] =>
  state.auth.token;
