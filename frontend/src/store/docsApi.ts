import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const docsApi = createApi({
  reducerPath: "documents",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/documents',
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get("token")}` as string);
    },
  }),
  endpoints: (builder) => ({
    getDocs: builder.query({
      query: () => ({
        url: '',
      }),
    }),
    getDocsForUsers: builder.query({
      query: () => ({
        url: "/for_users",
      }),
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