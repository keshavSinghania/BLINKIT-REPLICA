import { createSlice } from "@reduxjs/toolkit";

// Initial value of store (empty array initially)
const defaultCategoryData = [];

const subCategorySlice = createSlice({
  name: "sub-category",
  initialState: defaultCategoryData,
  reducers: {
    // Function to store array of category objects
    setSubCategoryDataInsideStore: (state, action) => {
      return action.payload; 
    },
  },
});

export const { setSubCategoryDataInsideStore } = subCategorySlice.actions;

export default subCategorySlice.reducer;
