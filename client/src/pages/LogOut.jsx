import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import fetchWithAuth from '../utils/fetchAuth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { updateLogoutValue } from '../store/userSlice';

export const LogOut = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const url = import.meta.env.VITE_FETCH_URL + "logout";
    const logoutUser = async () => {
        try {
            const response = await fetchWithAuth(url, "get");
            // console.log(response);
            if (response.error) {
                if (response.message === "Access token missing") {
                    toast.error("Please Login Before logging out");
                    navigate("/login")
                }
                else {
                    toast.error(response.message);
                }

            };
            if (response.success) {
                toast.success(response.message);
                dispatch(updateLogoutValue())
                navigate("/");
            }
        } catch (error) {
            toast.error("Something went wrong", error);
            console.log(error);
        }
    }

    useEffect(() => {
        logoutUser();
    }, [])
    return (
        <div>Sucessfully logout</div>
    )
}
