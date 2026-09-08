import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import { useDispatch } from "react-redux";
import {
	BrowserRouter,
	Routes,
	Route
} from "react-router-dom";
import { Protected } from "./components/AuthLayout.jsx";
import { useEffect, useState } from "react";
import { getUserApi } from "./apis/userApi.js";
import { login, logout } from "./store/userSlice.js";
import { Loading } from "./components/Loading.jsx";
import { SignUp } from "./pages/SignUpPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import { NavBar } from "./components/NavBar.jsx";

function App() {

	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const user = getUserApi();

		user.then((user) => {
			console.log("App.jsx")
			console.log(user.user);

			if (user)
				dispatch(login(user.user));
			else
				dispatch(logout());
		})
			.catch((err) => {
				console.log("APP COMPONENT ::", err.message)
			})
			.finally(() => {
				setLoading(false);
			})
	}, [])



	return (loading ? (<Loading />) :
		(
			<BrowserRouter>
				<Routes>

					<Route path="/signup" element={<SignUp />} />
					<Route path="/login" element={<Login />} />
					<Route path="/" element={<LandingPage />} />

					<Route element={<Protected />}>
						<Route element={<NavBar />}>
							<Route path="/home" element={<HomePage />} />
						</Route>
					</Route>

				</Routes>
			</BrowserRouter>))
}

export default App;