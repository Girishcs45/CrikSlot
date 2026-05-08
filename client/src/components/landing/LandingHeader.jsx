import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FaBaseballBall, // Replace FaCricket with this
    FaSignInAlt,
} from 'react-icons/fa';

function LandingHeader() {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/signin');
    };
    return (
        <motion.header
            className="px-6 py-4 md:px-12 md:py-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Use BaseballBall as cricket alternative */}
                        <FaBaseballBall className="text-3xl md:text-4xl text-[#4CAF50]" />
                        {/* OR if you install react-icons/md: <MdSportsCricket className="text-3xl md:text-4xl text-[#4CAF50]" /> */}
                    </motion.div>
                    <motion.h1
                        className="text-2xl md:text-3xl font-bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Crick<span className="text-[#4CAF50]">Slot</span>
                    </motion.h1>
                </div>
            </div>
        </motion.header>
    )
}

export default LandingHeader