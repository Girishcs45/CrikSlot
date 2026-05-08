import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FaBaseballBall, // Replace FaCricket with this
    FaStore,
    FaArrowRight,
    FaTrophy,
    FaCalendarCheck,
    FaChartLine,
    FaMoneyBillWave,
    FaUsers,
    FaStar
} from 'react-icons/fa';

export default function ChoosingRole() {
    const navigate = useNavigate();


 const handleRoleSelect = (role) => {
        if (role === 'user') {
            navigate('/userhome');
        } else if (role === 'owner') {
            navigate('/ownerSignup');
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 justify-center items-stretch">
            {/* User Card */}
            <motion.div
                className="flex-1 max-w-lg"
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.98 }}
            >
                <button
                    className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl p-6 md:p-8 h-full border border-gray-700 hover:border-[#4CAF50] transition-all duration-300 cursor-pointer group w-full text-left"
                    onClick={() => handleRoleSelect('user')}
                >
                    <div className="flex flex-col h-full">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-[#4CAF50] rounded-xl group-hover:scale-110 transition-transform duration-300">
                                <FaBaseballBall className="text-2xl" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold">Player / User</h3>
                        </div>

                        <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-6"></div>

                        <ul className="space-y-3 mb-8 flex-grow">
                            {[
                                { icon: <FaCalendarCheck />, text: "Find & book cricket turfs" },
                                { icon: <FaTrophy />, text: "Join tournaments & events" },
                                { icon: <FaStar />, text: "Earn rewards points" },
                                { icon: <FaUsers />, text: "Manage your bookings" }
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-center gap-3 text-gray-300"
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                >
                                    <span className="text-[#4CAF50]">{item.icon}</span>
                                    <span>{item.text}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <div className="w-full bg-transparent border border-gray-600 text-white py-3 rounded-lg group-hover:bg-[#4CAF50] group-hover:text-white group-hover:border-[#4CAF50] transition-all duration-300">
                            <span className="flex items-center justify-center gap-2">
                                Book & Play <FaArrowRight />
                            </span>
                        </div>
                    </div>
                </button>
            </motion.div>

            {/* Owner Card */}
            <motion.div
                className="flex-1 max-w-lg"
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.98 }}
            >
                <button
                    className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl p-6 md:p-8 h-full border border-gray-700 hover:border-[#FFD700] transition-all duration-300 cursor-pointer group w-full"
                    onClick={() => handleRoleSelect('owner')}
                >
                    <div className="flex flex-col h-full">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-[#FFD700] rounded-xl group-hover:scale-110 transition-transform duration-300">
                                <FaStore className="text-2xl text-gray-900" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold">Turf Owner / Business</h3>
                        </div>

                        <div className="h-px bg-linear-to-r from-transparent via-gray-600 to-transparent mb-6"></div>

                        <ul className="space-y-3 mb-8 grow">
                            {[
                                { icon: <FaStore />, text: "List your cricket turfs" },
                                { icon: <FaCalendarCheck />, text: "Manage bookings & schedule" },
                                { icon: <FaMoneyBillWave />, text: "Handle payments securely" },
                                { icon: <FaChartLine />, text: "Access business analytics" }
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-center gap-3 text-gray-300"
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                >
                                    <span className="text-[#FFD700]">{item.icon}</span>
                                    <span>{item.text}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <div className="w-full bg-[#FFD700] text-gray-900 py-3 rounded-lg hover:bg-yellow-500 transition-all duration-300">
                            <span className="flex items-center justify-center gap-2">
                                List Your Turf <FaArrowRight />
                            </span>
                        </div>
                    </div>
                </button>
            </motion.div>
        </div>
    )
}
