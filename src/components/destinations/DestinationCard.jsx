import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

export default function DestinationCard({ destination, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Link to={createPageUrl(`DestinationDetail?id=${destination.id}`)}>
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
          <div className="relative h-64 overflow-hidden">
            <img
              src={destination.image_url}
              alt={destination.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-[#0F4C5C]">
                {destination.country}
              </span>
            </div>
            {destination.featured && (
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-[#D4A574] rounded-full text-sm font-medium text-white">
                  Featured
                </span>
              </div>
            )}
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-semibold text-[#0F4C5C] mb-2 group-hover:text-[#D4A574] transition-colors">
              {destination.name}
            </h3>
            <p className="text-[#5C4033]/70 text-sm mb-4 line-clamp-2">
              {destination.description}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                {destination.duration_days && (
                  <div className="flex items-center gap-1 text-sm text-[#5C4033]/60">
                    <Clock className="w-4 h-4" />
                    {destination.duration_days} days
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {destination.starting_price && (
                  <span className="text-[#D4A574] font-semibold">
                    From £{destination.starting_price}
                  </span>
                )}
                <span className="w-8 h-8 rounded-full bg-[#0F4C5C]/10 flex items-center justify-center group-hover:bg-[#D4A574] transition-colors">
                  <ArrowRight className="w-4 h-4 text-[#0F4C5C] group-hover:text-white transition-colors" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}