import { createSlice } from "@reduxjs/toolkit";

// Initial value of store (empty array initially)
const defaultCategoryData = [];

const categorySlice = createSlice({
  name: "category",
  initialState: defaultCategoryData,
  reducers: {
    // Function to store array of category objects
    setCategoryDataInsideStore: (state, action) => {
      return action.payload; 
    },
  },
});

export const { setCategoryDataInsideStore } = categorySlice.actions;

export default categorySlice.reducer;
