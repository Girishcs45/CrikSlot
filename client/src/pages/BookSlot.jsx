import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiSearch, HiLocationMarker } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import referralBanner from "../assets/Referral.png";
import RatingStars from '../components/common/RatingStars';
import { FetchTurf } from '../services/turf.services';

const BookSlot = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [turfs, setTurfs] = useState([]);
  const navigate = useNavigate();

  const getTurfs = async () => {
    try {
      const res = await FetchTurf();
      setTurfs(res);
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  useEffect(() => {
    getTurfs();
  }, []);

  // Filter turfs based on search term
  const filteredTurfs = turfs.filter(turf =>
    turf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    turf.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    turf.area?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTurfClick = (turfId) => {
    navigate(`/turfview/${turfId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Referral Banner */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center items-center"
          >
            <img
              src={referralBanner}
              alt="Referral Banner"
              className="h-48 w-full max-w-4xl object-cover rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="relative">
              <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search by turf name, location, or area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-2xl border-0 focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Turf Listings */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTurfs.map((turf, index) => (
              <motion.div
                key={turf._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 cursor-pointer"
                onClick={() => handleTurfClick(turf._id)}
              >
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${turf.images})` }}
                ></div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {turf.name}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <HiLocationMarker className="text-green-600 mr-2" />
                    <span className="text-sm">{turf.location}</span>
                    {turf.area && (
                      <span className="text-sm text-gray-500 ml-2">
                        • {turf.area}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <RatingStars rating={turf.rating} />
                    <span className="text-lg font-bold text-green-700">
                      ₹{turf.rates.standard}
                    </span>
                  </div>
                  <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300">
                    BOOK NOW
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredTurfs.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <HiSearch className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">
                No turfs found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search terms or browse all turfs
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BookSlot;
