import { useDispatch } from "react-redux";
import { logoutUserApi } from "../apis/userApi"
import { logout } from "../store/userSlice";
import { useState } from "react";

export const LogOutBtn = () => {

    const dispatch = useDispatch()
    const logOutHandeler = async () => {
        try {
            await logoutUserApi();
            dispatch(logout());
        } catch (error) {
            console.log(error.message)
        }

    }

    return (<button
        className="bg-red-500 px-2 py-1 rounded-sm border-black border-2 hover:bg-red-600 text-amber-50 font-semibold cursor-pointer active:scale-95"
        onClick={logOutHandeler}
    >
        LogOut</button>)
}