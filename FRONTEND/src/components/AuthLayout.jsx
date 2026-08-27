import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const Protected = () => {
    const authStatus = useSelector(state => state.user.authStatus)

    console.log(authStatus)

    if (!authStatus) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}