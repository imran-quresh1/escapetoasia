import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { motion } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1920&q=80"
          alt="Beautiful Asian landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-sm font-medium tracking-wider mb-6">
            ALL-INCLUSIVE PACKAGED HOLIDAYS
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 leading-tight"
        >
          Journey Beyond
          <span className="block font-semibold text-[#D4A574]">Ordinary</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 font-light leading-relaxed"
        >
          Complete packaged holidays with flights, hotels, excursions and personal tour guides. 
          Choose from group tours or bespoke private packages tailored to your journey.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to={createPageUrl('Destinations')}
            className="px-8 py-4 bg-[#D4A574] text-white font-medium rounded-full hover:bg-[#C49464] transition-all hover:shadow-2xl hover:scale-105 text-lg"
          >
            Explore Destinations
          </Link>
          <Link
            to={createPageUrl('Contact')}
            className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-medium rounded-full hover:bg-white/20 transition-all border border-white/30 text-lg"
          >
            Plan Your Trip
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center text-white/60"
        >
          <span className="text-xs tracking-widest mb-2">SCROLL</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}