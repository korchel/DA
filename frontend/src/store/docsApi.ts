import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { Role } from "../interfaces";

export const docsApi = createApi({
  reducerPath: "documents",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/documents',
    prepareHeaders: (headers) => {
    },
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getDocs: builder.query({
      query: (roles: Role[]) => {
        if (roles.includes("ROLE_ADMIN") || roles.includes("ROLE_MODERATOR")) {
          return { url: '' };
        }
        return { url: "/for_user" };
      },
    }),

    getDoc: builder.query({
      query: (id) => ({
        url: `/${id}`,
      }),
    }),
    createDoc: builder.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
    }),
    deleteDoc: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
    searchDoc: builder.query({   //pageNumber
      query: (params) => ({
        url: `/search?${params}`,
      })
    }),
    updateDoc: builder.mutation({
      query: ({data, id}) => ({
        url: `/for_admin/${id}`,
        method: 'PUT',
        body: data,
      })
    })
  }),
});

export const {
  useGetDocsQuery,
  useGetDocQuery,
  useDeleteDocMutation,
  useCreateDocMutation,
  useUpdateDocMutation,
} = docsApi;
