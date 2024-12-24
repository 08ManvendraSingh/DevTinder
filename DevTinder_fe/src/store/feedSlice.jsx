import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
    name:'feed',
    initialState:null,
    reducers:{
        addFeed:(state,action)=>{
            return action.payload;
        },
        updateFeed:(state,action)=>{
            const newArr = state.filter((send) => send._id !== action.payload);
            return newArr;
        }
    }
});

export const {addFeed,updateFeed}=feedSlice.actions;
export default feedSlice.reducer;