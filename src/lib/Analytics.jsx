import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics 4. Enabled only when VITE_GA_MEASUREMENT_ID is set, so the
// app runs cleanly without it (e.g. locally or before an ID is provisioned).
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export default function Analytics() {
  const location = useLocation();

  // Load the gtag script once.
  useEffect(() => {
    if (!GA_ID || document.getElementById('ga4-src')) return;

    const script = document.createElement('script');
    script.id = 'ga4-src';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { send_page_view: false });
  }, []);

  // Send a page_view on each client-side route change.
  useEffect(() => {
    if (!GA_ID || typeof window.gtag !== 'function') return;
    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
      page_location: window.location.href,
    });
  }, [location]);

  return null;
}
