// src/pages/TournRegistration.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/common/Button';
import { tournaments } from '../../data/Tournament';

const TournRegistration = () => {
  const { tournamentId } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState(null);
  const [formData, setFormData] = useState({
    teamName: '',
    captainName: '',
    whatsappNumber: '',
    teamMembers: ['', '', '', '', '', '', ''], // 7 players including captain
    termsAccepted: false
  });

  useEffect(() => {
    const id = Number(tournamentId);
    // console.log('Tournament ID from params:', id);
    // Find the tournament by ID
    const foundTournament = tournaments.find(t => t?.id === id);
    console.log('Found Tournament:', foundTournament);
    if (foundTournament) {
      setTournament(foundTournament);
    }
    else {
      // Redirect if tournament not found
      navigate('/tournaments');
    }
  }, [tournamentId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTeamMemberChange = (index, value) => {
    const updatedMembers = [...formData.teamMembers];
    updatedMembers[index] = value;
    setFormData(prev => ({
      ...prev,
      teamMembers: updatedMembers
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration data:', { tournamentId, ...formData });
    // Redirect to payment or confirmation
    // navigate('/payment');
  };

  if (!tournament) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-600">Loading tournament...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Tournaments
        </Button>

        {/* Main Container */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-green-100">
          {/* Header with Tournament Info */}
          <div className="bg-gradient-to-r from-green-400 to-green-500 p-4 sm:p-6 md:p-8 text-white">
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
              {/* Image Section */}
              <div className="lg:w-2/5">
                <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={tournament.image}
                    alt={tournament.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/800x600?text=Tournament+Image";
                    }}
                  />
                  {/* Badge overlay */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-col gap-2">
                    <span className="bg-green-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                      {tournament.category}
                    </span>
                    <span className="bg-black/80 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold">
                      {tournament.sport.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="lg:w-3/5">
                {/* Tournament Title */}
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6">
                  {tournament.name}
                </h1>

                {/* Main Info Grid - Responsive columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  {/* Date */}
                  <div className="flex items-start gap-3 bg-white/15 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <span className="text-lg sm:text-xl">📅</span>
                    </div>
                    <div>
                      <div className="text-xs opacity-80 mb-1">Tournament Date</div>
                      <div className="font-semibold text-sm sm:text-base">{tournament.date}</div>
                    </div>
                  </div>

                  {/* Registration Deadline */}
                  <div className="flex items-start gap-3 bg-white/15 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <span className="text-lg sm:text-xl">⏰</span>
                    </div>
                    <div>
                      <div className="text-xs opacity-80 mb-1">Registration Deadline</div>
                      <div className="font-semibold text-sm sm:text-base">{tournament.registrationDeadline}</div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3 bg-white/15 backdrop-blur-sm p-3 sm:p-4 rounded-lg sm:rounded-xl sm:col-span-2">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <span className="text-lg sm:text-xl">📍</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs opacity-80 mb-1">Location</div>
                      <div className="font-semibold text-sm sm:text-base">{tournament.location}</div>
                    </div>
                  </div>
                </div>

                {/* Prize Pool Section */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 opacity-90">🏆 Prize Pool</h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <div className="flex-1 min-w-[120px] sm:min-w-[140px] bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                      <div className="text-xs opacity-80">1st Prize</div>
                      <div className="text-lg sm:text-xl font-bold">₹{tournament.prizePool.first.toLocaleString()}</div>
                    </div>
                    <div className="flex-1 min-w-[120px] sm:min-w-[140px] bg-gradient-to-br from-gray-300/20 to-gray-400/20 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                      <div className="text-xs opacity-80">2nd Prize</div>
                      <div className="text-lg sm:text-xl font-bold">₹{tournament.prizePool.second.toLocaleString()}</div>
                    </div>
                    <div className="flex-1 min-w-[120px] sm:min-w-[140px] bg-gradient-to-br from-amber-700/20 to-amber-800/20 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                      <div className="text-xs opacity-80">3rd Prize</div>
                      <div className="text-lg sm:text-xl font-bold">₹{tournament.prizePool.third.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs sm:text-sm opacity-80">
                    Total Prize Pool: ₹{(tournament.prizePool.first + tournament.prizePool.second + tournament.prizePool.third).toLocaleString()}
                  </div>
                </div>

                {/* Team and Timing Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Team Composition */}
                  <div className="bg-white/10 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-white/20 p-1.5 rounded-lg">
                        <span className="text-sm">👥</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-semibold">Team Composition</h4>
                    </div>
                    <p className="text-sm opacity-90">{tournament.teamComposition}</p>
                  </div>

                  {/* Tournament Time */}
                  <div className="bg-white/10 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-white/20 p-1.5 rounded-lg">
                        <span className="text-sm">🕒</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-semibold">Tournament Timing</h4>
                    </div>
                    <p className="text-sm opacity-90">{tournament.tournamentTime}</p>
                  </div>
                </div>

                {/* Sport Type Badge */}
                <div className="mt-4 sm:mt-6 pt-4 border-t border-white/20">
                  <div className="inline-flex items-center gap-2 bg-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                    <span className="text-xs sm:text-sm opacity-80">Sport Type:</span>
                    <span className="font-bold text-sm sm:text-base">{tournament.sport}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="p-6 md:p-8">
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6 md:space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center">
                Register for the Tournament
              </h2>

              {/* Team Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Captain Name
                </label>
                <input
                  type="text"
                  name="captainName"
                  value={formData.captainName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  placeholder="Enter captain's name"
                  required
                />
              </div>

              {/* Team Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Capped Name
                </label>
                <input
                  type="text"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  placeholder="Enter team name"
                  required
                />
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Capped WhatsApp No.
                </label>
                <input
                  type="tel"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  placeholder="Enter WhatsApp number"
                  required
                />
              </div>

              {/* Team Members */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Team Members (7 players)</h3>
                <div className="space-y-3">
                  {formData.teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-700 rounded-full font-medium">
                        {index + 1}
                      </div>
                      <input
                        type="text"
                        value={member}
                        onChange={(e) => handleTeamMemberChange(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        placeholder={`Player ${index + 1} name`}
                        required={index === 0} // Captain is required
                      />
                      {index === 0 && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          Captain
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Rules & Terms */}
              <div className="bg-green-50 rounded-xl p-4 md:p-6">
                <h4 className="font-bold text-gray-800 mb-3">Rules & Regulations:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Team must consist of 7 players (5 main + 2 substitutes)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Football boots are mandatory for all matches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>All players must have valid ID proof</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Registration fee is non-refundable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Team captain is responsible for team conduct</span>
                  </li>
                </ul>
              </div>

              {/* Terms Acceptance */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.termsAccepted}
                  onChange={(e) => setFormData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
                  className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                  required
                />
                <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
                  I agree to all the rules and regulations of the tournament
                </label>
              </div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-4"
              >
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-3 md:py-4 text-lg font-semibold rounded-xl"
                  disabled={!formData.termsAccepted}
                >
                  Proceed to Pay
                </Button>
              </motion.div>
            </motion.form>
          </div>
        </div>

        {/* Tournament Quick Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-green-100">
            <div className="text-sm text-gray-600">Entry Fee</div>
            <div className="text-xl font-bold text-gray-800">₹2,500</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-green-100">
            <div className="text-sm text-gray-600">Prize Pool</div>
            <div className="text-xl font-bold text-gray-800">₹25,000</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-green-100">
            <div className="text-sm text-gray-600">Teams Registered</div>
            <div className="text-xl font-bold text-gray-800">12/16</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournRegistration;