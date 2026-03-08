import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { MapPin, Clock, Check, ArrowRight, Loader2 } from 'lucide-react';
import PopularActivities from '../components/destinations/PopularActivities';
import RecommendedStays from '../components/destinations/RecommendedStays';

export default function DestinationDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const destinationId = urlParams.get('id');

  const { data: destination, isLoading } = useQuery({
    queryKey: ['destination', destinationId],
    queryFn: async () => {
      const destinations = await base44.entities.Destination.list();
      return destinations.find(d => d.id === destinationId);
    },
    enabled: !!destinationId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F1EB]">
        <Loader2 className="w-8 h-8 animate-spin text-[#0F4C5C]" />
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F1EB] px-4">
        <h1 className="text-2xl font-semibold text-[#0F4C5C] mb-4">Destination not found</h1>
        <Link
          to={createPageUrl('Destinations')}
          className="text-[#D4A574] hover:underline"
        >
          Browse all destinations
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1EB]">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px]">
        <div className="absolute inset-0">
          <img
            src={destination.image_url}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 text-white/80 mb-4">
                <MapPin className="w-5 h-5" />
                <span>{destination.country}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-light text-white mb-4">
                {destination.name}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                {destination.duration_days && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{destination.duration_days} days recommended</span>
                  </div>
                )}
                {destination.starting_price && (
                  <div className="text-[#D4A574] text-2xl font-semibold">
                    From £{destination.starting_price}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl font-semibold text-[#0F4C5C] mb-6">About This Destination</h2>
                <p className="text-[#5C4033]/80 text-lg leading-relaxed">
                  {destination.description}
                </p>
              </motion.div>

              {destination.highlights && destination.highlights.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-3xl font-semibold text-[#0F4C5C] mb-6">Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {destination.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-white rounded-xl"
                      >
                        <div className="w-6 h-6 rounded-full bg-[#D4A574]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-[#D4A574]" />
                        </div>
                        <span className="text-[#5C4033]">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-3xl font-semibold text-[#0F4C5C] mb-6">What's Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Round-trip flights',
                    'Airport pickup & drop-off',
                    'Luxury hotel accommodation',
                    'Daily breakfast',
                    'Personal tour guide',
                    'All entrance fees',
                    'Local transportation',
                    'Curated excursions',
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-white rounded-xl"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#0F4C5C]/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-[#0F4C5C]" />
                      </div>
                      <span className="text-[#5C4033]">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Popular Activities */}
              <PopularActivities destinationName={destination.name} />

              {/* Recommended Stays */}
              <RecommendedStays destinationName={destination.name} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="sticky top-32"
              >
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <h3 className="text-2xl font-semibold text-[#0F4C5C] mb-2">
                    Ready to explore?
                  </h3>
                  <p className="text-[#5C4033]/60 mb-6">
                    Let us plan your perfect trip to {destination.name}
                  </p>
                  
                  {destination.starting_price && (
                    <div className="mb-6 p-4 bg-[#F5F1EB] rounded-xl">
                      <span className="text-sm text-[#5C4033]/60">Starting from</span>
                      <div className="text-3xl font-bold text-[#D4A574]">
                        £{destination.starting_price}
                        <span className="text-sm font-normal text-[#5C4033]/60"> /person</span>
                      </div>
                    </div>
                  )}

                  <Link
                    to={createPageUrl(`Contact?destination=${encodeURIComponent(destination.name)}`)}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#D4A574] text-white font-medium rounded-full hover:bg-[#C49464] transition-all group"
                  >
                    Inquire Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <p className="text-center text-sm text-[#5C4033]/50 mt-4">
                    No commitment required
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}