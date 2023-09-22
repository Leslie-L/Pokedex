import { configureStore } from '@reduxjs/toolkit'
import favoriteSlice from './Slices/favoriteSlice'
import loadingSlice  from './Slices/loadingSlide'
import { saveData } from './Middleware'



export const store = configureStore({
  reducer: {
    favorites:favoriteSlice,
    loading:loadingSlice,
  },
  middleware:[
    saveData
  ]
})
