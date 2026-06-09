import { useEffect } from 'react';
import { hasConsent, COOKIE_TYPES } from '@/lib/CookieConsent';

export default function ChatWidget() {
  useEffect(() => {
    // Only load Tawk if user has given chat consent (UK PECR compliance)
    if (!hasConsent(COOKIE_TYPES.CHAT)) {
      return;
    }

    var _Tawk_API = window.Tawk_API || {};
    var _Tawk_LoadStart = new Date();

    (function () {
      var s1 = document.createElement('script');
      var s0 = document.getElementsByTagName('script')[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/69dbecbb9969501c32cc7d0b/1jm1h9evi';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);

  return null;
}
