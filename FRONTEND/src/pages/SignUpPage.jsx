import { useNavigate } from "react-router-dom";
import { SignUpForm } from "../components/SignUpForm.jsx";

const SignUp = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Create Account
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Register to get started
                        </p>
                    </div>

                    <SignUpForm />

                    {/* Login link */}
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Don't have an account?{" "}
                        <button onClick={() => navigate("/login")} className="text-blue-600 font-medium hover:underline hover:cursor-pointer">
                            Log In
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export { SignUp };