import { AuthState } from "../redux/authSlice";
import { api } from "./api";

type Credentials = {
  username: string;
  password: string;
};

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthState, Credentials>({
      query: (credentials) => ({
        url: "users/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export default authApi;
