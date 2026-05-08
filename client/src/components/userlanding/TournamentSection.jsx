import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';  // Adjust the import path as necessary
import { tournaments } from '../../data/Tournament'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';

export const TournamentSection = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/tournaments');
  };

  const toptournaments = tournaments.slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-bold text-gray-800 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Tournaments
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {toptournaments.map((tournament, index) => (
            <motion.div
              key={tournament.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-[#DEFFE0] rounded-2xl overflow-hidden shadow-lg"
            >
              <div
                className="h-72 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${tournament.image})` }}
              ></div>

              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{tournament.name}</h3>
                <p className="text-gray-600 mb-4">{tournament.sport}</p>
                <Button variant="outline" onClick={() => navigate(`/tournamentsregistration/${tournament.id}`)}>Register Now</Button>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button variant="outline" onClick={() => {
            handleExplore();
          }} >EXPLORE MORE</Button>
        </div>
      </div>
    </section>
  );
};