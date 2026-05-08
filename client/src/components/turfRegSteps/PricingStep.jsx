import React from 'react';
import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaCheck, FaInfoCircle } from 'react-icons/fa';

const PricingStep = ({ formData, updateFormData }) => {
  
  // Handle rate change
  const handleRateChange = (rateType, value) => {
    updateFormData(`rates.${rateType}`, value);
  };

  // Rate cards data
  const rateCards = [
    {
      id: 'standard',
      title: 'Standard Rate',
      description: 'Regular Hours',
      icon: '🕐',
      color: 'from-green-100 to-green-50',
      borderColor: 'border-green-200',
      hoverBorder: 'hover:border-green-400',
      iconBg: 'bg-green-100',
      timeRange: 'Mon-Fri: 6AM - 6PM',
      placeholder: '300'
    },
    {
      id: 'peakHour',
      title: 'Peak Hours',
      description: 'Evening Hours',
      icon: '🔥',
      color: 'from-yellow-100 to-yellow-50',
      borderColor: 'border-yellow-200',
      hoverBorder: 'hover:border-yellow-400',
      iconBg: 'bg-yellow-100',
      timeRange: '6PM - 10PM Daily',
      placeholder: '500'
    },
    {
      id: 'weekend',
      title: 'Weekends',
      description: 'Saturday & Sunday',
      icon: '🎉',
      color: 'from-blue-100 to-blue-50',
      borderColor: 'border-blue-200',
      hoverBorder: 'hover:border-blue-400',
      iconBg: 'bg-blue-100',
      timeRange: 'All Day',
      placeholder: '700'
    }
  ];

  // Calculate total earning estimate
  const calculateEstimate = () => {
    const standard = parseInt(formData.rates.standard) || 0;
    const peak = parseInt(formData.rates.peakHour) || 0;
    const weekend = parseInt(formData.rates.weekend) || 0;
    
    // Simple estimation formula
    const weeklyEstimate = (standard * 40) + (peak * 20) + (weekend * 16);
    const monthlyEstimate = weeklyEstimate * 4;
    
    return { weeklyEstimate, monthlyEstimate };
  };

  const estimates = calculateEstimate();

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Set Your Hourly Rates</h3>
        <p className="text-gray-600">
          Define pricing for different time slots. Competitive rates attract more bookings.
        </p>
      </div>

      {/* Rate Cards Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {rateCards.map((card) => (
          <motion.div
            key={card.id}
            whileHover={{ y: -5 }}
            className={`bg-gradient-to-b ${card.color} p-6 rounded-2xl border-2 ${card.borderColor} ${card.hoverBorder} transition-all shadow-sm`}
          >
            {/* Card Header */}
            <div className="text-center mb-5">
              <div className={`w-16 h-16 rounded-full ${card.iconBg} border-2 ${card.borderColor} flex items-center justify-center mx-auto mb-3`}>
                <span className="text-3xl">{card.icon}</span>
              </div>
              <h4 className="font-bold text-xl text-gray-800">{card.title}</h4>
              <p className="text-gray-500 text-sm mt-1">{card.description}</p>
              <p className="text-xs text-gray-400 mt-2 bg-white/50 px-2 py-1 rounded-full inline-block">
                {card.timeRange}
              </p>
            </div>

            {/* Rate Input */}
            <div className="mb-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-bold text-lg">₹</span>
                <input
                  type="number"
                  value={formData.rates[card.id] || ''}
                  onChange={(e) => handleRateChange(card.id, e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-semibold text-gray-800"
                  placeholder={card.placeholder}
                  min="0"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">/hour</span>
              </div>
            </div>

            {/* Validation Message */}
            {formData.rates[card.id] && parseInt(formData.rates[card.id]) > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-green-600 text-sm flex items-center"
              >
                <FaCheck className="mr-2" />
                Rate set successfully
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Pricing Tips */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200"
      >
        <div className="flex items-start">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mr-4 flex-shrink-0">
            <FaInfoCircle className="text-green-600 text-xl" />
          </div>
          <div>
            <h4 className="font-bold text-green-800 mb-2">Pricing Strategy Tips</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
              <div>
                <p className="font-semibold mb-1">🏆 Competitive Pricing:</p>
                <ul className="space-y-1">
                  <li>• Check nearby turf rates</li>
                  <li>• Offer introductory discounts</li>
                  <li>• Consider seasonal pricing</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-1">💰 Value-Based Pricing:</p>
                <ul className="space-y-1">
                  <li>• Charge more for premium facilities</li>
                  <li>• Offer package deals</li>
                  <li>• Consider membership plans</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Earning Estimation */}
      {estimates.weeklyEstimate > 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200"
        >
          <h4 className="font-bold text-blue-800 mb-3 flex items-center">
            <FaMoneyBillWave className="mr-2" />
            Estimated Potential Earnings
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white rounded-xl border border-blue-100">
              <p className="text-sm text-blue-600">Weekly</p>
              <p className="text-2xl font-bold text-blue-800">₹{estimates.weeklyEstimate.toLocaleString()}</p>
            </div>
            <div className="text-center p-3 bg-white rounded-xl border border-blue-100">
              <p className="text-sm text-blue-600">Monthly</p>
              <p className="text-2xl font-bold text-blue-800">₹{estimates.monthlyEstimate.toLocaleString()}</p>
            </div>
            <div className="text-center p-3 bg-white rounded-xl border border-blue-100">
              <p className="text-sm text-blue-600">Peak Rate</p>
              <p className="text-2xl font-bold text-blue-800">₹{formData.rates.peakHour || '0'}</p>
            </div>
            <div className="text-center p-3 bg-white rounded-xl border border-blue-100">
              <p className="text-sm text-blue-600">Avg/Hour</p>
              <p className="text-2xl font-bold text-blue-800">
                ₹{Math.round((estimates.weeklyEstimate / 76) * 10) / 10 || '0'}
              </p>
            </div>
          </div>
          <p className="text-xs text-blue-600 mt-3 text-center">
            * Estimates based on 40 standard hours, 20 peak hours, and 16 weekend hours per week
          </p>
        </motion.div>
      )}

      {/* Rate Comparison Helper */}
      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
        <details className="group">
          <summary className="flex items-center justify-between cursor-pointer text-gray-700 font-semibold">
            <span>Need help deciding rates?</span>
            <span className="text-green-600 group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <div className="mt-3 text-sm text-gray-600 space-y-2">
            <p>✅ <strong>Standard Rate:</strong> ₹250-400/hour (Check local competition)</p>
            <p>🔥 <strong>Peak Hours:</strong> Usually 1.5x to 2x standard rate</p>
            <p>🎉 <strong>Weekends:</strong> 2x to 3x standard rate, depending on demand</p>
            <p className="text-green-700 font-medium mt-2">
              Tip: You can adjust these rates anytime from your owner dashboard.
            </p>
          </div>
        </details>
      </div>

      {/* Progress Indicator for this step */}
      <div className="pt-4 mt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <span className="font-medium text-green-600">Step 2 of 4</span> • Pricing Strategy
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <div className="w-12 h-1 bg-green-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PricingStep;