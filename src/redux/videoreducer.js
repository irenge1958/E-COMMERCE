import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentvideo: null,
  loading:false,
  error:null
}

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    startfecth: (state) => {
      state.loading = true
    },
    successfecth: (state,action) => {
      state.loading = true
      state.currentvideo=action.payload
    },
    failurefecth: (state, action) => {
        state.loading = false
        state.error=action.payload
    },
    likevideo: (state, action) => {
       if(!state.currentvideo.likes.includes(action.payload)){
        state.currentvideo.likes.push(action.payload)
        state.currentvideo.dislikes.splice(state.currentvideo.dislikes.findIndex((USERID)=>USERID===action.payload),1)
       } 
    },
    dislikevideo: (state, action) => {
      if(!state.currentvideo.dislikes.includes(action.payload)){
       state.currentvideo.dislikes.push(action.payload)
       state.currentvideo.likes.splice(state.currentvideo.likes.findIndex((USERID)=>USERID===action.payload),1)
      }
  },
  addview: (state) => {
    
     state.currentvideo.view+=1
    
},
  
  },
})

// Action creators are generated for each case reducer function
export const { startfecth, successfecth, failurefecth,likevideo,dislikevideo,addview } = videoSlice.actions

export default videoSlice.reducer