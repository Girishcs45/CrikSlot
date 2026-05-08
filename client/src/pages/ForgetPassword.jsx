import { useState } from 'react';
import { motion } from 'framer-motion';
import Signinimg from "../assets/Signin.png";

const ForgetPassword = () => {
    const [formData, setFormData] = useState({
        email: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle forgot password logic here
        console.log('Forgot password request:', formData);
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
                        Forgot Password
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-white text-sm"
                    >
                        Enter your email address and we'll send you a link to reset your password.
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
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-white text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#326B0F] focus:border-[#326B0F] transition-colors"
                            placeholder="Enter your email address"
                        />
                    </motion.div>

                    {/* Reset Password Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-[#326B0F] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#326B0F] transition-colors"
                        >
                            Send Reset Link
                        </motion.button>
                    </motion.div>

                    {/* Back to Sign In */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-center"
                    >
                        <a
                            href="/signin"
                            className="font-medium text-[#d2dccc] hover:text-green-700 transition-colors"
                        >
                            ← Back to Sign In
                        </a>
                    </motion.div>
                </form>
            </motion.div>
        </div>
    );
};

export default ForgetPassword;