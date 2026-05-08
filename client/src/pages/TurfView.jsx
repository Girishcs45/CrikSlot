import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiStar,
  HiLocationMarker,
  HiPhone,
  HiMail,
  HiCalendar,
} from "react-icons/hi";
import {
  FaParking,
  FaRestroom,
  FaFirstAid,
  FaTshirt,
  FaWater,
} from "react-icons/fa";
import { FetchOneTurf } from "../services/turf.services";
import TimeSlotSelector from "../components/bookingProccess/TimeSlotSelector";

const TurfView = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [turf, setTurf] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Generate next 7 days
  const generateNext7Days = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const dayName = days[date.getDay()];
      const dayNumber = date.getDate();
      const monthName = months[date.getMonth()];

      dates.push({
        date: `${dayNumber} ${monthName}`,
        displayDate: `${dayName}, ${dayNumber} ${monthName}`,
        dateObj: date,
      });
    }

    return dates;
  };

  // Get hour from time slot
  const getStartHour24 = (timeRange) => {
    try {
      const startTime = timeRange.split("-")[0].trim();
      const [time, period] = startTime.split(" ");
      const [hourStr] = time.split(":");
      let hour = parseInt(hourStr);

      if (period === "PM" && hour !== 12) hour += 12;
      if (period === "AM" && hour === 12) hour = 0;

      return hour;
    } catch (error) {
      return 0;
    }
  };

  const [availableDates] = useState(generateNext7Days());

  // Initialize selected date to today
  useEffect(() => {
    const today = new Date();
    const todayFormatted = `${today.getDate()} ${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][today.getMonth()]}`;
    setSelectedDate(todayFormatted);
  }, []);

  // Fetch turf data
  useEffect(() => {
    const fetchTurf = async () => {
      try {
        setLoading(true);
        const res = await FetchOneTurf(id);
        setTurf(res?.turf);
      } catch (err) {
        console.error("Error fetching turf:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTurf();
  }, [id]);

  // Calculate rate for a slot
  const calculateRate = (date, time, rates) => {
    if (!rates) return 0;

    const dateObj = availableDates.find((d) => d.date === date)?.dateObj;
    if (!dateObj) return rates.standard || 0;

    const hour24 = getStartHour24(time);
    const dayOfWeek = dateObj.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isPeakHour = hour24 >= 18 && hour24 < 22;

    if (isWeekend) return rates.weekend || rates.standard || 0;
    if (isPeakHour) return rates.peakHour || rates.standard || 0;
    return rates.standard || 0;
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    return selectedSlots.reduce((total, slotTime) => {
      return total + calculateRate(selectedDate, slotTime, turf?.rates || {});
    }, 0);
  };

  // Handle booking
  const handleBooking = () => {
    if (!selectedDate || selectedSlots.length === 0) {
      alert("Please select date and time slots");
      return;
    }

    navigate(`/turfview/${id}/payment`, {
      state: {
        turfId: turf?._id,
        turfName: turf?.name,
        selectedDate,
        selectedSlots,
        totalPrice: calculateTotalPrice(),
        totalHours: selectedSlots.length,
      },
    });
  };

  // Default facilities
  const defaultFacilities = [
    { name: "Parking Area", icon: FaParking },
    { name: "Restrooms", icon: FaRestroom },
    { name: "First Aid", icon: FaFirstAid },
    { name: "Changing Rooms", icon: FaTshirt },
    { name: "Drinking Water", icon: FaWater },
  ];

  // Rules
  const rules = [
    "Arrive 15 mins prior to your booked time.",
    "Start up at the start of your slot.",
    "Full payment must be made before the start.",
    "Proper sports shoes are mandatory.",
    "Smoking and alcohol is strictly prohibited.",
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!turf) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Turf not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 overflow-hidden rounded-3xl shadow-lg">
          <img
            src={turf.images}
            // alt={turf.name}
            className="w-full h-[350px] object-cover"
          />
        </div>

        {/* Turf Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{turf.name}</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <HiStar className="text-yellow-400 text-xl mr-1" />
              <span className="text-lg font-semibold text-gray-800">
                {turf.rating || 4.5}
              </span>
              <span className="text-gray-600 ml-2">
                ({turf.totalBookings || 0} bookings)
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <HiCalendar className="mr-2" />
              <span>
                Open: {turf.openingTime || "06:00"} -{" "}
                {turf.closingTime || "24:00"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Date Selection */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Select Date
              </h2>
              <div className="grid grid-cols-7 gap-2">
                {availableDates.map((date, index) => (
                  <button
                    key={index}
                    className={`flex flex-col items-center p-3 rounded-lg border ${
                      selectedDate === date.date
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 hover:border-green-300"
                    }`}
                    onClick={() => {
                      setSelectedDate(date.date);
                      setSelectedSlots([]);
                    }}
                  >
                    <span className="text-sm font-medium">
                      {date.displayDate.split(",")[0]}
                    </span>
                    <span className="text-xs">
                      {date.displayDate.split(",")[1]}
                    </span>
                    {index === 0 && (
                      <span className="text-[10px] text-blue-600 font-bold mt-1">
                        TODAY
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Selector */}
            {selectedDate && (
              <TimeSlotSelector
                selectedDate={selectedDate}
                selectedSlots={selectedSlots}
                setSelectedSlots={setSelectedSlots}
                turf={turf}
                availableDates={availableDates}
                calculateRate={calculateRate}
                getStartHour24={getStartHour24}
              />
            )}

            {/* Booking Summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Booking Summary
              </h2>

              {selectedSlots.length > 0 ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600">Selected Date:</p>
                    <p className="font-semibold">
                      {
                        availableDates.find((d) => d.date === selectedDate)
                          ?.displayDate
                      }
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-600">Selected Slots:</p>
                    <div className="mt-1 space-y-1">
                      {selectedSlots.map((slot, index) => (
                        <p key={index} className="text-sm">
                          • {slot}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between mb-2">
                      <span>Total Hours:</span>
                      <span className="font-semibold">
                        {selectedSlots.length}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Price:</span>
                      <span className="text-green-600">
                        ₹{calculateTotalPrice()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleBooking}
                    className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                  >
                    Book Now
                  </button>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  Select date and time slots to see booking summary
                </p>
              )}
            </div>

            {/* Rules */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Rules</h2>
              <ul className="space-y-2">
                {rules.map((rule, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Info & Booking */}
          <div className="space-y-6">
            {/* Rates */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Rates</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Standard Rate:</span>
                  <span className="font-semibold">
                    ₹{turf.rates?.standard || 0}
                  </span>
                </div>
                {turf.rates?.peakHour && (
                  <div className="flex justify-between">
                    <span>Peak Hours (6PM - 10PM):</span>
                    <span className="font-semibold">
                      ₹{turf.rates.peakHour}
                    </span>
                  </div>
                )}
                {turf.rates?.weekend && (
                  <div className="flex justify-between">
                    <span>Weekend Rate:</span>
                    <span className="font-semibold">₹{turf.rates.weekend}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <HiLocationMarker className="text-green-600 mr-2" />
                Location
              </h2>
              <p className="text-gray-700">{turf.location}</p>
              {turf.area && (
                <p className="text-green-600 font-semibold text-sm mt-2">
                  Area: {turf.area}
                </p>
              )}
            </div>

            {/* Contact */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact</h2>
              <div className="space-y-3">
                {turf.contact?.primary && (
                  <div className="flex items-center">
                    <HiPhone className="text-green-600 mr-3" />
                    <span>{turf.contact.primary}</span>
                  </div>
                )}
                {turf.email && (
                  <div className="flex items-center">
                    <HiMail className="text-green-600 mr-3" />
                    <span>{turf.email}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Facilities
              </h2>
              <div className="space-y-2">
                {defaultFacilities.map((facility, index) => (
                  <div key={index} className="flex items-center">
                    <facility.icon className="text-green-600 mr-3" />
                    <span>{facility.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurfView;
