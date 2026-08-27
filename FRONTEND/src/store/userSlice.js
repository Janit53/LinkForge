import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authStatus: false,
    userData: null
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.authStatus = true;
            state.userData = action.payload.userData
        },
        logout: (state) => {
            state.authStatus = false;
            state.userData = null;
        }
    }
})

export { userSlice };
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;