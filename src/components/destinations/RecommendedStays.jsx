import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star } from 'lucide-react';

const staysByDestination = {
  'Dubai': [
    {
      name: 'Burj Al Arab Jumeirah',
      stars: 5,
      description: 'Iconic sail-shaped luxury hotel with world-class service',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
      location: 'Jumeirah Beach',
      amenities: ['Private Beach', 'Infinity Pool', 'Spa', 'Fine Dining']
    },
    {
      name: 'Atlantis The Palm',
      stars: 5,
      description: 'Spectacular resort on Palm Jumeirah with aquarium and waterpark',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80',
      location: 'Palm Jumeirah',
      amenities: ['Aquaventure', 'Dolphin Bay', 'Beach Access', 'Multiple Restaurants']
    }
  ],
  'Bali': [
    {
      name: 'The Mulia Resort',
      stars: 5,
      description: 'Beachfront luxury with stunning ocean views',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80',
      location: 'Nusa Dua',
      amenities: ['Private Beach', 'Spa', 'Infinity Pools', 'Fine Dining']
    },
    {
      name: 'Hanging Gardens of Bali',
      stars: 5,
      description: 'Iconic jungle resort with famous infinity pool',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80',
      location: 'Ubud',
      amenities: ['Jungle Views', 'Spa', 'Yoga', 'Organic Restaurant']
    }
  ],
  'Jaipur': [
    {
      name: 'Rambagh Palace',
      stars: 5,
      description: 'Former royal residence turned heritage hotel',
      image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=600&q=80',
      location: 'City Centre',
      amenities: ['Palace Gardens', 'Royal Spa', 'Fine Dining', 'Heritage Tours']
    },
    {
      name: 'The Oberoi Rajvilas',
      stars: 5,
      description: 'Luxury resort with traditional Rajasthani architecture',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80',
      location: 'Goner Road',
      amenities: ['Private Villas', 'Pool', 'Spa', 'Cultural Performances']
    }
  ],
  'default': [
    {
      name: 'Luxury Resort & Spa',
      stars: 5,
      description: 'Premium accommodation with world-class facilities',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
      location: 'Prime Location',
      amenities: ['Pool', 'Spa', 'Restaurant', 'Gym']
    }
  ]
};

export default function RecommendedStays({ destinationName }) {
  const stays = staysByDestination[destinationName] || staysByDestination['default'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <h2 className="text-3xl font-semibold text-[#0F4C5C] mb-6">Recommended Stays</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stays.map((stay, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + (index * 0.1) }}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={stay.image}
                alt={stay.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-[#0F4C5C] text-lg">{stay.name}</h3>
                <div className="flex items-center gap-1">
                  {[...Array(stay.stars)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#D4A574] text-[#D4A574]" />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#5C4033]/60 mb-3">
                <MapPin className="w-3 h-3" />
                {stay.location}
              </div>
              <p className="text-sm text-[#5C4033]/70 mb-4">{stay.description}</p>
              <div className="flex flex-wrap gap-2">
                {stay.amenities.map((amenity, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[#F5F1EB] text-xs text-[#5C4033] rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}