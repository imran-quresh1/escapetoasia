import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import DestinationCard from '../components/destinations/DestinationCard';
import CountryFilter from '../components/destinations/CountryFilter';
import { Loader2, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Destinations() {
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: destinations = [], isLoading } = useQuery({
    queryKey: ['destinations'],
    queryFn: () => base44.entities.Destination.list(),
  });

  const filteredDestinations = useMemo(() => {
    let results = destinations;
    
    // Filter by country
    if (selectedCountry !== 'all') {
      results = results.filter(d => d.country === selectedCountry);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      results = results.filter(d => 
        d.name?.toLowerCase().includes(query) ||
        d.country?.toLowerCase().includes(query) ||
        d.description?.toLowerCase().includes(query) ||
        d.highlights?.some(h => h.toLowerCase().includes(query))
      );
    }
    
    return results;
  }, [destinations, selectedCountry, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F5F1EB]">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80"
            alt="Destinations"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#D4A574] text-sm font-medium tracking-widest uppercase">
              Explore Asia
            </span>
            <h1 className="text-5xl md:text-6xl font-light text-white mt-4">
              Our <span className="font-semibold">Destinations</span>
            </h1>
            <p className="text-white/80 text-lg mt-4 max-w-2xl mx-auto">
              Discover enchanting destinations across Dubai, India, Vietnam, Indonesia, Malaysia, and Singapore
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5C4033]/40" />
              <Input
                type="text"
                placeholder="Search destinations, countries, or experiences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-12 text-lg rounded-full border-2 border-[#0F4C5C]/10 focus:border-[#D4A574] bg-white shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#5C4033]/10 flex items-center justify-center hover:bg-[#5C4033]/20 transition-colors"
                >
                  <X className="w-4 h-4 text-[#5C4033]" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-center text-sm text-[#5C4033]/60 mt-3">
                Found {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
            )}
          </div>
          
          {/* Country Filter */}
          <CountryFilter selected={selectedCountry} onSelect={setSelectedCountry} />
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#0F4C5C]" />
            </div>
          ) : filteredDestinations.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#5C4033]/60 text-lg">No destinations found for this country.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((destination, index) => (
                <DestinationCard key={destination.id} destination={destination} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}