"use client";

import { useRef } from "react";

interface HeroVideoProps {
  src?: string;
}

export function HeroVideo({ src }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Cinematic gradient when no real video — resembles aerial cave/landscape footage */}
      {!src && (
        <>
          {/* Base dark texture */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(160deg, #0d0d0d 0%, #080808 100%)",
            }}
          />
          {/* Dramatic light shaft from top-center */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 40% 60% at 48% 0%, rgba(180,140,80,0.18) 0%, transparent 70%)",
            }}
          />
          {/* Mid-tone atmospheric depth */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 55%, rgba(35,22,80,0.45) 0%, transparent 70%)",
            }}
          />
          {/* Subtle texture lines */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(92deg, transparent 0px, transparent 80px, rgba(255,255,255,0.012) 80px, rgba(255,255,255,0.012) 81px)",
            }}
          />
          {/* Accent color bloom from bottom */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 30% at 50% 100%, color-mix(in srgb, var(--accent) 14%, transparent) 0%, transparent 70%)",
              transition: "background 1.4s ease",
            }}
          />
        </>
      )}

      {src && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: "brightness(0.7) saturate(0.8) sepia(0.1)",
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

      {/* Strong bottom-to-top gradient — keeps text readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 35%, rgba(0,0,0,0.1) 65%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* Side darkening */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
