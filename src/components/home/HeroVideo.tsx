"use client";

import { useRef } from "react";

interface HeroVideoProps {
  src?: string;
}

export function HeroVideo({ src }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Cinematic placeholder gradient when no real video */}
      {!src && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 60%, #231650 0%, #0a0a0a 40%, #000000 100%)",
          }}
        />
      )}

      {src && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: "brightness(0.75) saturate(0.85) sepia(0.12)",
            willChange: "transform",
          }}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* Layer 1: dark flat overlay */}
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)" }} />

      {/* Layer 2: radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      {/* Layer 3: accent glow from bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 110%, color-mix(in srgb, var(--accent) 8%, transparent) 0%, transparent 60%)",
          transition: "background 1.2s ease",
        }}
      />
    </div>
  );
}
