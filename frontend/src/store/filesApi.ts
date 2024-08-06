import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { IFile } from "../interfaces";

export const filesApi = createApi({
  reducerPath: "files",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/files',
    credentials: "include",
  }),
  tagTypes: ["files"],
  endpoints: (builder) => ({
    getFiles: builder.query<IFile[], void>({
      query: () => ({
        url: '',
      }),
      providesTags: ["files"],
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
});

export const {
  useGetFilesQuery,
} = filesApi;