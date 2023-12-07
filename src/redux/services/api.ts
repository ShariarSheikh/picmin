import { API_KEY, ServerBaseUrl } from '@/config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiServices = createApi({
  reducerPath: 'apiServices',
  baseQuery: fetchBaseQuery({
    baseUrl: ServerBaseUrl as string,
    prepareHeaders: (headers) => {
      if (API_KEY) {
        headers.set('x-api-key', API_KEY)
      }
      return headers
    },
  }),

  //@ts-ignore
  endpoints: () => ({}),
})
