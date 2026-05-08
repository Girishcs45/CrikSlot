import { motion } from 'framer-motion';
import heroBackground from '../assets/herosection.png';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-96 flex items-center justify-center">
      {/* Background Image as img element */}
      <img 
        src={heroBackground} 
        alt="Cricket Turf Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Light overlay for text readability */}
      <div className="absolute inset-0 bg-opacity-30"></div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 text-center text-white px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
          CrickSlot
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-2xl">
          "Fuel Your Passion. Own the Pitch."
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="inline-block"
        >
          <button className="bg-white text-[#326B0F] text-3xl font-bold rounded-lg px-8 py-4 drop-shadow-2xl" onClick ={() =>{
            navigate("/bookslot")
          }}>
            BOOK TURF, PLAY MORE
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;