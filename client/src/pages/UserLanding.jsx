// CrickSlotUI.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiLocationMarker, HiCalendar } from 'react-icons/hi';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { topTurfs } from "../data/topTurfs";
import { tournaments } from "../data/Tournament";
import { reviews } from "../data/Review";
import HeroSection from '../components/herosection';
import Sachin from "../assets/sachin.jpg";
import About from "../assets/about.png";
import {faqs} from "../data/FAQuestion";
import RatingStars from '../components/common/RatingStars';
import { Button } from '../components/common/Button';
import { FilterBar } from '../components/userlanding/FilterBar';
import TopRatedTurfs from '../components/userlanding/TopRatedTurfs';
import { TournamentSection } from '../components/userlanding/TournamentSection';

const Sachinadd = () => {
  return (
    <div className="w-full mb-10">
      <img
        src={Sachin}
        alt="Sachin banner"
        className="w-full h-[450px] object-cover"
      />
    </div>
  );
};

// ========================== About Section ==========================
const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-[#DEFFE0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Image Side - Fixed for mobile */}
          <div className="lg:w-1/2 w-full">
            <motion.div
              className="h-64 md:h-80 lg:h-96 bg-cover bg-center rounded-2xl shadow-lg"
              style={{ backgroundImage: `url(${About})` }}
              whileHover={{ scale: 1.02 }}
            ></motion.div>
          </div>

          {/* Content Side */}
          <div className="lg:w-1/2 w-full">
            <motion.h2
              className="text-3xl font-bold text-gray-800 mb-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              About CrickSlot
            </motion.h2>

            <div className="space-y-4 text-gray-600">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                At CrickSlot, we're all about the game. Whether it's a 5-a-side football match under the lights,
                a quick cricket session with your gang, or hosting your own tournament — we've got you covered
                with the best turfs in town.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                No calls. No confusion. Just open, book, and play. It's that simple.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                We've handpicked turfs that score high on vibe, quality, and location, so you spend more
                time playing and less time planning. From smooth turf to perfect lighting, we
                make sure every match feels like match day.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Each booking rewards you with CrickSlot points which, when accumulated enough, can be
                used to book turf at cheaper rates.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                So gather your squad, pick your sport, and let's play!
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};



