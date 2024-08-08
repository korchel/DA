import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { IDocument, Role, RoleName } from "../interfaces";
import { IEditDocForm } from "../components/ModalComponent/document/EditDocument";
import { ICreateDocForm } from "../components/ModalComponent/document/CreateDocument";

export const docsApi = createApi({
  reducerPath: "documents",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/documents',
    credentials: "include",
  }),
  tagTypes: ["docs"],
  endpoints: (builder) => ({
    getDocs: builder.query<IDocument[], RoleName[]>({
      query: (roles: RoleName[]) => {
        if (roles.includes("ROLE_ADMIN") || roles.includes("ROLE_MODERATOR")) {
          return { url: '' };
        }
        return { url: "/for_user" };
      },
      providesTags: ["docs"],
    }),

    getDoc: builder.query<IDocument, string | undefined>({
      query: (id) => ({
        url: `/${id}`,
      }),
    }),

    createDoc: builder.mutation<void, ICreateDocForm>({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["docs"],
    }),

    deleteDoc: builder.mutation<void, string | undefined>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["docs"],
    }),

    editDoc: builder.mutation<boolean, {data: IEditDocForm, id: string | undefined}>({
      query: ({data, id}) => ({
        url: `/for_admin/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ["docs"],
    }),

    searchDoc: builder.query({   //pageNumber
      query: (params) => ({
        url: `/search?${params}`,
      }),
    }),
  }),
});

export const {
  useGetDocsQuery,
  useGetDocQuery,
  useDeleteDocMutation,
  useCreateDocMutation,
  useEditDocMutation,
} = docsApi;
