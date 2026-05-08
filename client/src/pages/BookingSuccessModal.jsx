import { HiCheckCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

BookingSuccessModal.propTypes = {
  open: PropTypes.bool.isRequired,
  turfName: PropTypes.string,
  booking: PropTypes.shape({
    bookingDate: PropTypes.string,
    bookedSlots: PropTypes.arrayOf(PropTypes.string),
    totalAmount: PropTypes.number,
    _id: PropTypes.string,
  }),
};

export default function BookingSuccessModal({ open, booking, turfName }) {
  const navigate = useNavigate();

  if (!open || !booking) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl p-6 w-[95%] max-w-md shadow-xl">

        <div className="text-center">
          <HiCheckCircle className="text-green-600 text-6xl mx-auto mb-3" />

          <h2 className="text-xl font-bold">Booking Confirmed</h2>
          <p className="text-gray-500 text-sm mb-4">
            Your slots are successfully reserved
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-1">
          <p><b>Turf:</b> {turfName}</p>
          <p><b>Date:</b> {booking.bookingDate}</p>
          <p><b>Slots:</b> {booking.bookedSlots?.join(", ")}</p>
          <p><b>Total:</b> ₹{booking.totalAmount}</p>
          <p className="text-xs text-gray-400">ID: {booking._id}</p>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={() => navigate("/my-bookings")}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg"
          >
            My Bookings
          </button>

          <button
            onClick={() => navigate("/userhome")}
            className="flex-1 border py-2 rounded-lg"          >
            Home
          </button>


        </div>
      </div>
    </div>
  );
}
