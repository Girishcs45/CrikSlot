// src/components/tournaments/Tournaments.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/common/Button';
import { tournaments } from '../../data/Tournament';
import { useNavigate } from 'react-router-dom';

const Tournaments = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const filteredTournaments = tournaments.filter(tournament => {
    if (filter === 'all') return true;
    return tournament.sport.toLowerCase() === filter;
  });

  const sports = ['all', 'cricket', 'football', 'basketball'];

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Upcoming Tournaments
        </motion.h2>

        <motion.p
          className="text-gray-600 text-center mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto text-sm sm:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Join exciting tournaments across various sports. Register your team and showcase your skills!
        </motion.p>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-6 sm:mb-8 flex-wrap gap-2 sm:gap-3 lg:gap-4">
          {sports.map((sport) => (
            <Button
              key={sport}
              variant={filter === sport ? "primary" : "outline"}
              onClick={() => setFilter(sport)}
              className="capitalize text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4"
            >
              {sport === 'all' ? 'All Sports' : sport}
            </Button>
          ))}
        </div>

        {/* Tournaments Container */}
        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          {filteredTournaments.map((tournament, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={tournament.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.01,
                  transition: { duration: 0.2 }
                }}
                className={`relative ${isEven ? 'lg:ml-10' : 'lg:mr-10'}`}
              >
                {/* Main Card - Responsive Sizes */}
                <div className={`bg-[#DEFFE0] rounded-lg sm:rounded-xl overflow-hidden shadow-sm sm:shadow-md border border-green-100 md:flex ${isEven ? '' : 'md:flex-row-reverse'}`}>

                  {/* Image Section - Responsive */}
                  <div className="h-48 sm:h-56 md:h-auto md:w-2/5 relative">
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${tournament.image})` }}
                    />

                    {/* Badges - Responsive */}
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 right-2 sm:right-3 flex justify-between items-center">
                      <span className="bg-green-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold">
                        {tournament.category}
                      </span>
                      <span className="text-xs bg-black/80 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                        {tournament.sport}
                      </span>
                    </div>
                  </div>

                  {/* Content Section - Responsive */}
                  <div className="md:w-3/5 p-3 sm:p-4 md:p-5">
                    {/* Tournament Title - Responsive */}
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                      {tournament.name}
                    </h3>

                    {/* Compact Details - Responsive */}
                    <div className="space-y-1.5 sm:space-y-2 mb-2 sm:mb-3">
                      <div className="flex items-center text-xs sm:text-sm text-gray-700">
                        <span className="text-gray-500 mr-1.5 sm:mr-2">📅</span>
                        <span className="font-medium">{tournament.date}</span>
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-gray-700">
                        <span className="text-gray-500 mr-1.5 sm:mr-2">📍</span>
                        <span className="truncate">{tournament.location}</span>
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-gray-700">
                        <span className="text-gray-500 mr-1.5 sm:mr-2">⏰</span>
                        <span>Register by: {tournament.registrationDeadline}</span>
                      </div>
                    </div>

                    {/* Rules Section - Responsive */}
                    <div className="mb-3 sm:mb-4">
                      <h4 className="text-xs sm:text-sm font-bold text-gray-800 mb-1">Rules:</h4>
                      <div className="bg-green-50 rounded-md sm:rounded-lg p-2 sm:p-3 text-xs">
                        <p className="text-gray-700 mb-0.5 sm:mb-1">• Teams: 7 players (5+2 subs)</p>
                        <p className="text-gray-700">• Boots mandatory</p>
                      </div>
                    </div>

                    {/* Action Buttons - Responsive */}
                    <div className="flex justify-between mt-3 sm:mt-4 gap-2">
                      <Button
                        variant="primary"
                        className="text-xs sm:text-sm px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-md sm:rounded-lg flex-1"
                        onClick={() => navigate(`/tournamentsregistration/${tournament.id}`)}
                      >
                        Register Now
                      </Button>
                      <button className="text-green-700 hover:text-green-800 text-xs sm:text-sm font-medium px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-md sm:rounded-lg border border-green-200 hover:border-green-300 flex-1">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Tournaments;