import React from 'react';
import { motion } from 'framer-motion';
import { Package, Users, User, Plane, Hotel, Compass } from 'lucide-react';

const services = [
  {
    icon: Package,
    title: 'All-Inclusive Packages',
    description: 'Complete holiday packages with flights, hotels, transfers and excursions — everything arranged for you.',
  },
  {
    icon: Users,
    title: 'Group Tours',
    description: 'Join like-minded travellers on expertly curated group adventures with professional tour guides.',
  },
  {
    icon: User,
    title: 'Private Packages',
    description: 'Bespoke private holidays tailored to your preferences with your own personal tour guide.',
  },
  {
    icon: Plane,
    title: 'Flight & Transfers',
    description: 'Return flights from UK airports plus all airport pickups and ground transportation included.',
  },
  {
    icon: Hotel,
    title: 'Hotel Accommodation',
    description: 'Handpicked hotels from comfortable 3-star to luxury 5-star resorts, all pre-arranged.',
  },
  {
    icon: Compass,
    title: 'Guided Excursions',
    description: 'Daily excursions to iconic landmarks and hidden gems with expert local guides.',
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-24 px-4 bg-[#0F4C5C]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#D4A574] text-sm font-medium tracking-widest uppercase">
            Packaged Holidays
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-white mt-4 mb-6">
            Everything <span className="font-semibold">Included</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Our all-inclusive packages cover flights, hotels, excursions and personal tour guides — group tours or private, we've got you covered.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/10 hover:border-[#D4A574]/50"
            >
              <div className="w-14 h-14 rounded-xl bg-[#D4A574]/20 flex items-center justify-center mb-6 group-hover:bg-[#D4A574] transition-colors">
                <service.icon className="w-7 h-7 text-[#D4A574] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
              <p className="text-white/60 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}