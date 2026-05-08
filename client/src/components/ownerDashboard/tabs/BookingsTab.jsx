// components/ownerDashboard/tabs/BookingsTab.jsx

import React, { useEffect, useState } from "react";
import { GetAllBookings } from "../../../services/owner.services";

const BookingsTab = () => {
  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);

        const ownerId = JSON.parse(localStorage.getItem("Owner"));
        if (!ownerId) return;

        const data = await GetAllBookings(ownerId);

        setBookings(data.bookings);
        setFiltered(data.bookings);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

 
  useEffect(() => {
    if (!selectedDate) {
      setFiltered(bookings);
      return;
    }

    const dateObj = new Date(selectedDate);

    const formatted = dateObj.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    }); // → "3 Feb"

    const result = bookings.filter(
      (b) => b.bookingDate === formatted
    );

    setFiltered(result);
  }, [selectedDate, bookings]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg min-h-[400px]">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Bookings Management</h2>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded-lg px-4 py-2"
        />
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500 py-8">
          Loading bookings...
        </p>
      )}

      {/* No bookings */}
      {!loading && filtered.length === 0 && (
        <p className="text-center text-gray-400 py-8">
          No bookings found
        </p>
      )}

      {/* Booking list */}
      {!loading && filtered.length > 0 && (
        <div className="space-y-5">
          {filtered.map((b) => (
            <div
              key={b._id}
              className="bg-white border rounded-2xl p-5 flex justify-between items-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              {/* Left */}
              <div className="space-y-2">

                <h3 className="text-lg font-semibold text-gray-800">
                  {b.turf?.name || "Turf"}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">

                  <span>
                    👤 {b.user?.name || "User"}
                  </span>

                  <span>
                    📅 {b.bookingDate}
                  </span>

                </div>

                {/* Slots badges */}
                {b.bookedSlots && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {b.bookedSlots.map((slot, i) => (
                      <span
                        key={i}
                        className="bg-green-50 text-gray-600 text-xs px-3 py-1 rounded-full font-medium"
                      >
                        {slot}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right */}
              <div className="text-right">
                <p className="text-xs text-gray-400 mb-1">Amount</p>
                <p className="text-2xl font-bold text-green-600">
                  ₹{b.totalAmount}
                </p>
              </div>
            </div>
          ))}
        </div>

      )}
    </div>
  );
};

export default BookingsTab;
