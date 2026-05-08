import React from 'react'
import { HiUser, HiMail, HiPhone, HiCalendar, HiLocationMarker, HiStar, HiTicket, HiClock, HiCheck, HiPencil, HiLogout, HiCamera, HiUserGroup, HiCurrencyRupee, HiShieldCheck, HiCog, HiBookmark, HiTrash } from 'react-icons/hi';


export default function ProfileQuickAction() {
     const colors = {
        primaryGreen: '#1DB954',
        darkGreen: '#0A5C36',
        lightGreen: '#ECF9E3',
        white: '#FFFFFF',
        black: '#1A1A1A',
        gray800: '#1F2937',
        gray600: '#4B5563',
        gray400: '#9CA3AF',
        gray100: '#F3F4F6',
        blue: '#3B82F6',
        red: '#EF4444',
        yellow: '#FBBF24'
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.darkGreen }}>Quick Actions</h3>
            <div className="space-y-3">
                <button className="w-full flex items-center p-3.5 rounded-lg hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5" style={{ backgroundColor: colors.lightGreen }}>
                    <div className="w-10 h-10 rounded-lg mr-3 flex items-center justify-center" style={{ backgroundColor: colors.white }}>
                        <HiCalendar className="w-5 h-5" style={{ color: colors.primaryGreen }} />
                    </div>
                    <span className="font-medium" style={{ color: colors.darkGreen }}>Book New Turf</span>
                </button>

                <button className="w-full flex items-center p-3.5 rounded-lg hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5" style={{ backgroundColor: colors.lightGreen }}>
                    <div className="w-10 h-10 rounded-lg mr-3 flex items-center justify-center" style={{ backgroundColor: colors.white }}>
                        <HiBookmark className="w-5 h-5" style={{ color: colors.primaryGreen }} />
                    </div>
                    <span className="font-medium" style={{ color: colors.darkGreen }}>Saved Turfs</span>
                </button>

                <button className="w-full flex items-center p-3.5 rounded-lg hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5" style={{ backgroundColor: colors.lightGreen }}>
                    <div className="w-10 h-10 rounded-lg mr-3 flex items-center justify-center" style={{ backgroundColor: colors.white }}>
                        <HiStar className="w-5 h-5" style={{ color: colors.primaryGreen }} />
                    </div>
                    <span className="font-medium" style={{ color: colors.darkGreen }}>Redeem Points</span>
                </button>
            </div>
        </div>
    )
}
