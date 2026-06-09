import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { isBannerDismissed, acceptAllCookies, declineNonEssentialCookies } from '@/lib/CookieConsent';

/**
 * Cookie Consent Banner
 * Compliant with UK PECR regulations
 * - Clear Accept/Decline buttons with equal prominence
 * - No cookie wall (site remains accessible if user declines)
 * - Link to privacy policy
 * - Can be dismissed with close button
 * - Reloads page after consent to activate tracking
 */
export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isChoosing, setIsChoosing] = useState(false);

  useEffect(() => {
    // Only show banner if user hasn't made a choice yet
    const shouldShow = !isBannerDismissed();
    setShowBanner(shouldShow);
  }, []);

  const handleAccept = () => {
    setIsChoosing(true);
    acceptAllCookies();
    // Reload page so GA4 and Tawk load immediately
    setTimeout(() => window.location.reload(), 300);
  };

  const handleDecline = () => {
    setIsChoosing(true);
    declineNonEssentialCookies();
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-[#0F4C5C] text-white p-4 md:p-6 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Cookie Consent</h3>
                <p className="text-white/90 text-sm mb-3 md:mb-0">
                  We use cookies to enhance your experience. Analytics and chat cookies require your consent.{' '}
                  <a
                    href="/Privacy"
                    className="underline hover:text-[#D4A574] transition-colors"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>

              <div className="flex flex-wrap gap-3 w-full md:w-auto md:flex-nowrap">
                {/* Decline Button */}
                <button
                  onClick={handleDecline}
                  disabled={isChoosing}
                  className="flex-1 md:flex-none px-4 py-2.5 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-[#0F4C5C] transition-colors text-sm disabled:opacity-50"
                >
                  Decline
                </button>

                {/* Accept Button */}
                <button
                  onClick={handleAccept}
                  disabled={isChoosing}
                  className="flex-1 md:flex-none px-4 py-2.5 bg-[#D4A574] text-white font-medium rounded-lg hover:bg-[#C49464] transition-colors text-sm disabled:opacity-50"
                >
                  Accept All
                </button>

                {/* Close Button */}
                <button
                  onClick={handleDecline}
                  disabled={isChoosing}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0 disabled:opacity-50"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

