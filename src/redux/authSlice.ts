import { createSlice } from "@reduxjs/toolkit";
import type { Middleware, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AuthState {
  token: string | null;
  user: string | null;
  isAdmin: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAdmin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      const { token, user, isAdmin } = action.payload;
      state.token = token;
      state.user = user;
      state.isAdmin = isAdmin;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAdmin = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentIsAdmin = (state: RootState) => state.auth.isAdmin;

export const preloadAuthState = () => {
  const storage = localStorage.getItem("auth");
  if (storage) {
    return { auth: JSON.parse(storage) };
  }
  return { auth: { token: null, user: null, isAdmin: false } };
};

export const authMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type?.startsWith("auth/")) {
    const authState = store.getState().auth;
    localStorage.setItem("auth", JSON.stringify(authState));
  }
  return result;
};
