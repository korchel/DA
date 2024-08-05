import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/users',
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: '',
      }),
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
} = usersApi;