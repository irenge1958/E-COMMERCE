import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentuser: null,
  loading:false,
  error:null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startfecth: (state) => {
      state.loading = true
    },
    successfecth: (state,action) => {
      state.loading = false
      state.currentuser=action.payload
    },
    failurefecth: (state, action) => {
        state.loading = false
        state.error=action.payload
    },
    sub: (state, action) => {
      if(!state.currentuser.subscribings.includes(action.payload)){
       state.currentuser.subscribings.push(action.payload)
    
      }
      else{
        state.currentuser.subscribings.splice(state.currentuser.subscribings.findIndex((USERID)=>USERID===action.payload),1)
      }
  },
    logout: (state) => {
      state.loading = false
      state.currentuser=null
      state.error=false
  },
  },
})

// Action creators are generated for each case reducer function
export const {sub, logout,startfecth, successfecth, failurefecth } = userSlice.actions

export default userSlice.reducer