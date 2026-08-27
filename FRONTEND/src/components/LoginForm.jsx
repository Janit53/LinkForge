import { useForm } from "react-hook-form";
import { loginUserApi } from "../apis/userApi";
import { useState } from "react";
import { login } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

    const loginHandeler = async ({ email, password }) => {
        setError("");
        setLoading(true);

        try {
            let data = await loginUserApi(email, password);
            console.log(data.user)
            dispatch(login(data.user));
            navigate('/home')
        } catch (error) {
            console.log(error)
            setError("ERROR OCCURRED!!!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(loginHandeler)} className="space-y-5">

            {/* Email */}
            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Email
                </label>

                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    autoComplete="off"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg
                               outline-none focus:ring-2 focus:ring-blue-500
                               focus:border-blue-500"
                    {...register("email", {
                        required: "Email is required",
                        validate: {
                            matchPattern: (value) =>
                                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address"
                        }
                    })}
                />

                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* Password */}
            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Password
                </label>

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        className="w-full px-4 py-3 pr-16 border border-gray-300 rounded-lg
                                   outline-none focus:ring-2 focus:ring-blue-500
                                   focus:border-blue-500"
                        {...register("password", {
                            required: "Password is required"
                        })}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2
                                   text-gray-500 hover:text-gray-700
                                   text-sm font-medium"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>

                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                    </p>
                )}
            </div>

            {/* Forgot password */}
            <div className="text-right">
                <button
                    type="button"
                    className="text-sm text-blue-600 hover:underline"
                >
                    Forgot password?
                </button>
            </div>

            {/* Server error */}
            {error && (
                <p className="text-red-500 text-sm text-center">
                    {error}
                </p>
            )}

            {/* Login button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg
                           font-semibold hover:bg-blue-700 transition
                           disabled:bg-blue-400 disabled:cursor-not-allowed hover:cursor-pointer"
            >
                {loading ? "Logging in..." : "Login"}
            </button>

        </form>
    );
};