"use client"; 

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function WhatsAppChatWidget() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // 使用短链接格式，逻辑完全一致，且更加简洁
  const phone = "60167442330";
  const message = "Hi, I would like to know more about your services.";
  const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  const handleTrackConversion = () => {
    if (typeof window === "undefined") return;

    // Google Ads Conversion Tracking
    if ((window as any).gtag) {
      (window as any).gtag("event", "conversion", {
        send_to: "AW-11342839562/aySGCNSJiqAcEIr-16Aq",
      });

      // GA4 engagement event — the console counts on this exact event name
      (window as any).gtag("event", "whatsapp_click", {
        event_category: "engagement",
        event_label: "whatsapp_button",
      });
    }

    // GTM path, in case gtag.js is blocked or tags are managed in GTM
    if (Array.isArray((window as any).dataLayer)) {
      (window as any).dataLayer.push({
        event: "whatsapp_click",
        event_category: "engagement",
        event_label: "whatsapp_button",
      });
    }
  };

  if (!mounted) return null;

  return createPortal(
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleTrackConversion}
      className="fixed bottom-5 right-5 z-[9999] h-14 w-14 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:scale-105 transition-transform duration-200"
      aria-label="Contact us on WhatsApp"
    >
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="currentColor"
          d="M16.002 3.2c-7.065 0-12.8 5.736-12.8 12.8 0 2.26.594 4.47 1.722 6.42L3.2 28.8l6.55-1.683a12.74 12.74 0 0 0 6.252 1.635h.002c7.064 0 12.8-5.735 12.8-12.8 0-7.064-5.736-12.8-12.8-12.8zm0 23.2a10.37 10.37 0 0 1-5.29-1.45l-.38-.224-3.89 1.0 1.04-3.79-.247-.39a10.33 10.33 0 1 1 8.767 4.854zm6.03-7.78c-.33-.165-1.95-.96-2.252-1.07-.302-.11-.522-.165-.742.165-.22.33-.852 1.07-1.045 1.29-.192.22-.385.248-.715.083-.33-.165-1.392-.513-2.65-1.635-.98-.874-1.64-1.953-1.833-2.283-.193-.33-.02-.508.145-.673.15-.15.33-.385.495-.577.165-.193.22-.33.33-.55.11-.22.055-.413-.028-.578-.083-.165-.742-1.79-1.016-2.455-.266-.64-.536-.553-.742-.563l-.633-.012c-.22 0-.578.083-.88.413-.302.33-1.155 1.13-1.155 2.758 0 1.625 1.182 3.195 1.347 3.415.165.22 2.328 3.556 5.64 4.99.787.34 1.4.544 1.88.696.79.252 1.51.216 2.08.13.635-.095 1.95-.797 2.225-1.57.275-.77.275-1.433.193-1.57-.083-.138-.302-.22-.633-.385z"
        />
      </svg>
    </a>,
    document.body
  );
}