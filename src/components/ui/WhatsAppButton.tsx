"use client";

import { useLanguage } from "@/context/LanguageContext";

const WHATSAPP_URL = "https://wa.me/message/QRDEW5YKVANHE1";

export function WhatsAppButton() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={isAr ? "تواصل معنا عبر واتساب" : "Chat with us on WhatsApp"}
      data-cursor-hover
      className="fixed bottom-6 z-[55] flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
      style={{
        [isAr ? "left" : "right"]: "1.5rem",
        background: "#25D366",
        boxShadow: "0 6px 24px rgba(0,0,0,0.35)",
      }}
    >
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          fill="#fff"
          d="M16.004 3C9.376 3 4 8.373 4 15c0 2.32.646 4.49 1.77 6.34L4 29l7.86-1.73A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.63 28 15S22.63 3 16.004 3Zm0 21.75c-1.97 0-3.8-.55-5.36-1.5l-.385-.23-4.66 1.03 1.05-4.54-.25-.4A9.7 9.7 0 0 1 5.25 15c0-5.93 4.82-10.75 10.754-10.75S26.75 9.07 26.75 15 21.94 24.75 16.004 24.75Zm5.9-8.06c-.32-.16-1.9-.94-2.2-1.05-.29-.11-.51-.16-.72.16-.21.32-.83 1.05-1.02 1.26-.19.21-.38.24-.7.08-.32-.16-1.34-.5-2.55-1.58-.94-.84-1.58-1.87-1.76-2.19-.19-.32-.02-.49.14-.65.14-.14.32-.38.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.75-.99-2.39-.26-.63-.52-.54-.72-.55h-.62c-.21 0-.56.08-.85.4-.29.32-1.12 1.1-1.12 2.68 0 1.58 1.15 3.11 1.31 3.33.16.21 2.26 3.46 5.49 4.85.77.33 1.36.53 1.83.68.77.24 1.47.21 2.02.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37Z"
        />
      </svg>
    </a>
  );
}
