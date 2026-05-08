import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ChoosingRole from './ChoosingRole';
import {
    FaSignInAlt
} from 'react-icons/fa';


export default function Welcoming() {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    };
    return (
        <motion.main
            className="px-6 md:px-12 py-6 md:py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
        >
            <div className="max-w-7xl mx-auto">
                {/* Hero Text */}
                <div className="text-center mb-12 md:mb-6">
                    <motion.h2
                        className="text-4xl md:text-6xl font-bold mb-4 md:mb-6"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        Welcome to <span className="text-[#4CAF50]">CrickSlot</span>
                    </motion.h2>

                    <motion.p
                        className="text-xl md:text-2xl text-[#FFD700] italic mb-6"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                    >
                        "Fuel Your Passion. Own the Pitch."
                    </motion.p>
                </div>

                {/* Role Selection */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                >
                    <div className="text-center mb-10">
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">Choose Your Experience</h3>
                        <p className="text-gray-400">Select how you want to use CrickSlot</p>
                    </div>

                    <ChoosingRole />
                </motion.div>

                {/* Login Prompt */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                >
                    <p className="text-gray-400 mb-4">Already have an account?</p>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <button
                            onClick={handleLogin}
                            className="inline-flex items-center gap-2 bg-linear-to-r from-[#4CAF50] to-green-600 hover:from-green-600 hover:to-[#4CAF50] px-8 py-3 rounded-lg text-white transition-all duration-300"
                        >
                            <FaSignInAlt /> Sign In to Continue
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </motion.main>
    )
}
