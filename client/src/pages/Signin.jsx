import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import Signinimg from "../assets/Signin.png";
import { LoginService } from '../services/auth.services';
import { useNavigate, useLocation } from 'react-router-dom';
import {toast} from "react-toastify"

const Signin = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const redirectTo = location.state?.from || "/userhome";

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle sign in logic here
        try {
            setLoading(true)
            const res = await LoginService(formData);
            if (res.user) {
                toast.success("Logged in")
                localStorage.setItem("User", JSON.stringify(res.user._id));
                navigate(redirectTo, { replace: true });
            }
        } catch (err) {
            
            const message = err.response?.data?.message;
            const status = err.response?.status;

            if(status === 401){
                toast.error("User Not Found !")
            }

            else if(status === 400){
                toast.error("Invalid Credentials !")
            }
            else{
                toast.error(message||"Login fail")
            }
            console.log("Error :", err);
            
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
            style={{
                backgroundImage: `url(${Signinimg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >


            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full space-y-8 rounded-2xl shadow-2xl p-8 z-10 bg-white/10 backdrop-blur-lg border border-white/20"
            >
                {/* Header */}
                <div className="text-center">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl font-bold text-white mb-2"
                    >
                        Sign in
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-white"
                    >
                        Don't have an account?{' '}
                        <a
                            href="/signup"
                            className="font-semibold text-[#326B0F] hover:text-green-700 transition-colors"
                        >
                            Create Account
                        </a>
                    </motion.p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-white text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#326B0F] focus:border-[#326B0F] transition-colors"
                            placeholder="Enter your email"
                        />
                    </motion.div>

                    {/* Password Field */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="password" className="block text-sm font-medium text-white">
                                Password
                            </label>
                            <a
                                href="/forgot-password"
                                className="text-sm text-[#326B0F] hover:text-green-700 font-medium transition-colors"
                            >
                                Forgot Password?
                            </a>
                        </div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-white text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#326B0F] focus:border-[#326B0F] transition-colors"
                            placeholder="Enter your password"
                        />
                    </motion.div>

                    {/* Sign In Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={!loading ? { scale: 1.02 } : {}}
                            whileTap={!loading ? { scale: 0.98 } : {}}
                            className={`group relative w-full flex justify-center items-center gap-2 py-3 px-4 text-sm font-semibold rounded-lg text-white bg-[#326B0F] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#326B0F] transition-colors${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                        >
                            {loading && (
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            )}
                            {loading ? "Signing in..." : "Sign in"}
                        </motion.button>

                    </motion.div>

                    {/* Divider */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="relative my-6"
                    >
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">or</span>
                        </div>
                    </motion.div>

                    {/* Social Sign In */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex justify-center space-x-4"
                    >
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 rounded-full border border-white hover:border-gray-400 transition-colors"
                        >
                            <FaGoogle className="w-5 h-5 text-white" />
                        </motion.button>
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 rounded-full border border-white hover:border-gray-400 transition-colors"
                        >
                            <FaFacebook className="w-5 h-5 text-white" />
                        </motion.button>
                    </motion.div>
                </form>
            </motion.div>
        </div>
    );
};

export default Signin;