import React from 'react'
import { HiUser, HiMail, HiPhone, HiCalendar, HiLocationMarker, HiStar, HiTicket, HiClock, HiCheck, HiPencil, HiLogout, HiCamera, HiUserGroup, HiCurrencyRupee, HiShieldCheck, HiCog, HiBookmark, HiTrash } from 'react-icons/hi';


export default function ProfileMyBooking() {

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

    const userData = {
        upcomingBookings: [
            {
                id: 1,
                turfName: "Battle Ground Turf",
                date: "2024-03-15",
                timeSlot: "6:00 PM - 8:00 PM",
                bookingId: "BG789456"
            },
            {
                id: 2,
                turfName: "Victory Arena",
                date: "2024-03-18",
                timeSlot: "4:00 PM - 6:00 PM",
                bookingId: "VA123789"
            }
        ],
        bookingHistory: [
            {
                id: 1,
                turfName: "Champions Turf",
                date: "2024-02-20",
                timeSlot: "8:00 PM - 10:00 PM",
                amount: 1200,
                status: "completed"
            },
            {
                id: 2,
                turfName: "Elite Cricket Ground",
                date: "2024-02-15",
                timeSlot: "6:00 PM - 8:00 PM",
                amount: 1500,
                status: "completed"
            },
            {
                id: 3,
                turfName: "Pro Arena",
                date: "2024-02-10",
                timeSlot: "4:00 PM - 6:00 PM",
                amount: 1100,
                status: "cancelled"
            }
        ]
    }
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold" style={{ color: colors.darkGreen }}>My Bookings</h2>
            </div>

            <div className="p-8">
                {/* Upcoming Bookings */}
                <div className="mb-10">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold" style={{ color: colors.darkGreen }}>Upcoming Bookings</h3>
                        <button className="text-sm font-medium hover:underline" style={{ color: colors.blue }}>
                            View All
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {userData.upcomingBookings.map(booking => (
                            <div key={booking.id} className="border rounded-xl p-5 hover:shadow-md transition-shadow" style={{ borderColor: colors.lightGreen }}>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="w-12 h-12 rounded-lg mb-3 flex items-center justify-center" style={{ backgroundColor: colors.lightGreen }}>
                                            <HiCalendar className="w-6 h-6" style={{ color: colors.darkGreen }} />
                                        </div>
                                        <h4 className="font-semibold text-lg">{booking.turfName}</h4>
                                    </div>
                                    <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: colors.lightGreen, color: colors.darkGreen }}>
                                        ID: {booking.bookingId}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <HiCalendar className="w-4 h-4 mr-2" style={{ color: colors.gray600 }} />
                                        <span className="text-sm" style={{ color: colors.gray800 }}>
                                            {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <HiClock className="w-4 h-4 mr-2" style={{ color: colors.gray600 }} />
                                        <span className="text-sm" style={{ color: colors.gray800 }}>{booking.timeSlot}</span>
                                    </div>
                                </div>

                                <div className="flex space-x-3 mt-6">
                                    <button className="flex-1 py-2.5 rounded-lg font-medium text-center text-white hover:opacity-90" style={{ backgroundColor: colors.darkGreen }}>
                                        View Details
                                    </button>
                                    <button className="flex-1 py-2.5 rounded-lg font-medium text-center border hover:bg-gray-50" style={{ borderColor: colors.red, color: colors.red }}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent History */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold" style={{ color: colors.darkGreen }}>Recent History</h3>
                        <button className="text-sm font-medium hover:underline" style={{ color: colors.blue }}>
                            View All
                        </button>
                    </div>

                    <div className="space-y-4">
                        {userData.bookingHistory.map(booking => (
                            <div key={booking.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-lg mr-4 flex items-center justify-center" style={{ backgroundColor: colors.lightGreen }}>
                                        {booking.status === 'completed' ? (
                                            <HiCheck className="w-5 h-5" style={{ color: colors.darkGreen }} />
                                        ) : (
                                            <HiTrash className="w-5 h-5" style={{ color: colors.red }} />
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-medium">{booking.turfName}</h4>
                                        <div className="flex items-center space-x-4 mt-1">
                                            <span className="text-sm flex items-center" style={{ color: colors.gray600 }}>
                                                <HiCalendar className="w-3 h-3 mr-1" />
                                                {new Date(booking.date).toLocaleDateString()}
                                            </span>
                                            <span className="text-sm flex items-center" style={{ color: colors.gray600 }}>
                                                <HiClock className="w-3 h-3 mr-1" />
                                                {booking.timeSlot}
                                            </span>
                                            <span className="text-sm flex items-center" style={{ color: colors.gray600 }}>
                                                <HiCurrencyRupee className="w-3 h-3 mr-1" />
                                                {booking.amount}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'completed'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                    }`}>
                                    {booking.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
