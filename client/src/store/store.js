import {configureStore} from '@reduxjs/toolkit'
import userSlice from "./userSlice.js"
import categorySlice from "./categorySlice.js"
export const store = configureStore({
    reducer: {
        user : userSlice,
        category : categorySlice
    }
})