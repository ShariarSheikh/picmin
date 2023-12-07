import { PayloadAction, createSlice } from '@reduxjs/toolkit'

//--------------------------------
interface ImgSliceSate {
  originalImg: string
  editedImg: string
  isDownloadAble: boolean
}

interface SetImgProps {
  originalImg?: string
  editedImg?: string
}
//--------------------------------

const initialState: ImgSliceSate = {
  originalImg: '',
  editedImg: '',
  isDownloadAble: false,
}

const imgSlice = createSlice({
  initialState: initialState,
  name: 'Image Sate',

  //
  reducers: {
    setImgHandler: (state, action: PayloadAction<SetImgProps>) => {
      if (action.payload.originalImg) {
        state.originalImg = action.payload.originalImg || ''
        state.editedImg = ''
      }

      if (action.payload.editedImg) {
        state.editedImg = action.payload.editedImg || ''
      }
    },

    setNewImg: (state, action: PayloadAction<{ newImg: string }>) => {
      state.originalImg = action.payload.newImg
      state.editedImg = ''
      state.isDownloadAble = false
    },

    setEditedImg: (state, action: PayloadAction<{ editedImg: string }>) => {
      state.editedImg = action.payload.editedImg
      state.isDownloadAble = true
    },

    clearImgSate: (state) => {
      state.originalImg = ''
      state.editedImg = ''
      state.isDownloadAble = false
    },
  },
})

export const { setImgHandler, clearImgSate, setEditedImg, setNewImg } =
  imgSlice.actions
export default imgSlice.reducer
