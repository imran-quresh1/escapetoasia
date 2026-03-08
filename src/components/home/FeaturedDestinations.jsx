import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

const destinations = [
  {
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    price: 1299,
  },
  {
    name: 'Jaipur',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80',
    price: 1099,
  },
  {
    name: 'Ha Long Bay',
    country: 'Vietnam',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80',
    price: 1199,
  },
  {
    name: 'Singapore',
    country: 'Singapore',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80',
    price: 1499,
  },
];

export default function FeaturedDestinations() {
  return (
    <section className="py-24 px-4 bg-[#F5F1EB]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#D4A574] text-sm font-medium tracking-widest uppercase">
            Featured Destinations
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-[#0F4C5C] mt-4 mb-6">
            Where Will You <span className="font-semibold">Wander?</span>
          </h2>
          <p className="text-[#5C4033]/70 max-w-2xl mx-auto text-lg">
            Handpicked destinations offering unforgettable experiences, rich cultures, and breathtaking landscapes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link to={createPageUrl('Destinations')}>
                <div className="relative h-[400px] rounded-2xl overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-1 text-white/80 text-sm mb-2">
                      <MapPin className="w-4 h-4" />
                      {dest.country}
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-2">{dest.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-[#D4A574] font-medium">
                        From £{dest.price}
                      </span>
                      <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-[#D4A574] transition-colors">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to={createPageUrl('Destinations')}
            className="inline-flex items-center gap-2 text-[#0F4C5C] font-medium hover:text-[#D4A574] transition-colors group"
          >
            View All Destinations
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}