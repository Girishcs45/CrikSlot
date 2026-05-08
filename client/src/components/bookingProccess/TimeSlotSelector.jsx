import { useCallback, useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { SlotsInfo } from '../../services/booking.services';

const TimeSlotSelector = ({
  selectedDate,
  selectedSlots,
  setSelectedSlots,
  turf,
  availableDates,
  calculateRate,
  getStartHour24
}) => {

  const [bookedSlots, setBookedSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  useEffect(() => {
    if (!selectedDate || !turf?._id) return;

    setSelectedSlots([]);

    const fetchSlotsInfo = async () => {
      try {
        setSlotsLoading(true);
        const data = await SlotsInfo(turf._id, selectedDate);
        setBookedSlots(data.bookedSlots || []);
      } catch (err) {
        console.error("Error fetching slots info", err);
      } finally {
        setSlotsLoading(false);
      }
    };

    fetchSlotsInfo();
  }, [selectedDate, turf?._id]);

  const getTodayDate = useCallback(() => {
    const today = new Date();
    const day = today.getDate();
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${day} ${monthNames[today.getMonth()]}`;
  }, []);

  const isPastTime = useCallback((time) => {
    const now = new Date();
    if (selectedDate !== getTodayDate()) return false;
    return getStartHour24(time) <= now.getHours();
  }, [selectedDate, getStartHour24, getTodayDate]);

  const processedTimeSlots = useMemo(() => {
    if (!turf?.timeSlots) return [];

    return turf.timeSlots.map(slotTime => {
      const past = isPastTime(slotTime);
      const booked = bookedSlots.includes(slotTime);

      return {
        time: slotTime,
        isAvailable: !past && !booked,
        isPast: past,
        isBooked: booked
      };
    });
  }, [turf, bookedSlots, isPastTime]);

  const handleSlotClick = useCallback((slotTime) => {
    const slot = processedTimeSlots.find(s => s.time === slotTime);
    if (!slot?.isAvailable) return;

    setSelectedSlots(prev =>
      prev.includes(slotTime)
        ? prev.filter(t => t !== slotTime)
        : [...prev, slotTime]
    );
  }, [processedTimeSlots, setSelectedSlots]);

  const totalPrice = useMemo(() => {
    return selectedSlots.reduce(
      (sum, slot) => sum + calculateRate(selectedDate, slot, turf?.rates || {}),
      0
    );
  }, [selectedSlots, selectedDate, turf, calculateRate]);

  const getSelectedSlotInfo = useCallback(() => {
    if (!selectedSlots.length) return null;

    const sorted = [...selectedSlots].sort(
      (a, b) => getStartHour24(a) - getStartHour24(b)
    );

    return {
      start: sorted[0].split('-')[0].trim(),
      end: sorted[sorted.length - 1].split('-')[1].trim(),
      duration: `${sorted.length} hour${sorted.length > 1 ? 's' : ''}`
    };
  }, [selectedSlots, getStartHour24]);

  const renderSlotsContent = () => {
    if (slotsLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="animate-spin h-8 w-8 border-4 border-green-600 border-t-transparent rounded-full mb-3" />
          <p className="text-sm text-gray-500">Checking slot availability...</p>
        </div>
      );
    }

    const visibleSlots = processedTimeSlots.filter(slot => !slot.isPast);

    if (visibleSlots.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">No available slots for this date</p>
        </div>
      );
    }

    return (
      <div className="flex gap-3 min-w-max px-2">
        {visibleSlots.map(slot => {
          const isSelected = selectedSlots.includes(slot.time);
          const startTime = slot.time.split('-')[0].trim();
          const rate = calculateRate(selectedDate, slot.time, turf?.rates || {});
          const hour24 = getStartHour24(slot.time);

          const btnClass = slot.isBooked
            ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
            : isSelected
              ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-600 text-white shadow-lg'
              : 'bg-white border-green-300 text-gray-800 hover:border-green-400 hover:shadow-md';

          return (
            <div key={slot.time} className="flex flex-col items-center w-24 shrink-0">
              <button
                onClick={() => handleSlotClick(slot.time)}
                disabled={!slot.isAvailable}
                className={`w-full h-20 rounded-xl border-2 flex flex-col items-center justify-center transition ${btnClass}`}
              >
                <div className="font-bold text-lg">{startTime}</div>
                <div className="text-xs opacity-80">
                  {hour24 < 12 ? 'Morning' : hour24 < 17 ? 'Afternoon' : hour24 < 20 ? 'Evening' : 'Night'}
                </div>
              </button>

              <div className="mt-2 text-sm font-semibold">₹{rate}</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm"
    >
      <h2 className="text-xl font-bold mb-4">Select Time</h2>

      {selectedSlots.length > 0 && (
        <div className="mb-4 text-green-700 font-semibold">
          {getSelectedSlotInfo()?.start} to {getSelectedSlotInfo()?.end} · ₹{totalPrice}
        </div>
      )}

      <div className="mb-6">
        <div className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full inline-block mb-3">
          {availableDates.find(d => d.date === selectedDate)?.displayDate}
        </div>

        <div className="overflow-x-auto pb-4">
          {renderSlotsContent()}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-white border-2 border-green-300 rounded"></div>
            <span className="text-gray-600">Available</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-600">Selected</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-300 rounded"></div>
            <span className="text-gray-600">Booked</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

TimeSlotSelector.propTypes = {
  selectedDate: PropTypes.string,
  selectedSlots: PropTypes.array.isRequired,
  setSelectedSlots: PropTypes.func.isRequired,
  turf: PropTypes.object.isRequired,
  availableDates: PropTypes.array.isRequired,
  calculateRate: PropTypes.func.isRequired,
  getStartHour24: PropTypes.func.isRequired
};

export default TimeSlotSelector;
