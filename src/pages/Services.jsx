import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { Plane, Hotel, Car, Map, Users, Compass, Check, ArrowRight, Shield, Clock, Heart } from 'lucide-react';

const services = [
  {
    icon: Plane,
    title: 'Flight Bookings',
    description: 'We partner with leading airlines to offer you the best routes and rates. Whether you prefer direct flights or scenic stopovers, we handle all the details.',
    features: ['Best price guarantee', 'Flexible booking options', 'All major airlines', '24/7 support'],
  },
  {
    icon: Car,
    title: 'Airport Transfers',
    description: 'Your journey begins the moment you land. Our professional drivers greet you at arrivals and ensure comfortable transfers throughout your trip.',
    features: ['Meet & greet service', 'Premium vehicles', 'Real-time tracking', 'Available 24/7'],
  },
  {
    icon: Hotel,
    title: 'Hotel Accommodations',
    description: 'From boutique hideaways to world-class resorts, we curate accommodations that match your style and budget, all personally vetted by our team.',
    features: ['Hand-picked properties', 'Best rate guarantee', 'Special amenities', 'Loyalty benefits'],
  },
  {
    icon: Compass,
    title: 'Curated Excursions',
    description: 'Discover hidden gems and iconic landmarks with our carefully designed excursions. Each experience is crafted to reveal the authentic spirit of each destination.',
    features: ['Small group sizes', 'Local experiences', 'Skip-the-line access', 'Unique activities'],
  },
  {
    icon: Users,
    title: 'Personal Tour Guides',
    description: 'Our expert local guides bring destinations to life with insider knowledge, cultural insights, and genuine passion for their homeland.',
    features: ['Licensed professionals', 'Multiple languages', 'Local expertise', 'Personalized attention'],
  },
  {
    icon: Map,
    title: 'Custom Itineraries',
    description: 'No two travelers are alike. We design bespoke itineraries tailored to your interests, pace, and travel style for a truly personal journey.',
    features: ['Tailored experiences', 'Flexible planning', 'Expert recommendations', 'Real-time adjustments'],
  },
];

const whyUs = [
  {
    icon: Shield,
    title: 'Trusted Expertise',
    description: '15+ years of crafting unforgettable Asian journeys',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Always there when you need us, anywhere in the world',
  },
  {
    icon: Heart,
    title: 'Personal Touch',
    description: 'Every detail curated with care and attention',
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-[#F5F1EB]">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80"
            alt="Our Services"
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
              What We Offer
            </span>
            <h1 className="text-5xl md:text-6xl font-light text-white mt-4">
              Our <span className="font-semibold">Services</span>
            </h1>
            <p className="text-white/80 text-lg mt-4 max-w-2xl mx-auto">
              Complete home-to-home travel packages designed for seamless, unforgettable experiences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-[#0F4C5C]/10 flex items-center justify-center mb-6 group-hover:bg-[#D4A574] transition-colors">
                  <service.icon className="w-7 h-7 text-[#0F4C5C] group-hover:text-white transition-colors" />
                </div>
                
                <h3 className="text-xl font-semibold text-[#0F4C5C] mb-3">{service.title}</h3>
                <p className="text-[#5C4033]/70 mb-6 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#5C4033]/80">
                      <Check className="w-4 h-4 text-[#D4A574]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-4 bg-[#0F4C5C]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#D4A574] text-sm font-medium tracking-widest uppercase">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-light text-white mt-4">
              Travel with <span className="font-semibold">Confidence</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full bg-[#D4A574]/20 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-10 h-10 text-[#D4A574]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-white/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-[#0F4C5C] mb-6">
              Ready to <span className="font-semibold text-[#D4A574]">Begin?</span>
            </h2>
            <p className="text-xl text-[#5C4033]/70 mb-10">
              Tell us about your dream trip and let us make it a reality.
            </p>
            <Link
              to={createPageUrl('Contact')}
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#D4A574] text-white font-medium rounded-full hover:bg-[#C49464] transition-all hover:shadow-2xl text-lg group"
            >
              Start Planning
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}