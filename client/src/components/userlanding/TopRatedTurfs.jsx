import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiLocationMarker } from 'react-icons/hi';
import RatingStars from '../common/RatingStars';
import { Button } from '../common/Button';
import { useEffect, useState } from 'react';
import { FetchTurf } from '../../services/turf.services';

const TopRatedTurfs = () => {
  const navigate = useNavigate();

  const [turfs, setTurfs] = useState([]);

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

  // Filter top-rated turfs (rating >= 4.5) and take only 3
  const topRatedTurfs = turfs
    .filter(turf => turf.rating >= 4.5)
    .slice(0, 3);

  // ✅ FIXED: correct function parameter
  const handleBookClick = (turfId, e) => {
    e.stopPropagation();
    navigate(`/turfview/${turfId}`);
  };

  return (
    <section id="book" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-12">
          <motion.h2
            className="text-3xl font-bold text-gray-800"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Top Rated Turfs
          </motion.h2>
          <Link to="/bookslot">
            <motion.span
              className="text-[#326B0F] font-semibold hover:underline cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              See All &gt;
            </motion.span>
          </Link>
        </div>

        {/* Turf Cards Grid - Only 3 top-rated turfs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topRatedTurfs.map((turf, index) => (
            <Link key={turf._id} to={`/turfview/${turf._id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 cursor-pointer"
              >
                {/* Turf Image */}
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${turf.images})` }}
                ></div>

                {/* Turf Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {turf.name}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <HiLocationMarker className="text-[#326B0F] mr-2" />
                    <span className="text-sm">{turf.location}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <RatingStars rating={turf.rating} />
                    <div className="flex gap-1 items-center">
                      <span className="text-lg font-bold text-[#1a3c05]">
                        {turf.rates.standard}
                      </span>
                      <p className="text-sm">per Hour</p>
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={(e) => handleBookClick(turf._id, e)}
                  >
                    BOOK
                  </Button>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Show message if no top-rated turfs found */}
        {topRatedTurfs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No top-rated turfs found.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopRatedTurfs;
