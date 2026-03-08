import React from 'react';
import { motion } from 'framer-motion';

const countries = [
  { name: 'All', value: 'all', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=200&q=80' },
  { name: 'UAE', value: 'United Arab Emirates', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=200&q=80' },
  { name: 'India', value: 'India', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=200&q=80' },
  { name: 'Vietnam', value: 'Vietnam', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=200&q=80' },
  { name: 'Indonesia', value: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200&q=80' },
  { name: 'Malaysia', value: 'Malaysia', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=200&q=80' },
  { name: 'Singapore', value: 'Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=200&q=80' },
];

export default function CountryFilter({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {countries.map((country) => (
        <motion.button
          key={country.value}
          onClick={() => onSelect(country.value)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative px-6 py-3 rounded-full font-medium text-sm transition-all overflow-hidden ${
            selected === country.value
              ? 'bg-[#0F4C5C] text-white shadow-lg'
              : 'bg-white text-[#5C4033] hover:bg-[#0F4C5C]/10'
          }`}
        >
          {country.name}
        </motion.button>
      ))}
    </div>
  );
}