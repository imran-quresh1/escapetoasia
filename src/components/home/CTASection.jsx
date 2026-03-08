import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1920&q=80"
          alt="Travel adventure"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0F4C5C]/80" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-light text-white mb-6">
            Ready to Start Your <span className="font-semibold text-[#D4A574]">Adventure?</span>
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Let us craft your perfect Asian journey. From dream to destination, we're with you every step of the way.
          </p>
          <Link
            to={createPageUrl('Contact')}
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#D4A574] text-white font-medium rounded-full hover:bg-[#C49464] transition-all hover:shadow-2xl text-lg group"
          >
            Start Planning Today
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}