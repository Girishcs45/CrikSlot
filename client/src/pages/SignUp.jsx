import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import Signinimg from "../assets/Signin.png";
import { SignupService } from '../services/auth.services';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    const navigate =  useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setLoading(true);
            const res = await SignupService(formData);
            
            if(res.success){
                console.log(res);
                toast.success("Sign up Successfully")
                localStorage.setItem("User", JSON.stringify(res.user._id));
                navigate("/userhome");
            }

        }catch(error){
            console.log("Error :",error);
        }
        finally{
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
                        Create Account
                    </motion.h2>
                     <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text- font-medium text-white mb-2"
                    >
                        As Player
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-white"
                    >
                        Already have an account?{' '}
                        <a
                            href="/signin"
                            className="font-semibold text-[#326B0F] hover:text-green-700 transition-colors"
                        >
                            Sign In
                        </a>
                    </motion.p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-white text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#326B0F] focus:border-[#326B0F] transition-colors"
                            placeholder="Enter your full name"
                        />
                    </motion.div>

                    {/* Email Field */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.45 }}
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
                        <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                            Password
                        </label>
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

                    {/* Confirm Password Field */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.55 }}
                    >
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-white text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#326B0F] focus:border-[#326B0F] transition-colors"
                            placeholder="Confirm your password"
                        />
                    </motion.div>

                    {/* Sign Up Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-[#275909] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#326B0F] transition-colors"
                        >
                            {loading ? "Creating account" : "Create account"}
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

                    {/* Social Sign Up */}
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

export default SignUp;