import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 告诉 TypeScript：全局 window 对象里有 gtag 和 dataLayer
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export default function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    // 现在 TypeScript 不会再报错了
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;
}