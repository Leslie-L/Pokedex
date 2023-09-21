import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  favorites:[],
}

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    initialFavorites: (state,action)=>{
        state.favorites = action.payload
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload) 
    },
    deleteFavorite:(state,action)=>{
      state.favorites = state.favorites.filter(id=>id!==action.payload)
    }
    
  },
})

// Action creators are generated for each case reducer function
export const {  initialFavorites,addFavorite,deleteFavorite } = favoriteSlice.actions

export default favoriteSlice.reducer