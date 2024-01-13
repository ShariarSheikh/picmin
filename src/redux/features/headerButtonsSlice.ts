import { createSlice } from '@reduxjs/toolkit'

//--------------------------------
interface InitialStateProps {
  isOpenTutorial: boolean
}
//--------------------------------

const initialState: InitialStateProps = {
  isOpenTutorial: false,
}

const headerButtonsSlice = createSlice({
  initialState: initialState,
  name: 'Header Buttons Slice',

  //
  reducers: {
    toggleTutorialButton: (state) => {
      state.isOpenTutorial = !state.isOpenTutorial
    },
  },
})

export const { toggleTutorialButton } = headerButtonsSlice.actions
export default headerButtonsSlice.reducer
