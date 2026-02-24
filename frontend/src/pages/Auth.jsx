import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import heroImg from "../assets/hero-mountain.png";

export default function Auth() {
    const location = useLocation();
    const navigate = useNavigate();

    // strict check for login path
    const isLogin = location.pathname === "/login";

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Forgot Password State
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [forgotStep, setForgotStep] = useState(1); // 1: email, 2: otp, 3: reset
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Handle token from URL (for Google OAuth callback)
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const token = query.get("token");
        if (token) {
            localStorage.setItem("token", token);
            navigate("/explore");
        }
    }, [location, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_API_BASE_URL}/google`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL;
            const url = isLogin ? `${apiBase}/login` : `${apiBase}/signup`;
            const payload = isLogin
                ? { email: formData.email, password: formData.password }
                : { name: formData.name, email: formData.email, password: formData.password };

            const response = await axios.post(url, payload);

            if (response.data.success) {
                if (isLogin) {
                    localStorage.setItem("token", response.data.token);
                    navigate("/explore"); // Redirect to Explore after login
                } else {
                    alert("Account created successfully!");
                    navigate("/explore");
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.post(`${apiBase}/send-otp`, { email: formData.email });
            if (response.data.success) {
                setForgotStep(2);
                setSuccessMessage("OTP sent to your email.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send OTP.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.post(`${apiBase}/verify-otp`, { email: formData.email, otp });
            if (response.data.success) {
                setForgotStep(3);
                setSuccessMessage("OTP verified. Enter your new password.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Invalid OTP.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.post(`${apiBase}/reset-password`, {
                email: formData.email,
                otp,
                newPassword
            });
            if (response.data.success) {
                alert("Password reset successfully! You can now login.");
                setIsForgotPassword(false);
                setForgotStep(1);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to reset password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
            style={{ backgroundImage: `url(${heroImg})` }}
        >
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-10 bg-white/10 backdrop-blur-md p-8 rounded-2xl w-full max-w-md shadow-2xl border border-white/20">
                <h2 className="text-3xl font-bold text-white text-center mb-6">
                    {isForgotPassword ? "Reset Password" : (isLogin ? "Welcome Back" : "Create Account")}
                </h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {successMessage && <p className="text-green-400 text-center mb-4">{successMessage}</p>}

                {!isForgotPassword ? (
                    <>
                        <div className="mb-6">
                            <button
                                onClick={handleGoogleLogin}
                                className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg"
                            >
                                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                                Continue with Google
                            </button>
                        </div>

                        <div className="flex items-center my-4 text-gray-400">
                            <hr className="flex-1 border-gray-600" />
                            <span className="px-3 text-sm">OR</span>
                            <hr className="flex-1 border-gray-600" />
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {!isLogin && (
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                    className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    required
                                />
                            )}

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />

                            {isLogin && (
                                <div className="text-right">
                                    <button
                                        type="button"
                                        onClick={() => setIsForgotPassword(true)}
                                        className="text-sm text-orange-400 hover:text-orange-300"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-orange-500 py-3 rounded-lg text-white font-bold hover:bg-orange-600 transition disabled:opacity-50"
                            >
                                {loading ? "Please wait..." : (isLogin ? "Login" : "Sign Up")}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="space-y-4">
                        {forgotStep === 1 && (
                            <form onSubmit={handleSendOtp} className="space-y-4">
                                <p className="text-gray-300 text-sm text-center">Enter your email to receive a 6-digit OTP code.</p>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-orange-500 py-3 rounded-lg text-white font-bold hover:bg-orange-600 transition disabled:opacity-50"
                                >
                                    {loading ? "Sending..." : "Send OTP"}
                                </button>
                            </form>
                        )}

                        {forgotStep === 2 && (
                            <form onSubmit={handleVerifyOtp} className="space-y-4">
                                <p className="text-gray-300 text-sm text-center">Enter the 6-digit code sent to {formData.email}</p>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="6-digit OTP"
                                    className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500 text-center tracking-widest font-bold"
                                    required
                                    maxLength={6}
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-orange-500 py-3 rounded-lg text-white font-bold hover:bg-orange-600 transition disabled:opacity-50"
                                >
                                    {loading ? "Verifying..." : "Verify OTP"}
                                </button>
                            </form>
                        )}

                        {forgotStep === 3 && (
                            <form onSubmit={handleResetPassword} className="space-y-4">
                                <p className="text-gray-300 text-sm text-center">Establish your new secure password.</p>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="New Password"
                                    className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-orange-500 py-3 rounded-lg text-white font-bold hover:bg-orange-600 transition disabled:opacity-50"
                                >
                                    {loading ? "Resetting..." : "Reset Password"}
                                </button>
                            </form>
                        )}

                        <button
                            type="button"
                            onClick={() => {
                                setIsForgotPassword(false);
                                setForgotStep(1);
                                setError("");
                                setSuccessMessage("");
                            }}
                            className="w-full text-center text-sm text-gray-400 hover:text-white mt-4"
                        >
                            Back to Login
                        </button>
                    </div>
                )}

                <div className="mt-6 text-center text-gray-300">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                        type="button"
                        onClick={() => navigate(isLogin ? "/signup" : "/login")}
                        className="text-orange-400 ml-2 hover:text-orange-300 font-semibold"
                    >
                        {isLogin ? "Sign Up" : "Login"}
                    </button>
                </div>
            </div>
        </div>
    );
}
