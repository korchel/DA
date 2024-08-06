import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../interfaces";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/users',
    credentials: "include",
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => ({
        url: '',
      }),
      providesTags: ["users"],
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/${id}`,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
} = usersApi;