import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading:false,
  limit:6,
  offset:0,
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    moreResults:(state,action)=>{
       state.offset = state.limit+state.offset;
    },
    resetResult:(state,action)=>{
        state.offset=0;
    }
  },
})

// Action creators are generated for each case reducer function
export const {setLoading,moreResults,resetResult} = loadingSlice.actions

export default loadingSlice.reducer;