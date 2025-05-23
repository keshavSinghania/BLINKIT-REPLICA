import { Component } from "react";
import { createBrowserRouter } from "react-router-dom";
import Search from "../components/Search";
import React from "react";
import App from "../App";
import SearchPage from "../pages/SearchPage";
import HomePage from "../pages/HomePage";
import Register from "../pages/Register";
import LoginPage from "../pages/LoginPage";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyOtp from "../pages/VerifyOtp";
import UpdatePassword from "../pages/UpdatePassword";
import { LogOut } from "../pages/LogOut";
import Dashboard from "../pages/Dashboard";
import { MyAccount } from "../components/MyAccount";
import { MyOrders } from "../components/MyOrders";
import { Address } from "../components/Address";
import Profile from "../pages/Profile";
import SubCategory from "../pages/SubCategory";
import Products from "../pages/Products";
import UploadProducts from "../pages/UploadProducts";
import Category from "../pages/Category";
import OnlyAdminPerms from "../components/OnlyAdminPerms";
import ProductDetails from "../pages/ProductDetails";
import CategoryDetails from "../pages/CategoryDetails";
const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <HomePage></HomePage>
            },
            {
                path: "search",
                element: <SearchPage />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "verify-otp",
                element: <VerifyOtp />
            },
            {
                path: "update-password",
                element : <UpdatePassword/>
            },
            {
                path: "logout",
                element : <LogOut/>
            },
            {
                path: "dashboard",
                element : <Dashboard/>,
                children : [
                    {
                        path : "category",
                        element : <OnlyAdminPerms><Category/></OnlyAdminPerms>
                    },
                    {
                        path : "sub-category",
                        element : <OnlyAdminPerms><SubCategory/></OnlyAdminPerms>
                    },
                    {
                        path : "products",
                        element : <OnlyAdminPerms><Products/></OnlyAdminPerms>
                    },
                    {
                        path : "upload-products",
                        element : <OnlyAdminPerms><UploadProducts/></OnlyAdminPerms>
                    },
                    {
                        path : "myorders",
                        element : <MyOrders/>
                    },
                    {
                        path : "address",
                        element : <Address/>
                    },
                    {
                        path : "profile",
                        element : <Profile/>
                    },
                ]
            },
            {
                path: "product/:productName/:_id",
                element : <ProductDetails/>
            },
            {
                path: "category/:categoryName/:_id",
                element : <CategoryDetails/>
            }
        ]
    }
]);

export default Router;