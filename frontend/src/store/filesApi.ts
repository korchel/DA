import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const filesApi = createApi({
  reducerPath: "files",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/files',
  }),
  endpoints: (builder) => ({
    getFiles: builder.query({
      query: () => ({
        url: '',
      }),
    }),
    getFilesForUser: builder.query({
      query: () => ({
        url: "for_users",
      }),
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/${id}`,
      }),
    }),
    searchFiles: builder.query({
      query: (params) => ({
        url: `/search?${params}`,
      }),
    }),
    uploadFile: builder.mutation({
      query: (data) => ({
        url: '/upload',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})