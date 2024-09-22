import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFile, RoleName } from "../interfaces";

export const filesApi = createApi({
  reducerPath: "files",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.URL}/api/files`,
    credentials: "include",
  }),
  tagTypes: ["files", 'file'],

  endpoints: (builder) => ({
    getFiles: builder.query<IFile[], RoleName[]>({
      query: (roles: RoleName[]) => {
        if (roles.includes("ROLE_ADMIN") || roles.includes("ROLE_MODERATOR")) {
          return { url: '' };
        }
        return { url: "/for_user" };
      },
      providesTags: ["files"],
    }),

    uploadFile: builder.mutation<void, FormData>({
      query: (data) => ({
        url: '/upload',
        method: 'POST',
        body: data,
        formData: true,
      }),
      invalidatesTags: ["files"],
    }),

    getFile: builder.query<IFile, string | undefined>({
      query: (id) => ({
        url: `/show_data_file/${id}`,
      }),
      providesTags: ['file'],
    }),

    editFile: builder.mutation({
      query: ({id, data}) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['file'],
    }),

    deleteFile: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["files"],
    }),

    searchFiles: builder.query({
      query: (params) => ({
        url: `/search?${params}`,
      }),
    }),
  }),
});

export const {
  useGetFilesQuery,
  useGetFileQuery,
  useDeleteFileMutation,
  useEditFileMutation,
  useUploadFileMutation,
} = filesApi;