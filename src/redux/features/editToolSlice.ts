import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type EditToolType =
  | 'sizeReducer'
  | 'cropAndResize'
  | 'fileTypeChange'
  | 'faviconGenerate'

//--------------------------------
interface EditToolSliceSate {
  toolType: EditToolType | ''
}

//--------------------------------

const initialState: EditToolSliceSate = {
  toolType: '',
}

const editToolSlice = createSlice({
  initialState: initialState,
  name: 'Edit Tool',

  //
  reducers: {
    selectEditTool: (state, action: PayloadAction<EditToolType>) => {
      state.toolType = action.payload
    },

    clearEditToolState: (state) => {
      state.toolType = ''
    },
  },
})

export const { selectEditTool, clearEditToolState } = editToolSlice.actions
export default editToolSlice.reducer
