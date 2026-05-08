import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BasicInfoStep from '../components/turfRegSteps/BasicInfoStep';
import PricingStep from '../components/turfRegSteps/PricingStep';
import ContactStep from '../components/turfRegSteps/ContactStep';
import DetailsStep from '../components/turfRegSteps/DetailsStep';
import { AddTurf } from '../services/turf.services';
import { HiArrowLeft } from "react-icons/hi";

const TurfRegistrationForm = () => {
  const id = JSON.parse(localStorage.getItem("Owner"));
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ownerId: id,
    name: '',
    images: [],
    rates: {
      standard: '',
      peakHour: '',
      weekend: ''
    },
    location: '',
    area: '',
    contact: {
      primary: '',
      alternate: ''
    },
    email: '',
    facilities: ['']
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form data
  const updateFormData = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Update array fields
  const updateArrayField = (fieldName, newArray) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: newArray
    }));
  };

  // Handle next step
  const handleNextStep = () => {
    if (activeStep < 4) {
      setActiveStep(activeStep + 1);
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Only submit if we're on the final step
    if (activeStep !== 4) {
      console.log('Not on final step, ignoring submit');
      return;
    }

    // Basic validation
    if (!formData.name?.trim() || !formData.location?.trim() || !formData.contact.primary?.trim()) {
      toast.error('Please fill in all required fields: Name, Location, and Primary Contact');
      return;
    }

    setIsSubmitting(true);
    console.log('Submitting form data:', formData);

    try {
      const res = await AddTurf(formData);
      console.log('API Response:', res);

      if (res?.success) {
        toast.success("Turf Registration Successful!");
        navigate("/ownerhome");
      } else {
        toast.error(res?.message || "❌ Registration failed");
      }

    } catch (error) {
      console.error("Error in turf registration:", error);
      toast.error("⚠️ Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { id: 1, name: 'Basic Info', icon: '🏟️' },
    { id: 2, name: 'Pricing', icon: '💰' },
    { id: 3, name: 'Contact', icon: '📞' },
    { id: 4, name: 'Details', icon: '📋' }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 to-white text-gray-800 p-4 md:p-6">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        {/* Brand Header */}
        <div className="text-center mb-8 pt-6 relative">

          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-linear-to-r from-green-600 to-emerald-500 flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-bold">CS</span>
            </div>
            <h1 className="ml-3 text-3xl font-bold text-gray-900">CrickSlot</h1>
          </div>
          <button
            onClick={() => navigate("/ownerhome")}
            className="absolute left-4 md:left-6 top-10 md:top-14 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg hover:bg-gray-50 transition"
          >
            <HiArrowLeft className="text-gray-700 text-lg" />
          </button>
          <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-linear-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
            Register Your Turf
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            List your cricket turf and start accepting bookings in minutes
          </p>

        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center space-x-1 md:space-x-4 bg-white rounded-2xl p-2 shadow-sm">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveStep(step.id)}
                  className={`px-4 py-3 rounded-xl flex items-center transition-all ${activeStep >= step.id
                    ? 'bg-linear-to-r from-green-500 to-emerald-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                >
                  <span className="text-lg mr-2">{step.icon}</span>
                  <span className="font-medium hidden md:block">{step.name}</span>
                </motion.button>
                {step.id < steps.length && (
                  <div className={`h-1 w-4 mx-2 ${activeStep > step.id ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Container - NO FORM TAG */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden max-w-4xl mx-auto"
        >
          {/* Form Header */}
          <div className="bg-linear-to-r from-green-600 to-emerald-700 p-6 text-white">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mr-4">
                {activeStep === 1 && <span className="text-2xl">🏟️</span>}
                {activeStep === 2 && <span className="text-2xl">💰</span>}
                {activeStep === 3 && <span className="text-2xl">📞</span>}
                {activeStep === 4 && <span className="text-2xl">📋</span>}
              </div>
              <div>
                <h3 className="text-2xl font-bold">{steps[activeStep - 1].name}</h3>
                <p className="text-green-100">
                  Step {activeStep} of 4 • {activeStep === 4 ? 'Final step' : 'Keep going!'}
                </p>
              </div>
            </div>
          </div>

          {/* Form Content - NO FORM TAG */}
          <div className="p-6 md:p-8">
            {/* Step 1: Basic Information */}
            {activeStep === 1 && (
              <BasicInfoStep
                formData={formData}
                updateFormData={updateFormData}
                imagePreviews={imagePreviews}
                setImagePreviews={setImagePreviews}
              />
            )}

            {/* Step 2: Pricing */}
            {activeStep === 2 && (
              <PricingStep
                formData={formData}
                updateFormData={updateFormData}
              />
            )}

            {/* Step 3: Contact Information */}
            {activeStep === 3 && (
              <ContactStep
                formData={formData}
                updateFormData={updateFormData}
              />
            )}

            {/* Step 4: Facilities */}
            {activeStep === 4 && (
              <DetailsStep
                formData={formData}
                updateFormData={updateFormData}
                updateArrayField={updateArrayField}
              />
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10 pt-8 border-t border-gray-200">
              {activeStep > 1 ? (
                <motion.button
                  whileHover={{ x: -3 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-semibold flex items-center"
                >
                  <FaChevronLeft className="mr-2" />
                  Back
                </motion.button>
              ) : (
                <div></div>
              )}

              {activeStep < 4 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleNextStep}
                  className="px-8 py-3 bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all font-semibold shadow-md shadow-green-200"
                >
                  Continue
                  <FaChevronRight className="ml-2 inline" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-linear-to-r from-green-600 to-emerald-700 text-white rounded-xl hover:from-green-700 hover:to-emerald-800 transition-all font-semibold shadow-lg shadow-green-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaCheck className="mr-2" />
                      Complete Registration
                    </>
                  )}
                </motion.button>
              )}
            </div>

            {/* Step Progress */}
            <div className="text-center mt-6">
              <div className="inline-flex items-center">
                {steps.map((step, index) => {
                  const getStepColor = () => {
                    if (activeStep > index) return 'bg-green-500';
                    if (activeStep === index + 1) return 'bg-green-400';
                    return 'bg-gray-300';
                  };

                  return (
                    <React.Fragment key={step.id}>
                      <div className={`w-3 h-3 rounded-full ${getStepColor()}`}></div>
                      {index < steps.length - 1 && (
                        <div className={`w-8 h-1 ${activeStep > index + 1 ? 'bg-green-500' : 'bg-gray-300'
                          }`}></div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
              <p className="text-gray-500 text-sm mt-2">
                {activeStep === 4 ? 'All set! Review and submit.' : `${steps[activeStep - 1].name} • Step ${activeStep} of 4`}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 text-sm mt-8 pb-8"
        >
          <p>Need help? <span className="text-green-600 font-semibold hover:underline cursor-pointer">Contact Support</span></p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TurfRegistrationForm;