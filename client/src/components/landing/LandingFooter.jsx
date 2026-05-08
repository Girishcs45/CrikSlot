import { motion } from 'framer-motion';

function LandingFooter() {
    return (
        <motion.footer
            className="mt-16 py-6 border-t border-gray-800 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400">© {new Date().getFullYear()} CrickSlot. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <a href="mailto:crickslot@gmail.com" className="text-gray-400 hover:text-[#4CAF50] transition-colors">
                            crickslot@gmail.com
                        </a>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-400">+91 9876543210</span>
                    </div>
                </div>
            </div>
        </motion.footer>
    )
}

export default LandingFooter