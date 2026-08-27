import { LoginForm } from "../components/LoginForm";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-center text-gray-800">
                    Welcome Back
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-8">
                    Login to your account
                </p>

                {/* Login form */}
                <LoginForm />

                <p className="text-center text-sm text-gray-600 mt-6">
                    Don't have an account?{" "}
                    <button onClick={() => navigate("/signup")} className="text-blue-600 font-medium hover:underline hover:cursor-pointer">
                        Sign up
                    </button>
                </p>

            </div>
        </div>
    );
};

export default Login;