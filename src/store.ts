import { configureStore } from "@reduxjs/toolkit";

import { api } from "./services/api";
import authReducer, {
  authMiddleware,
  preloadAuthState,
} from "./redux/authSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  preloadedState: preloadAuthState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, authMiddleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
