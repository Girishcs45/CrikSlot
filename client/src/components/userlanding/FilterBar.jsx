import { motion } from 'framer-motion';
import { HiLocationMarker, HiCalendar, HiClock } from 'react-icons/hi';
export const FilterBar = () => {
  return (
    <section className="bg-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Location Select */}
          <div className="relative flex-1 w-full">
            <HiLocationMarker className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select className="w-full pl-10 pr-4 py-3 bg-[#ECF9E3] rounded-lg text-gray-600 border border-green-200 focus:outline-none">
              <option value="">Location</option>
              <option value="ashok-nagar">Ashok Nagar</option>
              <option value="gangapur-road">Gangapur Road</option>
              <option value="cidco">Cidco</option>
              <option value="nashik-road">Nashik Road</option>
            </select>
          </div>

          {/* Date Picker */}
          <div className="relative flex-1 w-full">
            <HiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              className="w-full pl-10 pr-4 py-3 bg-[#ECF9E3] rounded-lg text-gray-600 border border-green-200 focus:outline-none"
            />
          </div>

          {/* Time Select */}
          <div className="relative flex-1 w-full">
            <HiClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select className="w-full pl-10 pr-4 py-3 bg-[#ECF9E3] rounded-lg text-gray-600 border border-green-200 focus:outline-none">
              <option value="">Select Time</option>
              <option value="6-8">6:00 AM - 8:00 AM</option>
              <option value="8-10">8:00 AM - 10:00 AM</option>
              <option value="10-12">10:00 AM - 12:00 PM</option>
              <option value="12-2">12:00 PM - 2:00 PM</option>
              <option value="2-4">2:00 PM - 4:00 PM</option>
              <option value="4-6">4:00 PM - 6:00 PM</option>
              <option value="6-8">6:00 PM - 8:00 PM</option>
              <option value="8-10">8:00 PM - 10:00 PM</option>
            </select>
          </div>
        </motion.div>
      </div>
    </section>
  );
};