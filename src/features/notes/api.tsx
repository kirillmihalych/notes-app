import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { INote } from '../models/types'

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  endpoints: (builder) => ({
    getAllNotes: builder.query<INote[], []>({
      query: () => '/notes',
    }),
  }),
})

export const { useGetAllNotesQuery } = notesApi
