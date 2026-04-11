import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users } from 'lucide-react';

const img = (f) => import.meta.env.BASE_URL + 'images/' + f;

const activitiesByDestination = {
  'Dubai': [
    {
      name: 'Burj Khalifa At The Top',
      description: 'Visit the observation deck on the 124th floor of the world\'s tallest building',
      image: img('activity-temples-600.jpg'),
      duration: '2-3 hours',
      groupSize: 'Any size'
    },
    {
      name: 'Desert Safari & BBQ Dinner',
      description: 'Thrilling dune bashing, camel rides, and traditional Bedouin camp experience',
      image: img('activity-diving-600.jpg'),
      duration: '6 hours',
      groupSize: '2-15 people'
    },
    {
      name: 'Dubai Marina Yacht Cruise',
      description: 'Luxury yacht experience along Dubai\'s stunning waterfront',
      image: img('activity-cooking-600.jpg'),
      duration: '2 hours',
      groupSize: '2-20 people'
    },
  ],
  'Bali': [
    {
      name: 'Ubud Rice Terrace Trek',
      description: 'Guided walk through stunning Tegalalang rice terraces',
      image: img('bali-600.jpg'),
      duration: '3 hours',
      groupSize: '2-10 people'
    },
    {
      name: 'Temple & Waterfall Tour',
      description: 'Visit sacred temples and hidden waterfalls in the jungle',
      image: img('activity-desert-600.jpg'),
      duration: '5 hours',
      groupSize: '2-8 people'
    },
    {
      name: 'Sunset Beach Club',
      description: 'Relax at an exclusive beach club with ocean views',
      image: img('activity-sailing-600.jpg'),
      duration: '4 hours',
      groupSize: 'Any size'
    },
  ],
  'Jaipur': [
    {
      name: 'Amber Fort & Palace Tour',
      description: 'Explore the magnificent hilltop fort with elephant ride option',
      image: img('india-600.jpg'),
      duration: '4 hours',
      groupSize: '2-12 people'
    },
    {
      name: 'City Palace & Markets',
      description: 'Discover royal heritage and vibrant bazaars of the Pink City',
      image: img('activity-safari-600.jpg'),
      duration: '3 hours',
      groupSize: '2-15 people'
    },
    {
      name: 'Traditional Rajasthani Dinner',
      description: 'Experience authentic cuisine with cultural performances',
      image: img('activity-street-food-600.jpg'),
      duration: '3 hours',
      groupSize: '2-20 people'
    },
  ],
  'Ha Long Bay': [
    {
      name: 'Overnight Cruise',
      description: 'Luxury junk boat cruise through limestone karsts',
      image: img('activity-trekking-600.jpg'),
      duration: '2 days',
      groupSize: '2-30 people'
    },
    {
      name: 'Kayaking & Cave Exploration',
      description: 'Paddle through hidden lagoons and ancient caves',
      image: img('vietnam-600.jpg'),
      duration: '4 hours',
      groupSize: '2-10 people'
    },
    {
      name: 'Floating Village Visit',
      description: 'Discover the unique lifestyle of Ha Long\'s water communities',
      image: img('activity-sailing-600.jpg'),
      duration: '3 hours',
      groupSize: '2-15 people'
    },
  ],
  'Singapore': [
    {
      name: 'Gardens by the Bay',
      description: 'Explore futuristic Supertrees and Cloud Forest dome',
      image: img('singapore-600.jpg'),
      duration: '3 hours',
      groupSize: 'Any size'
    },
    {
      name: 'Night Safari',
      description: 'World\'s first nocturnal wildlife park experience',
      image: img('activity-beach-600.jpg'),
      duration: '4 hours',
      groupSize: '2-20 people'
    },
    {
      name: 'Hawker Centre Food Tour',
      description: 'Taste authentic local dishes at famous food centres',
      image: img('activity-street-food-600.jpg'),
      duration: '3 hours',
      groupSize: '2-12 people'
    },
  ],
  'default': [
    {
      name: 'City Cultural Tour',
      description: 'Explore historical landmarks and local culture',
      image: img('activity-cycling-600.jpg'),
      duration: '4 hours',
      groupSize: '2-15 people'
    },
    {
      name: 'Local Market Experience',
      description: 'Immerse yourself in vibrant local markets',
      image: img('activity-yoga-600.jpg'),
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