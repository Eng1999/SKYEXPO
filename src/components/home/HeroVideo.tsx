"use client";

import { useRef, useState, useEffect } from "react";

interface HeroVideoProps {
  src?: string;
}

export function HeroVideo({ src }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  /* sync mute state to video element */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
    if (!muted) v.play().catch(() => {});
  }, [muted]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Cinematic gradient fallback */}
      {!src && (
        <>
          <div className="absolute inset-0" style={{ background: "linear-gradient(160deg,#0d0d0d 0%,#080808 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 40% 60% at 48% 0%,rgba(180,140,80,0.18) 0%,transparent 70%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 55%,rgba(35,22,80,0.45) 0%,transparent 70%)" }} />
          <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(92deg,transparent 0px,transparent 80px,rgba(255,255,255,0.012) 80px,rgba(255,255,255,0.012) 81px)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 30% at 50% 100%,color-mix(in srgb,var(--accent) 14%,transparent) 0%,transparent 70%)", transition: "background 1.4s ease" }} />
        </>
      )}

      {src && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.7) saturate(0.8) sepia(0.1)", willChange: "transform" }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* Gradients */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.95) 0%,rgba(0,0,0,0.4) 35%,rgba(0,0,0,0.1) 65%,rgba(0,0,0,0.5) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right,rgba(0,0,0,0.5) 0%,transparent 25%,transparent 75%,rgba(0,0,0,0.4) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center,transparent 35%,rgba(0,0,0,0.55) 100%)" }} />

      {/* ── Sound toggle ── */}
      {src && (
        <button
          onClick={() => setMuted((m) => !m)}
          className="absolute bottom-8 right-5 md:right-16 z-30 flex items-center gap-2 group"
          aria-label={muted ? "Enable sound" : "Mute"}
          data-cursor-hover
        >
          <span
            className="text-[10px] tracking-[0.35em] uppercase transition-colors duration-300"
            style={{ color: muted ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.75)" }}
          >
            {muted ? "SOUND OFF" : "SOUND ON"}
          </span>
          <span
            className="flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-400"
            style={{
              borderColor: muted ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.5)",
              background: muted ? "transparent" : "rgba(255,255,255,0.08)",
            }}
          >
            {muted ? (
              /* speaker muted */
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              /* speaker on */
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </span>
        </button>
      )}
    </div>
  );
}
