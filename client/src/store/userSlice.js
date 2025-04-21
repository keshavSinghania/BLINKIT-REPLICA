import { createSlice } from "@reduxjs/toolkit";

// Default user object
const defaultUser = {
  _id: null,
  name: "",
  email: "",
  avatar: "",
  mobile: "",
  verify_email: false,
  last_login_date: "",
  status: "",
  shopping_cart: [],
  orderHistory: [],
  role: ""
};

// Get user from localStorage if available
const getUserFromLocalStorage = () => {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : defaultUser;
};

const userSlice = createSlice({
  name: "user",
  initialState: getUserFromLocalStorage(),
  reducers: {
    updateUserInsideState: (state, action) => {
      const newUser = {
        _id: action.payload?._id || "",
        name: action.payload?.name || "",
        email: action.payload?.email || "",
        avatar: action.payload?.avatar || "",
        mobile: action.payload?.mobile || "",
        verify_email: action.payload?.verify_email || false,
        last_login_date: action.payload?.last_login_date || "",
        status: action.payload?.status || "",
        shopping_cart: action.payload?.shopping_cart || [],
        orderHistory: action.payload?.orderHistory || [],
        role: action.payload?.role || ""
      };

      // Update state directly
      Object.assign(state, newUser);

      // Save updated user to localStorage
      localStorage.setItem("user", JSON.stringify(newUser));
    },

    updateLogoutValue: () => {
      localStorage.removeItem("user");
      return defaultUser;
    }
  }
});

export const { updateUserInsideState, updateLogoutValue } = userSlice.actions;

export default userSlice.reducer;
