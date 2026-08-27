import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerUserApi } from "../apis/userApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/userSlice";

const SignUpForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const onSubmit = async ({ name, email, password }) => {
        try {
            setLoading(true);

            const { user } = await registerUserApi(name, email, password);

            if (user) {
                dispatch(login(user));
            }

            navigate("/home");

        } catch (err) {
            setError(err);
            console.error("Registration failed:", err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                    </label>

                    <input
                        type="text"
                        placeholder="Enter your name"
                        {...register("name", {
                            required: "Name is required",
                            minLength: {
                                value: 2,
                                message: "Name must be at least 2 characters",
                            },
                        })}
                        className={`w-full rounded-lg border px-4 py-3 outline-none transition
                        focus:ring-2 focus:ring-blue-500
                        ${errors.name ? "border-red-500" : "border-gray-300"}
                    `}
                    />

                    {errors.name && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email",
                            },
                        })}
                        className={`w-full rounded-lg border px-4 py-3 outline-none transition
                        focus:ring-2 focus:ring-blue-500
                        ${errors.email ? "border-red-500" : "border-gray-300"}
                    `}
                    />

                    {errors.email && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters",
                            },
                        })}
                        className={`w-full rounded-lg border px-4 py-3 outline-none transition
                        focus:ring-2 focus:ring-blue-500
                        ${errors.password ? "border-red-500" : "border-gray-300"}
                    `}
                    />

                    {errors.password && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        placeholder="Confirm your password"
                        {...register("confirmPassword", {
                            required: "Please confirm your password",
                            validate: (value) =>
                                value === watch("password") ||
                                "Passwords do not match",
                        })}
                        className={`w-full rounded-lg border px-4 py-3 outline-none transition
                        focus:ring-2 focus:ring-blue-500
                        ${errors.confirmPassword
                                ? "border-red-500"
                                : "border-gray-300"
                            }
                    `}
                    />

                    {errors.confirmPassword && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition
                    hover:bg-blue-700 hover:cursor-pointer
                    active:scale-[0.98]
                    disabled:cursor-not-allowed
                    disabled:opacity-60"
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </button>

                {error && <p className="font-semibold text-sm text-red-500 mt-1" >{error.message}!</p>}

            </form>
        </div>
    );
};

export { SignUpForm };