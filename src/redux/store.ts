import { configureStore } from '@reduxjs/toolkit'
import editToolSlice from './features/editToolSlice'
import headerButtonsSlice from './features/headerButtonsSlice'
import imgSlice from './features/imgSlice'
import { apiServices } from './services/api'
// ...

export const store = configureStore({
  reducer: {
    imgSlice: imgSlice,
    editToolSlice: editToolSlice,
    headerButtonsSlice: headerButtonsSlice,

    //api
    [apiServices.reducerPath]: apiServices.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiServices.middleware),
  devTools: process.env.NODE_ENV === 'development',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
