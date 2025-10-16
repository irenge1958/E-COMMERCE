import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentcomment: [],
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    addnew: (state,action) => {
      state.currentcomment.push(action.payload)
    },
  
    deleteProductin: (state, action) => {
       
        state.currentcomment.splice(state.currentcomment.findIndex((USERID)=>USERID._id===action.payload),1)
  },
  emptybasket: (state, action) => {
       
    state.currentcomment=[]
},
  },
})

// Action creators are generated for each case reducer function
export const {addnew, deleteProductin,emptybasket } = commentSlice.actions

export default commentSlice.reducer