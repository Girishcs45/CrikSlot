import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaImage, FaUpload, FaTimes } from 'react-icons/fa';

const BasicInfoStep = ({ formData, updateFormData, imagePreviews, setImagePreviews }) => {
  
  

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    const newPreviews = [];
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === files.length) {
          setImagePreviews(prev => [...prev, ...newPreviews].slice(0, 3));
        }
      };
      reader.readAsDataURL(file);
    });
    
    // Update form data with file names
    updateFormData('images', [...formData.images, ...files.map(f => f.name)]);
  };

  // Remove image
  const removeImage = (index) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    const newImages = formData.images.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
    updateFormData('images', newImages);
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="space-y-6"
    >
      {/* Turf Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Turf Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => updateFormData('name', e.target.value)}
          required
          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          placeholder="Enter your turf name (e.g., City Cricket Arena)"
        />
        <p className="text-gray-500 text-sm mt-1">Choose a catchy name that players will remember</p>
      </div>

      {/* Location Fields */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <FaMapMarkerAlt className="inline mr-2 text-green-600" />
            Street Address *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={(e) => updateFormData('location', e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="123 Cricket Street, Andheri West"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Area *
          </label>
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={(e) => updateFormData('area', e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Mumbai, Maharashtra"
          />
        </div>
      </div>

      {/* Map Preview Suggestion */}
      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm text-blue-700">
          💡 <span className="font-semibold">Tip:</span> Ensure your address is accurate. Players will use this for directions.
        </p>
      </div>

      {/* Image Upload */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            <FaImage className="inline mr-2 text-green-600" />
            Turf Photos *
          </label>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
            {imagePreviews.length}/3 uploaded
          </span>
        </div>
        
        <div className="mt-2">
          {/* Image Preview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {imagePreviews.map((preview, index) => (
              <motion.div 
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative group"
              >
                <div className="relative overflow-hidden rounded-lg border-2 border-gray-300 group-hover:border-green-500 transition-all duration-300">
                  <img 
                    src={preview} 
                    alt={`Turf preview ${index + 1}`}
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg hover:bg-red-600"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-center">Photo {index + 1}</p>
              </motion.div>
            ))}
            
            {/* Upload Button */}
            {imagePreviews.length < 3 && (
              <motion.label 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer"
              >
                <div className="w-full h-48 border-3 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-green-500 hover:bg-green-50 transition-all bg-gray-50 group">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
                    <FaUpload className="text-2xl text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Add Photo</span>
                  <span className="text-gray-400 text-sm mt-1">Click to upload</span>
                  <span className="text-gray-300 text-xs mt-2">JPG, PNG up to 5MB</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </motion.label>
            )}
          </div>

          {/* Upload Tips */}
          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center">
              📸 Photo Guidelines
            </h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Upload 2-3 clear photos showing different angles</li>
              <li>• Include a main entrance photo</li>
              <li>• Show turf condition and facilities</li>
              <li>• Well-lit photos attract more bookings</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Progress Indicator for this step */}
      <div className="pt-4 mt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <span className="font-medium text-green-600">Step 1 of 4</span> • Basic Information
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

export default BasicInfoStep;