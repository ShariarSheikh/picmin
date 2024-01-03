import { apiServices } from './api'

export const imageApi = apiServices.injectEndpoints({
  endpoints: (builders) => ({
    generateFavicon: builders.mutation<
      { data: { faviconZip: string; htmlLinksString: string } },
      { imgData: FormData }
    >({
      query: (credential) => ({
        url: '/api/favicon/create',
        method: 'POST',
        body: credential.imgData,
      }),
    }),

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

export const { useImgBgRemoveMutation, useGenerateFaviconMutation } = imageApi
