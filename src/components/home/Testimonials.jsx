import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    location: 'New York, USA',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    text: 'Our trip to Vietnam was absolutely perfect. From the moment we landed, everything was seamlessly arranged. Our guide was incredible and showed us places we never would have found on our own.',
    destination: 'Vietnam',
  },
  {
    name: 'James Chen',
    location: 'London, UK',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    text: 'The Bali package exceeded all expectations. The private villa, the temple visits at sunrise, the cooking class - every detail was thoughtfully planned. Truly a once-in-a-lifetime experience.',
    destination: 'Indonesia',
  },
  {
    name: 'Emma Rodriguez',
    location: 'Toronto, Canada',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    text: 'India can be overwhelming for first-time visitors, but Wanderlux made it magical. Our personal guide helped us navigate the chaos beautifully. The Golden Triangle tour was unforgettable.',
    destination: 'India',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 px-4 bg-[#F5F1EB]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#D4A574] text-sm font-medium tracking-widest uppercase">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-[#0F4C5C] mt-4">
            Stories from <span className="font-semibold">Travelers</span>
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
            >
              <Quote className="w-12 h-12 text-[#D4A574]/30 mb-6" />
              
              <p className="text-xl md:text-2xl text-[#5C4033] leading-relaxed mb-8 font-light">
                "{testimonials[current].text}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-[#0F4C5C]">{testimonials[current].name}</h4>
                  <p className="text-[#5C4033]/60 text-sm">{testimonials[current].location}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4A574] text-[#D4A574]" />
                    ))}
                  </div>
                </div>
                <div className="ml-auto">
                  <span className="text-sm text-[#D4A574] font-medium">
                    Trip to {testimonials[current].destination}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#0F4C5C] hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    current === index ? 'w-8 bg-[#D4A574]' : 'bg-[#0F4C5C]/20'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#0F4C5C] hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}