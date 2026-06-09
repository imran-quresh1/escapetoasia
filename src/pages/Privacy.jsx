import React from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#F5F1EB]">
      <SEO
        title="Privacy & Cookie Policy"
        description="Learn how Escape To Asia uses cookies and your personal data. Understand your rights and how to manage your cookie preferences."
        path="/Privacy"
      />

      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[250px] flex items-center justify-center bg-[#0F4C5C]">
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-light text-white"
          >
            Privacy & Cookie <span className="font-semibold">Policy</span>
          </motion.h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold text-[#0F4C5C] mb-4">Cookie Policy</h2>
            <p className="text-[#5C4033]/80 leading-relaxed mb-4">
              Escape To Asia is committed to transparency about how we use cookies and collect personal data. This page explains our cookie practices and your rights under UK PECR (Privacy and Electronic Communications Regulations) and GDPR.
            </p>
          </motion.div>

          {/* Essential Cookies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-2xl font-semibold text-[#0F4C5C] mb-3">Essential Cookies</h3>
            <p className="text-[#5C4033]/70 mb-3">
              These cookies are necessary for the website to function. They enable core functionality like navigation and form submission. No consent is required for essential cookies.
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#5C4033]/70">
              <li><strong>CSRF Protection:</strong> Prevents cross-site request forgery attacks</li>
              <li><strong>Session Data:</strong> Maintains your browsing session</li>
              <li><strong>Preference Storage:</strong> Remembers your login state and settings</li>
            </ul>
          </motion.div>

          {/* Analytics Cookies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-[#0F4C5C] mb-3">Analytics Cookies</h3>
            <p className="text-[#5C4033]/70 mb-3">
              <strong>Requires your consent.</strong> We use Google Analytics 4 (GA4) to understand how you use our site and to improve our services.
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#5C4033]/70 mb-3">
              <li><strong>Purpose:</strong> Track page views, user behavior, and site performance</li>
              <li><strong>Service:</strong> Google Analytics 4</li>
              <li><strong>Data Retained:</strong> 14 months (Google's default)</li>
              <li><strong>Your Rights:</strong> Opt-out at any time via cookie banner</li>
            </ul>
            <p className="text-[#5C4033]/70">
              GA4 does not store personal identifiable information (PII) like names or emails unless you explicitly enter them in forms.
            </p>
          </motion.div>

          {/* Chat Cookies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-semibold text-[#0F4C5C] mb-3">Chat & Support Cookies</h3>
            <p className="text-[#5C4033]/70 mb-3">
              <strong>Requires your consent.</strong> We use Tawk live chat to provide real-time customer support.
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#5C4033]/70 mb-3">
              <li><strong>Purpose:</strong> Enable live chat for customer inquiries and support</li>
              <li><strong>Service:</strong> Tawk.to</li>
              <li><strong>Data Collected:</strong> Chat messages, IP address, browser info</li>
              <li><strong>Your Rights:</strong> Opt-out at any time via cookie banner</li>
            </ul>
            <p className="text-[#5C4033]/70">
              Chat is only available during business hours. Your chat messages are encrypted in transit.
            </p>
          </motion.div>

          {/* Your Rights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold text-[#0F4C5C] mb-3">Your Rights</h3>
            <p className="text-[#5C4033]/70 mb-3">
              Under UK law, you have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#5C4033]/70">
              <li><strong>Withdraw consent:</strong> Use the "Cookie Settings" link in the footer to change your preferences at any time</li>
              <li><strong>Access your data:</strong> Request a copy of data we hold about you</li>
              <li><strong>Delete your data:</strong> Request deletion of non-essential data (subject to legal retention requirements)</li>
              <li><strong>Disable cookies:</strong> Use your browser settings to block all cookies</li>
              <li><strong>No cookie wall:</strong> This site remains fully accessible if you decline non-essential cookies</li>
            </ul>
          </motion.div>

          {/* Managing Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-2xl font-semibold text-[#0F4C5C] mb-3">Managing Your Cookie Preferences</h3>
            <p className="text-[#5C4033]/70 mb-3">
              You can manage your cookie preferences in three ways:
            </p>
            <ol className="list-decimal list-inside space-y-3 text-[#5C4033]/70">
              <li>
                <strong>Via the cookie banner:</strong> Appears on first visit. Click "Accept All" or "Decline" to set your preferences.
              </li>
              <li>
                <strong>Via "Cookie Settings":</strong> Click the "Cookie Settings" link in the site footer to reopen the banner and change your choices.
              </li>
              <li>
                <strong>Via your browser:</strong> Most browsers allow you to clear cookies or block them entirely. Visit your browser settings for instructions.
              </li>
            </ol>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-[#0F4C5C] mb-3">Contact Us</h3>
            <p className="text-[#5C4033]/70 mb-3">
              If you have questions about our cookie policy or wish to exercise your data rights, please contact us:
            </p>
            <div className="bg-[#F5F1EB] border-l-4 border-[#D4A574] p-4 rounded">
              <p className="text-[#5C4033]">
                <strong>Escape To Asia</strong><br />
                Email: <a href="mailto:customer.service@escapetoasia.co.uk" className="text-[#0F4C5C] hover:underline">customer.service@escapetoasia.co.uk</a><br />
                Phone: <a href="tel:+447343056344" className="text-[#0F4C5C] hover:underline">+44 7343 056344</a><br />
                WhatsApp: <a href="https://wa.me/447343056344" className="text-[#0F4C5C] hover:underline">+44 7343 056344</a>
              </p>
            </div>
          </motion.div>

          {/* Last Updated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="border-t border-[#5C4033]/20 pt-8"
          >
            <p className="text-[#5C4033]/60 text-sm">
              <strong>Last Updated:</strong> June 9, 2026<br />
              <strong>Effective Date:</strong> June 9, 2026
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

