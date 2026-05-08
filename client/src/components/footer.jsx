import React from "react";
import { FaFacebook, FaPhone, FaTwitter } from "react-icons/fa";
import { RiFeedbackFill, RiInstagramFill, RiMailFill } from "react-icons/ri";


const Footer = () => {
    return (
        <div className="px-4 py-6 text-white bg-[#224a08]">
            {/* Main container */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                {/* Logo / Brand */}
                <div className="flex flex-col items-center sm:items-center p-4 sm:ms-10 text-white">
                    <h2 className="text-5xl font-bold mb-3">CrickSlot</h2>
                    <div className="flex mt-2 gap-3">
                        <a href="#" className="hover:opacity-80 transition-opacity">
                            <RiInstagramFill size={28} />
                        </a>
                        <a href="#" className="hover:opacity-80 transition-opacity">
                            <FaFacebook size={28} />
                        </a>
                        <a href="#" className="hover:opacity-80 transition-opacity">
                            <FaTwitter size={28} />
                        </a>
                    </div>
                </div>

                {/* Links Section */}
                <div className="flex flex-col sm:flex-row w-full sm:w-[70%] justify-around gap-8 sm:m-6 text-center sm:text-left">
                    {/* Left Column - Services */}
                    <div className="flex flex-col space-y-3">
                        <h1 className="text-2xl font-semibold">Our Services</h1>
                        <a href="/" className="hover:text-gray-200 transition-colors">
                            Home
                        </a>
                        <a href="/book" className="hover:text-gray-200 transition-colors">
                            Book Turf
                        </a>
                        <a href="/about" className="hover:text-gray-200 transition-colors">
                            Tournaments
                        </a>
                    </div>

                    {/* Middle Column - Support */}
                    <div className="flex flex-col space-y-3">
                        <h1 className="text-2xl font-semibold">Support</h1>
                        <a href="/" className="hover:text-gray-200 transition-colors">
                            About Us
                        </a>
                        <a href="/book" className="hover:text-gray-200 transition-colors">
                            FAQ
                        </a>
                        <a href="/about" className="hover:text-gray-200 transition-colors">
                            Terms & Conditions
                        </a>
                    </div>

                    {/* Right Column - Contact */}
                    <div className="flex flex-col space-y-3">
                        <h1 className="text-2xl font-semibold">Contact</h1>
                        <a
                            href="mailto:crickslot@gmail.com"
                            className="flex items-center justify-center sm:justify-start gap-2 hover:text-gray-200 transition-colors"
                        >
                            <RiMailFill size={24} /> crickslot@gmail.com
                        </a>
                        <a
                            href="tel:+919876543210"
                            className="flex items-center justify-center sm:justify-start gap-2 hover:text-gray-200 transition-colors"
                        >
                            <FaPhone size={18} /> +91 9876543210
                        </a>
                        <a href="/feedback" className="flex items-center justify-center sm:justify-start gap-2 hover:text-gray-200 transition-colors"
                        >
                            <RiFeedbackFill /> Feedback
                        </a>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <hr className="border-t border-white opacity-30 my-6" />

            {/* Footer Bottom */}
            <div className="w-full flex justify-center">
                <p className="text-center text-sm opacity-80">
                    © 2025 CrickSlot. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Footer;
