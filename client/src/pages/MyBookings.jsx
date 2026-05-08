import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HiCalendar, HiClock, HiCurrencyRupee } from "react-icons/hi";
import { toast } from "react-toastify";
import { FetchUserBookings } from "../services/booking.services";

export default function MyBookings() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const userId = JSON.parse(localStorage.getItem("User"));

    useEffect(() => {
        if (!userId) {
            navigate("/signin");
            return;
        }

        const getBookings = async () => {
            try {
                const res = await FetchUserBookings(userId);
                setBookings(res.bookings || []);
            } catch (err) {
                console.error("Failed to load bookings:", err);
                toast.error("Failed to load bookings");
            } finally {
                setLoading(false);
            }
        };

        getBookings();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Loading bookings...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">

            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <h1 className="text-2xl font-bold mb-6 text-gray-900">
                    My Bookings
                </h1>

                {bookings.length === 0 && (
                    <div className="bg-white rounded-xl p-10 text-center shadow">
                        <p className="text-gray-500">No bookings yet</p>
                    </div>
                )}

                {/* Booking Cards */}
                <div className="space-y-4">
                    {bookings.map((booking, index) => (
                        <motion.div
                            key={booking._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4"
                        >
                            {/* LEFT → Turf Image */}
                            <img
                                src={booking.turf?.image?.[0] || "/placeholder.jpg"}
                                alt={booking.turf?.name}
                                className="w-24 h-24 rounded-xl object-cover"
                            />

                            {/* MIDDLE → Info */}
                            <div className="flex-1 space-y-2">

                                <h2 className="font-semibold text-lg">
                                    {booking.turf?.name}
                                </h2>

                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">

                                    <span className="flex items-center gap-1">
                                        <HiCalendar />
                                        {booking.bookingDate}
                                    </span>

                                    <span className="flex items-center gap-1">
                                        <HiClock />
                                        {booking.bookedSlots.join(", ")}
                                    </span>

                                    <span className="flex items-center gap-1 font-semibold text-green-600">
                                        <HiCurrencyRupee />
                                        {booking.totalAmount}
                                    </span>
                                </div>

                                <p className="text-xs text-gray-400">
                                    ID: {booking._id}
                                </p>
                            </div>
                        </motion.div>

                    ))}
                </div>
            </div>
        </div>
    );
}
