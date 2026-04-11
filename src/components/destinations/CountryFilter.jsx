import React from 'react';
import { motion } from 'framer-motion';

const img = (f) => import.meta.env.BASE_URL + 'images/' + f;

const countries = [
  { name: 'All', value: 'all', image: img('filter-all-200.jpg') },
  { name: 'UAE', value: 'United Arab Emirates', image: img('filter-uae-200.jpg') },
  { name: 'India', value: 'India', image: img('india-200.jpg') },
  { name: 'Vietnam', value: 'Vietnam', image: img('vietnam-200.jpg') },
  { name: 'Indonesia', value: 'Indonesia', image: img('bali-200.jpg') },
  { name: 'Malaysia', value: 'Malaysia', image: img('filter-malaysia-200.jpg') },
  { name: 'Singapore', value: 'Singapore', image: img('singapore-200.jpg') },
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