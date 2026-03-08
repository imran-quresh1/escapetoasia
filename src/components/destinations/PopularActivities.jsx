import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users } from 'lucide-react';

const activitiesByDestination = {
  'Dubai': [
    {
      name: 'Burj Khalifa At The Top',
      description: 'Visit the observation deck on the 124th floor of the world\'s tallest building',
      image: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=600&q=80',
      duration: '2-3 hours',
      groupSize: 'Any size'
    },
    {
      name: 'Desert Safari & BBQ Dinner',
      description: 'Thrilling dune bashing, camel rides, and traditional Bedouin camp experience',
      image: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=600&q=80',
      duration: '6 hours',
      groupSize: '2-15 people'
    },
    {
      name: 'Dubai Marina Yacht Cruise',
      description: 'Luxury yacht experience along Dubai\'s stunning waterfront',
      image: 'https://images.unsplash.com/photo-1567096820013-6f0b1796a8c4?w=600&q=80',
      duration: '2 hours',
      groupSize: '2-20 people'
    },
  ],
  'Bali': [
    {
      name: 'Ubud Rice Terrace Trek',
      description: 'Guided walk through stunning Tegalalang rice terraces',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80',
      duration: '3 hours',
      groupSize: '2-10 people'
    },
    {
      name: 'Temple & Waterfall Tour',
      description: 'Visit sacred temples and hidden waterfalls in the jungle',
      image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=80',
      duration: '5 hours',
      groupSize: '2-8 people'
    },
    {
      name: 'Sunset Beach Club',
      description: 'Relax at an exclusive beach club with ocean views',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80',
      duration: '4 hours',
      groupSize: 'Any size'
    },
  ],
  'Jaipur': [
    {
      name: 'Amber Fort & Palace Tour',
      description: 'Explore the magnificent hilltop fort with elephant ride option',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80',
      duration: '4 hours',
      groupSize: '2-12 people'
    },
    {
      name: 'City Palace & Markets',
      description: 'Discover royal heritage and vibrant bazaars of the Pink City',
      image: 'https://images.unsplash.com/photo-1603262110167-81b93a1d7382?w=600&q=80',
      duration: '3 hours',
      groupSize: '2-15 people'
    },
    {
      name: 'Traditional Rajasthani Dinner',
      description: 'Experience authentic cuisine with cultural performances',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80',
      duration: '3 hours',
      groupSize: '2-20 people'
    },
  ],
  'Ha Long Bay': [
    {
      name: 'Overnight Cruise',
      description: 'Luxury junk boat cruise through limestone karsts',
      image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&q=80',
      duration: '2 days',
      groupSize: '2-30 people'
    },
    {
      name: 'Kayaking & Cave Exploration',
      description: 'Paddle through hidden lagoons and ancient caves',
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&q=80',
      duration: '4 hours',
      groupSize: '2-10 people'
    },
    {
      name: 'Floating Village Visit',
      description: 'Discover the unique lifestyle of Ha Long\'s water communities',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80',
      duration: '3 hours',
      groupSize: '2-15 people'
    },
  ],
  'Singapore': [
    {
      name: 'Gardens by the Bay',
      description: 'Explore futuristic Supertrees and Cloud Forest dome',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80',
      duration: '3 hours',
      groupSize: 'Any size'
    },
    {
      name: 'Night Safari',
      description: 'World\'s first nocturnal wildlife park experience',
      image: 'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=600&q=80',
      duration: '4 hours',
      groupSize: '2-20 people'
    },
    {
      name: 'Hawker Centre Food Tour',
      description: 'Taste authentic local dishes at famous food centres',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80',
      duration: '3 hours',
      groupSize: '2-12 people'
    },
  ],
  'default': [
    {
      name: 'City Cultural Tour',
      description: 'Explore historical landmarks and local culture',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80',
      duration: '4 hours',
      groupSize: '2-15 people'
    },
    {
      name: 'Local Market Experience',
      description: 'Immerse yourself in vibrant local markets',
      image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=80',
      duration: '3 hours',
      groupSize: '2-10 people'
    },
  ]
};

export default function PopularActivities({ destinationName }) {
  const activities = activitiesByDestination[destinationName] || activitiesByDestination['default'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <h2 className="text-3xl font-semibold text-[#0F4C5C] mb-6">Popular Activities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + (index * 0.1) }}
            className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={activity.image}
                alt={activity.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h3 className="absolute bottom-4 left-4 text-white font-semibold text-lg">
                {activity.name}
              </h3>
            </div>
            <div className="p-4">
              <p className="text-[#5C4033]/70 text-sm mb-3">{activity.description}</p>
              <div className="flex items-center gap-4 text-xs text-[#5C4033]/60">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activity.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {activity.groupSize}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}