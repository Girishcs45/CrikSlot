import React from 'react'
import { HiUser, HiMail, HiPhone, HiCalendar, HiLocationMarker, HiStar, HiTicket, HiClock, HiCheck, HiPencil, HiLogout, HiCamera, HiUserGroup, HiCurrencyRupee, HiShieldCheck, HiCog, HiBookmark, HiTrash } from 'react-icons/hi';


export default function ProfileActivities() {
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
            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.darkGreen }}>Recent Activity</h3>
            <div className="space-y-4">
                {[
                    { type: 'booking', text: 'Booked Battle Ground Turf', time: '2 hours ago', icon: '✓', color: 'green' },
                    { type: 'points', text: 'Earned 50 loyalty points', time: 'Yesterday', icon: '⭐', color: 'yellow' },
                    { type: 'team', text: 'Joined Mumbai Strikers', time: '3 days ago', icon: '👥', color: 'blue' },
                    { type: 'achievement', text: 'Unlocked Power Hitter badge', time: '1 week ago', icon: '🏆', color: 'purple' },
                ].map((activity, index) => {
                    const getActivityColorClass = () => {
                        if (activity.color === 'green') return 'bg-green-500';
                        if (activity.color === 'yellow') return 'bg-yellow-500';
                        if (activity.color === 'blue') return 'bg-blue-500';
                        return 'bg-purple-500';
                    };

                    return (
                        <div key={index} className="flex items-start group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-white text-sm font-bold ${getActivityColorClass()}`}>
                                {activity.icon}
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-sm">{activity.text}</div>
                                <div className="text-xs" style={{ color: colors.gray600 }}>{activity.time}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
