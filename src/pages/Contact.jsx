import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Send, Phone, Mail, MapPin, CheckCircle, Loader2 } from 'lucide-react';

const destinations = [
  'United Arab Emirates - Dubai',
  'India - Jaipur',
  'India - Goa',
  'India - Kerala',
  'India - Rajasthan',
  'Vietnam - Ha Long Bay',
  'Vietnam - Ho Chi Minh City',
  'Vietnam - Hanoi',
  'Indonesia - Bali',
  'Indonesia - Jakarta',
  'Indonesia - Lombok',
  'Malaysia - Kuala Lumpur',
  'Malaysia - Langkawi',
  'Malaysia - Penang',
  'Singapore',
  'Multiple Destinations',
  'Not Sure Yet',
];

export default function Contact() {
  const urlParams = new URLSearchParams(window.location.search);
  const preselectedDestination = urlParams.get('destination') || '';

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    destination: preselectedDestination,
    travel_date: null,
    travelers: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const createInquiry = useMutation({
    mutationFn: (data) => base44.entities.Inquiry.create(data),
    onSuccess: () => setSubmitted(true),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createInquiry.mutate({
      ...formData,
      travel_date: formData.travel_date ? format(formData.travel_date, 'yyyy-MM-dd') : null,
      travelers: formData.travelers ? parseInt(formData.travelers) : null,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F5F1EB] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md text-center"
        >
          <div className="w-20 h-20 rounded-full bg-[#0F4C5C] flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-semibold text-[#0F4C5C] mb-4">Thank You!</h2>
          <p className="text-[#5C4033]/70 text-lg mb-8">
            We've received your inquiry and will get back to you within 24 hours to start planning your adventure.
          </p>
          <Button
            onClick={() => setSubmitted(false)}
            variant="outline"
            className="border-[#0F4C5C] text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-white"
          >
            Submit Another Inquiry
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1EB]">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[350px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80"
            alt="Contact Us"
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
              Get In Touch
            </span>
            <h1 className="text-5xl md:text-6xl font-light text-white mt-4">
              Plan Your <span className="font-semibold">Trip</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <h2 className="text-2xl font-semibold text-[#0F4C5C] mb-6">Get in Touch</h2>
              <p className="text-[#5C4033]/70 mb-8 leading-relaxed">
                Have questions or ready to start planning? Reach out to us and our travel experts will be happy to assist you.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#D4A574]/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#D4A574]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#0F4C5C]">Phone</h4>
                    <p className="text-[#5C4033]/70">+44 7343 056344</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#D4A574]/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#D4A574]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#0F4C5C]">WhatsApp</h4>
                    <a href="https://wa.me/447343056344" target="_blank" rel="noopener noreferrer" className="text-[#5C4033]/70 hover:text-[#0F4C5C] transition-colors">
                      +44 7343 056344
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#D4A574]/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#D4A574]" />
                    </div>
                    <div>
                    <h4 className="font-medium text-[#0F4C5C]">Email</h4>
                    <p className="text-[#5C4033]/70">customer.service@escapetoasia.co.uk</p>
                    </div>
                </div>


              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h2 className="text-2xl font-semibold text-[#0F4C5C] mb-6">Request a Quote</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#5C4033] mb-2">
                        Full Name *
                      </label>
                      <Input
                        required
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        placeholder="Your name"
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#5C4033] mb-2">
                        Email Address *
                      </label>
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#5C4033] mb-2">
                        Phone Number
                      </label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+44 7700 900000"
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#5C4033] mb-2">
                        Destination *
                      </label>
                      <Select
                        value={formData.destination}
                        onValueChange={(value) => setFormData({ ...formData, destination: value })}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                        <SelectContent>
                          {destinations.map((dest) => (
                            <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#5C4033] mb-2">
                        Preferred Travel Date
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full h-12 justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.travel_date ? format(formData.travel_date, 'PPP') : 'Select date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.travel_date}
                            onSelect={(date) => setFormData({ ...formData, travel_date: date })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#5C4033] mb-2">
                        Number of Travelers
                      </label>
                      <Select
                        value={formData.travelers}
                        onValueChange={(value) => setFormData({ ...formData, travelers: value })}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map((num) => (
                            <SelectItem key={num} value={String(num)}>{num} {num === 1 ? 'traveler' : 'travelers'}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#5C4033] mb-2">
                      Additional Details
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your dream trip, interests, or any special requirements..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={createInquiry.isPending}
                    className="w-full h-14 bg-[#D4A574] hover:bg-[#C49464] text-white font-medium rounded-full text-lg"
                  >
                    {createInquiry.isPending ? (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : (
                      <Send className="w-5 h-5 mr-2" />
                    )}
                    {createInquiry.isPending ? 'Sending...' : 'Send Inquiry'}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}