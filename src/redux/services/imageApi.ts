import { apiServices } from './api'

export const imageApi = apiServices.injectEndpoints({
  endpoints: (builders) => ({
    // remove bg post request
    imgBgRemove: builders.mutation<{ file: string }, { imgData: FormData }>({
      query: (credential) => ({
        url: '/api/image/remove_background',
        method: 'POST',
        body: credential.imgData,
      }),
    }),
  }),
})

export const { useImgBgRemoveMutation } = imageApi