// ========================== Review ==========================
const Review = () => {
  return (
    <section className="py-16 bg-[#ECF9E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-bold text-gray-800 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          What our customer says 
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#326B0F] rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              </div>
              <RatingStars rating={review.rating} />
              <p className="text-gray-600 mt-3 line-clamp-3">{review.comment}</p>
              <button className="text-[#326B0F] font-semibold mt-2 hover:underline">
                Read More
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ========================== Near Me ==========================
const NearMe = () => {
  const ashokNagarTurfs = topTurfs.filter(turf => turf.area === "Ashok nagar").slice(0, 3);

  // Add this function to handle turf clicks
  const handleTurfClick = (turfId) => {
    // Add your navigation or modal logic here
    console.log('Turf clicked:', turfId);
    // Example: navigate(`/turf/${turfId}`);
  };

  return (
    <section className="py-20 px-5 w-full max-w-[1500px] mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">
          Turfs in Ashok Nagar
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the best turfs in Ashok Nagar area
        </p>
      </div>

      {/* Only Images - Limited to 3 */}
      {ashokNagarTurfs.length > 0 ? (
        <div className="flex items-center justify-center gap-5 flex-wrap">
          {ashokNagarTurfs.map((turf, index) => {
            const isCenter = index === 1; // Middle card
            const isSide = index === 0 || index === 2; // Side cards
            
            let sizeClass = '';
            if (isCenter) {
              sizeClass = 'w-[500px] h-[350px]';
            } else if (isSide) {
              sizeClass = 'w-[300px] h-[220px]';
            } else {
              sizeClass = 'w-[280px] h-[200px]';
            }

            return (
              <button
                key={turf.id}
                className={`
                  rounded-2xl overflow-hidden transition-all duration-300 ease-in-out cursor-pointer
                  border-none outline-none focus:ring-2 focus:ring-[#326B0F] focus:ring-offset-2
                  ${sizeClass}
                  ${isCenter ? 'shadow-[0_20px_40px_rgba(0,0,0,0.15)]' : 'shadow-[0_10px_25px_rgba(0,0,0,0.1)]'}
                `}
                style={{
                  backgroundImage: `url(${turf.images})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = isCenter 
                    ? '0 20px 40px rgba(0,0,0,0.15)' 
                    : '0 10px 25px rgba(0,0,0,0.1)';
                }}
                onClick={() => handleTurfClick(turf.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleTurfClick(turf.id);
                  }
                }}
                aria-label={`View ${turf.name} turf in ${turf.location}`}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-600">
          <p>No turfs found in Ashok Nagar area.</p>
        </div>
      )}
    </section>
  );
};

// ========================== FAQ Section ==========================
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Show only first 5 FAQs initially, show all when "See All" is clicked
  const displayedFaqs = showAll ? faqs : faqs.slice(0, 5);

  return (
    <section className="py-20 bg-white px-5 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Find answers to common questions about turf bookings, facilities, and rules.
        </p>
      </div>

      {/* FAQ Items */}
      <div className="max-w-4xl mx-auto">
        {displayedFaqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-300">
            <button
              className="w-full text-left py-6 cursor-pointer focus:outline-none focus:ring-offset-2 focus:rounded-lg transition-all duration-200 hover:bg-gray-50 px-4 rounded-lg"
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-content-${index}`}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 flex-1 pr-4">
                  {faq.question}
                </h3>
                <span className={`
                  text-2xl font-light text-blue-600 transition-transform duration-300 shrink-0
                  ${openIndex === index ? 'rotate-45' : 'rotate-0'}
                `}>
                  +
                </span>
              </div>
              
              {/* Answer inside the button but only when expanded */}
              {openIndex === index && (
                <div 
                  id={`faq-content-${index}`}
                  className="mt-4 pl-4 bg-gray-50 rounded-lg"
                >
                  <p className="p-4 m-0 text-gray-700 leading-relaxed text-base">
                    {faq.answer}
                  </p>
                </div>
              )}
            </button>
          </div>
        ))}

        {/* See All / Show Less Button */}
        {faqs.length > 5 && (
          <div className="text-center mt-10">
            <Button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 bg-[#1F3D25] text-white rounded-full font-semibold hover:bg-[#326B0F] transition-all duration-300 hover:-translate-y-0.5"
            >
              {showAll ? 'Show Less' : 'See All Questions'}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
// ========================== Contact Section ==========================
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-bold text-gray-800 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Contact Us
        </motion.h2>

        <div className="bg-[#DEFFE0] rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Get in Touch</h3>

              <div className="flex items-center space-x-4">
                <div className="bg-[#326B0F] p-3 rounded-full">
                  <HiLocationMarker className="text-white text-xl" />
                </div>
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-gray-600">123 Sports Complex, Ashok Nagar, Nashik</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-[#326B0F] p-3 rounded-full">
                  <HiCalendar className="text-white text-xl" />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-600">crickslot@gmail.com</p>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex space-x-4 mt-6">
                <motion.a 
                  whileHover={{ scale: 1.2 }} 
                  className="bg-[#326B0F] p-2 rounded-full text-white"
                >
                  <FaFacebook size={20} />
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.2 }} 
                  className="bg-[#326B0F] p-2 rounded-full text-white"
                >
                  <FaTwitter size={20} />
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.2 }} 
                  className="bg-[#326B0F] p-2 rounded-full text-white"
                >
                  <FaInstagram size={20} />
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.2 }} 
                  className="bg-[#326B0F] p-2 rounded-full text-white"
                >
                  <FaWhatsapp size={20} />
                </motion.a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-[#326B0F]"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-[#326B0F]"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-white rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-[#326B0F]"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <Button type="submit" className="w-full">Send Message</Button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};

// ========================== Main Component ==========================
const UserLanding = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <FilterBar />
      <TopRatedTurfs />
      <Sachinadd />
       <TournamentSection />
      <AboutSection />
      {/* <NearMe /> */}
      <Review />
      <FAQSection />
      <ContactSection />
    </div>
  );
};

export default UserLanding;