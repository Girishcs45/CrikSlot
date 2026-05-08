import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { HiCalendar, HiClock, HiChevronRight } from "react-icons/hi";
import { FetchOneTurf } from "../services/turf.services";
import { Button } from "../components/common/Button";
import { toast } from "react-toastify";
import { FaHourglass } from "react-icons/fa";
import { BookingSlots } from "../services/booking.services";
import BookingSuccessModal from "./BookingSuccessModal";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [turf, setTurf] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  // Get booking details from location state or default values
  useEffect(() => {
    const getTurf = async () => {
      try {
        const res = await FetchOneTurf(id);
        setTurf(res?.turf);
      } catch (err) {
        console.log(err.response?.data?.message);
      }
    };

    getTurf();

    // booking details from TurfView
    if (location.state) {
      setSelectedDate(location.state.selectedDate);
      setSelectedTime(location.state.selectedSlots);
    }
  }, [id, location.state]);

  useEffect(() => {
    if (!location.state) {
      navigate(`/turfview/${id}`, { replace: true });
    }

    const user = localStorage.getItem("User");

    if (!user) {
      toast.error("Please login to continue booking");
      navigate("/Signin", {
        replace: true,
        state: { from: location.pathname },
      });
    }
  }, [navigate]);

  // In your payment page component
  const getStartAndEndTime = (selectedSlots) => {
    if (!selectedSlots || selectedSlots.length === 0) {
      return { startTime: "", endTime: "", duration: 0 };
    }

    // Sort slots by time
    const sortedSlots = [...selectedSlots].sort();
    const firstSlot = sortedSlots[0];
    const startTime = firstSlot.split(" - ")[0].trim();
    const lastSlot = sortedSlots[sortedSlots.length - 1];
    const endTime = lastSlot.split(" - ")[1]?.trim() || "";

    return {
      startTime,
      endTime,
      duration: selectedSlots.length,
    };
  };
  // Usage in your component
  const { startTime, endTime, duration } = getStartAndEndTime(selectedTime);

  const handlePayment = async () => {
    if (!location.state) {
      toast.error("Booking data missing. Please select slots again.");
      navigate(`/turfview/${id}`);
      return;
    }

    const totalPrice = location.state?.totalPrice || 0;

    const formData = {
      turf_Id: id,
      userId: JSON.parse(localStorage.getItem("User")),
      date: selectedDate,
      slots: selectedTime,
      amount: totalPrice,
    };

    try {
      const res = await BookingSlots(formData);

      if (res.success) {
        setBookingData(res.booking);
        setShowSuccess(true); // 👈 open modal
      } else {
        toast.error(res.message || "Booking failed");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error creating booking");
    }
  };

  if (!turf) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Complete Your Booking
              </h1>
              <p className="text-gray-600">
                Review your booking details and proceed to payment
              </p>
            </motion.div>

            {/* Booking Summary */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Booking Summary
              </h2>

              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={turf.image}
                  alt={turf.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {turf.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{turf.location}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center text-gray-600">
                      <HiCalendar className="mr-2" />
                      <span className="text-sm">{selectedDate}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <HiClock className="mr-2" />
                      <span className="text-sm">
                        {startTime} to {endTime}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaHourglass className="mr-2" />
                      <span className="text-sm">{duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Turf Booking (1 hour)</span>
                  <span className="font-semibold">
                    ₹{location.state.totalPrice / location.state.totalHours}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-lg font-bold text-gray-900">
                    Total Amount
                  </span>
                  <span className="text-lg font-bold text-green-600">
                    ₹{location.state.totalPrice}
                  </span>
                </div>
              </div>
            </motion.section>

            {/* Payment Method */}
            <div className="flex justify-center">
              <Button onClick={handlePayment}>
                Procced to pay ₹{location.state.totalPrice}
              </Button>
            </div>
            {/* Rules Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Rules to follow
              </h2>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">•</span>
                  <span>Arrive 15 mins prior to your booked time.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">•</span>
                  <span>
                    Start up at the start of your slot. Once your time is up,
                    you have to vacate the turf for the next team.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">•</span>
                  <span>
                    Secure your belongings safely. We are not responsible for
                    your losses.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">•</span>
                  <span>
                    Smoking and alcohol is strictly prohibited on the premises
                    of the turf.
                  </span>
                </li>
              </ul>
            </motion.section>
          </div>

          {/* Right Column - Tournament Ads */}
          <div className="space-y-6">
            {/* Exclusive Offer Banner */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white"
            >
              <h2 className="text-xl font-bold mb-2">EXCLUSIVE OFFER</h2>
              <p className="text-lg font-semibold mb-3">
                TURF'S UP TOURNAMENTS
              </p>
              <p className="text-sm opacity-90">
                Join our weekly tournaments and win exciting prizes!
              </p>
              <button className="mt-4 bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors">
                Learn More
              </button>
            </motion.section>

            {/* Football Tournament */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  FOOTBALL TOURNAMENT
                </h3>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                  UPCOMING
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-semibold">25th Nov 2025</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-semibold">4:00 PM - 8:00 PM</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Entry Fee:</span>
                  <span className="font-semibold text-green-600">
                    ₹2000/team
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Prize Pool:</span>
                  <span className="font-semibold">₹15,000</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg font-semibold text-sm hover:bg-green-700 transition-colors flex items-center justify-center">
                Register Now <HiChevronRight className="ml-1" />
              </button>
            </motion.section>

            {/* Basketball Tournament */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  BASKETBALL TOURNAMENT
                </h3>
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-semibold">
                  NEW
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-semibold">28th Nov 2025</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-semibold">5:00 PM - 9:00 PM</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Entry Fee:</span>
                  <span className="font-semibold text-green-600">
                    ₹1500/team
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Prize Pool:</span>
                  <span className="font-semibold">₹10,000</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-orange-600 text-white py-2 rounded-lg font-semibold text-sm hover:bg-orange-700 transition-colors flex items-center justify-center">
                Register Now <HiChevronRight className="ml-1" />
              </button>
            </motion.section>

            {/* Second Football Tournament */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  FOOTBALL TOURNAMENT
                </h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">
                  WEEKLY
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Every:</span>
                  <span className="font-semibold">Saturday</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-semibold">6:00 PM - 10:00 PM</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Entry Fee:</span>
                  <span className="font-semibold text-green-600">
                    ₹1800/team
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Prize Pool:</span>
                  <span className="font-semibold">₹12,000</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center">
                Register Now <HiChevronRight className="ml-1" />
              </button>
            </motion.section>
          </div>
        </div>
      </div>
      <BookingSuccessModal
        open={showSuccess}
        booking={bookingData}
        turfName={turf.name}
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
};

export default Payment;
