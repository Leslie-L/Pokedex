import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading:false,
  isNext:true,
  limit:6,
  offset:0,
  notFound:false,
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
        state.offset = 0;
        state.isNext = true;
    },
    setIsNext:(state,action)=>{
      state.isNext = action.payload;
    },
    setNotFound:(state,action)=>{
      state.notFound = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const {setLoading,moreResults,resetResult,setIsNext,setNotFound} = loadingSlice.actions

export default loadingSlice.reducer;