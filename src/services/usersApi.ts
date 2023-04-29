import { api } from "./api";

export enum Permission {
  CREATE = "create",
  DELETE = "delete",
}

export type UserDocument = {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  createdAt: string;
  permissions: Permission[];
};

export type User = Omit<UserDocument, "_id" | "createdAt">;

import { UserWithoutPassword } from "../components/Users/UpdateUser";

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserDocument[], void>({
      query: () => "users/get/",
      providesTags: ["Users"],
    }),
    getOneUser: builder.query<UserDocument, string>({
      query: (id) => `users/get/${id}`,
      providesTags: ["Users"],
    }),
    createUser: builder.mutation<User, { user: User }>({
      query: ({ user }) => ({
        url: `users/create`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation<
      User,
      { id: string; user: UserWithoutPassword }
    >({
      query: ({ id, user }) => ({
        url: `users/update/${id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation<User, string>({
      query: (id) => ({
        url: `users/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
  overrideExisting: false,
});

export default usersApi;
