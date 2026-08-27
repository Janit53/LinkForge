import { Outlet } from "react-router-dom"
import { LogOutBtn } from "./LogOutBtn"

export const NavBar = () => {
    return (
        <div className="min-h-screen">
            <nav className="flex flex-row items-center justify-between p-3 m-2">
                <div className="">Logo</div>

                <div>
                    <LogOutBtn />
                </div>
            </nav>
            <Outlet />
        </div>
    )
}
