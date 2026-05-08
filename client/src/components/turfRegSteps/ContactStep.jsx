import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaWhatsapp, FaCopy, FaCheck, FaInfoCircle } from 'react-icons/fa';

const ContactStep = ({ formData, updateFormData }) => {
  const [copiedField, setCopiedField] = useState(null);
  
  // Handle contact change
  const handleContactChange = (field, value) => {
    updateFormData(field, value);
  };

  // Copy to clipboard function
  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Validate phone number
  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  };

  // Validate email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Get validation status
  const primaryValid = formData.contact.primary ? validatePhone(formData.contact.primary) : false;
  const emailValid = formData.email ? validateEmail(formData.email) : false;

  // Prevent form submission on any click inside this component
  const handleContainerClick = (e) => {
    // Only prevent if it's not a submit button
    if (e.target.type !== 'submit' && !e.target.closest('button[type="submit"]')) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Safe copy function with event prevention
  const safeCopyToClipboard = (text, field, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    copyToClipboard(text, field);
  };

  // Safe input change handler
  const safeInputChange = (field, value, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    handleContactChange(field, value);
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="space-y-8"
      onClick={handleContainerClick}
    >
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Contact Information</h3>
        <p className="text-gray-600">
          How players will contact you for bookings and inquiries.
        </p>
      </div>

      {/* Primary Contact */}
      <div className="space-y-6">
        {/* Primary Contact Card */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mr-4">
                <FaPhone className="text-green-600 text-xl" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg">Primary Contact Number *</h4>
                <p className="text-gray-600 text-sm">This number will be shown to players</p>
              </div>
            </div>
            {primaryValid && (
              <span className="flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                <FaCheck className="mr-1" /> Valid
              </span>
            )}
          </div>
          
          <div className="relative">
            <div className="flex items-center">
              <span className="absolute left-4 text-gray-600 font-medium">+91</span>
              <input
                type="tel"
                value={formData.contact.primary}
                onChange={(e) => safeInputChange('contact.primary', e.target.value, e)}
                required
                className="w-full pl-16 pr-12 py-4 bg-white border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                placeholder="9876543210"
                maxLength="10"
                onClick={(e) => e.stopPropagation()}
              />
              {formData.contact.primary && (
                <button
                  type="button"
                  onClick={(e) => safeCopyToClipboard(formData.contact.primary, 'primary', e)}
                  className="absolute right-4 text-gray-500 hover:text-green-600"
                  title="Copy to clipboard"
                >
                  {copiedField === 'primary' ? (
                    <FaCheck className="text-green-600" />
                  ) : (
                    <FaCopy />
                  )}
                </button>
              )}
            </div>
            
            {formData.contact.primary && !primaryValid && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-sm mt-2 flex items-center"
              >
                ⚠️ Please enter a valid 10-digit Indian mobile number
              </motion.p>
            )}
          </div>

          {/* WhatsApp Toggle */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <FaWhatsapp className="text-green-600 text-xl mr-2" />
              <span className="text-gray-700">Available on WhatsApp</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                defaultChecked 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onChange={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>
        </div>

        {/* Alternate Contact */}
        <div className="bg-gray-50 p-6 rounded-2xl border-2 border-gray-200">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mr-4">
              <FaPhone className="text-gray-500 text-lg" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800">Alternate Contact Number</h4>
              <p className="text-gray-500 text-sm">Optional backup number</p>
            </div>
          </div>
          
          <div className="relative">
            <div className="flex items-center">
              <span className="absolute left-4 text-gray-500">+91</span>
              <input
                type="tel"
                value={formData.contact.alternate}
                onChange={(e) => safeInputChange('contact.alternate', e.target.value, e)}
                className="w-full pl-16 pr-12 py-3 bg-white border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Optional backup number"
                maxLength="10"
                onClick={(e) => e.stopPropagation()}
              />
              {formData.contact.alternate && (
                <button
                  type="button"
                  onClick={(e) => safeCopyToClipboard(formData.contact.alternate, 'alternate', e)}
                  className="absolute right-4 text-gray-400 hover:text-green-600"
                >
                  {copiedField === 'alternate' ? (
                    <FaCheck className="text-green-600" />
                  ) : (
                    <FaCopy />
                  )}
                </button>
              )}
            </div>
            <p className="text-gray-400 text-xs mt-2">
              Useful during peak hours or if primary is unavailable
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mr-4">
                <FaEnvelope className="text-blue-600 text-xl" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg">Email Address *</h4>
                <p className="text-gray-600 text-sm">For booking confirmations and notifications</p>
              </div>
            </div>
            {emailValid && (
              <span className="flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                <FaCheck className="mr-1" /> Valid
              </span>
            )}
          </div>
          
          <div className="relative">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => safeInputChange('email', e.target.value, e)}
              required
              className="w-full pl-4 pr-12 py-4 bg-white border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
              placeholder="owner@example.com"
              onClick={(e) => e.stopPropagation()}
            />
            {formData.email && (
              <button
                type="button"
                onClick={(e) => safeCopyToClipboard(formData.email, 'email', e)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600"
              >
                {copiedField === 'email' ? (
                  <FaCheck className="text-green-600" />
                ) : (
                  <FaCopy />
                )}
              </button>
            )}
          </div>
          
          {formData.email && !emailValid && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 text-sm mt-2"
            >
              ⚠️ Please enter a valid email address
            </motion.p>
          )}
        </div>
      </div>

      {/* Contact Tips */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200"
      >
        <div className="flex items-start">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center mr-4 flex-shrink-0">
            <FaInfoCircle className="text-purple-600 text-xl" />
          </div>
          <div>
            <h4 className="font-bold text-purple-800 mb-3">Contact Management Tips</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="font-semibold text-purple-700 mb-2">📞 Phone Best Practices:</p>
                <ul className="text-sm text-purple-600 space-y-1">
                  <li>• Keep phone handy during booking hours</li>
                  <li>• Set up quick replies for common questions</li>
                  <li>• Use WhatsApp for faster communication</li>
                  <li>• Update availability status regularly</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-purple-700 mb-2">📧 Email Management:</p>
                <ul className="text-sm text-purple-600 space-y-1">
                  <li>• Check email daily for booking requests</li>
                  <li>• Set up auto-responder for after hours</li>
                  <li>• Use professional email signature</li>
                  <li>• Keep booking confirmations organized</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contact Summary */}
      <div className="bg-white p-5 rounded-2xl border-2 border-gray-300 shadow-sm">
        <h4 className="font-bold text-gray-800 mb-4">Contact Summary</h4>
        <div className="grid md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-xl ${primaryValid ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
            <p className="text-sm text-gray-600 mb-1">Primary Contact</p>
            <p className="font-semibold text-lg">
              {formData.contact.primary ? `+91 ${formData.contact.primary}` : 'Not set'}
            </p>
            <div className="flex items-center mt-2">
              <div className={`w-2 h-2 rounded-full mr-2 ${primaryValid ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className="text-xs">{primaryValid ? 'Verified' : 'Required'}</span>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Alternate Contact</p>
            <p className="font-semibold text-lg">
              {formData.contact.alternate ? `+91 ${formData.contact.alternate}` : 'Not set'}
            </p>
            <p className="text-xs text-gray-400 mt-2">Optional</p>
          </div>
          
          <div className={`p-4 rounded-xl ${emailValid ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-200'}`}>
            <p className="text-sm text-gray-600 mb-1">Email Address</p>
            <p className="font-semibold text-lg truncate">
              {formData.email || 'Not set'}
            </p>
            <div className="flex items-center mt-2">
              <div className={`w-2 h-2 rounded-full mr-2 ${emailValid ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
              <span className="text-xs">{emailValid ? 'Verified' : 'Required'}</span>
            </div>
          </div>
        </div>
        
        {primaryValid && emailValid && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border border-green-300"
          >
            <p className="text-green-800 text-sm flex items-center">
              <FaCheck className="mr-2" />
              All required contact information is set and valid! Players can now reach you easily.
            </p>
          </motion.div>
        )}
      </div>

      {/* Help Text */}
      <div className="text-center">
        <p className="text-gray-500 text-sm">
          ⚡ Pro tip: Enable WhatsApp Business for automated booking confirmations and quick replies.
        </p>
      </div>

      {/* Progress Indicator for this step */}
      <div className="pt-4 mt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <span className="font-medium text-green-600">Step 3 of 4</span> • Contact Information
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <div className="w-12 h-1 bg-green-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactStep;