import React from 'react';
import SEO from '@/components/SEO';
import HeroSection from '../components/home/HeroSection';
import FeaturedDestinations from '../components/home/FeaturedDestinations';
import ServicesOverview from '../components/home/ServicesOverview';
import Testimonials from '../components/home/Testimonials';
import CTASection from '../components/home/CTASection';

export default function Home() {
  return (
    <div>
      <SEO path="" />
      <HeroSection />
      <FeaturedDestinations />
      <ServicesOverview />
      <Testimonials />
      <CTASection />
    </div>
  );
}