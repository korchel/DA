import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { IDocument, Role, RoleName } from "../interfaces";

export const docsApi = createApi({
  reducerPath: "documents",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/documents',
    prepareHeaders: (headers) => {
    },
    credentials: "include",
  }),
  tagTypes: ["docs"],
  endpoints: (builder) => ({
    getDocs: builder.query({
      query: (roles: RoleName[]) => {
        if (roles.includes("ROLE_ADMIN") || roles.includes("ROLE_MODERATOR")) {
          return { url: '' };
        }
        return { url: "/for_user" };
      },
      providesTags: ["docs"],
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
      invalidatesTags: ["docs"],
    }),

    deleteDoc: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["docs"],
    }),

    searchDoc: builder.query({   //pageNumber
      query: (params) => ({
        url: `/search?${params}`,
      }),
    }),

    editDoc: builder.mutation({
      query: ({data, id}) => ({
        url: `/for_admin/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ["docs"],
    })
  }),
});

export const {
  useGetDocsQuery,
  useGetDocQuery,
  useDeleteDocMutation,
  useCreateDocMutation,
  useEditDocMutation,
} = docsApi;
