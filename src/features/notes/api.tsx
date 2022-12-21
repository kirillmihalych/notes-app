import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { INote } from '../models/types'

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Notes'],
  endpoints: (builder) => ({
    getAllNotes: builder.query<INote[], []>({
      query: () => '/notes',
      providesTags: ['Notes'],
    }),
    createNote: builder.mutation<INote, INote>({
      query: (note) => ({
        url: '/notes',
        method: 'POST',
        body: note,
      }),
      invalidatesTags: ['Notes'],
    }),
    updateNote: builder.mutation<INote, INote>({
      query: (note) => ({
        url: `/notes/${note.id}`,
        method: 'PUT',
        body: note,
      }),
      invalidatesTags: ['Notes'],
    }),
    deleteNote: builder.mutation<INote, INote>({
      query: (note) => ({
        url: `/notes/${note.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notes'],
    }),
  }),
})

export const {
  useGetAllNotesQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi
