"use client";

import { useEffect, useRef } from "react";

interface VideoLensProps {
  lensX: number;
  lensY: number;
  visible: boolean;
  expanded: boolean;
}

export function VideoLens({ lensX, lensY, visible, expanded }: VideoLensProps) {
  const lensRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Update clip-path via ref to avoid re-renders on every mouse move
  useEffect(() => {
    const el = lensRef.current;
    if (!el) return;

    if (!visible) {
      el.style.clipPath = "circle(0px at 50% 50%)";
      return;
    }

    if (expanded) {
      el.style.clipPath = "circle(150% at 50% 50%)";
      el.style.transition = "clip-path 0.9s cubic-bezier(0.77,0,0.175,1)";
    } else {
      // Lens follows cursor: 120px radius
      el.style.clipPath = `circle(120px at ${lensX}px ${lensY}px)`;
      el.style.transition = "clip-path 0.06s linear";
    }
  }, [lensX, lensY, visible, expanded]);

  // Update cursor custom indicator class
  useEffect(() => {
    const cursor = document.getElementById("sky-cursor");
    if (!cursor) return;
    if (visible) {
      cursor.classList.add("cursor-video");
    } else {
      cursor.classList.remove("cursor-video");
    }
    return () => cursor.classList.remove("cursor-video");
  }, [visible]);

  return (
    <div
      ref={lensRef}
      className="absolute inset-0 z-10"
      style={{
        clipPath: "circle(0px at 50% 50%)",
        willChange: "clip-path",
      }}
    >
      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Placeholder video / gradient for capabilities */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 40% 50%, #F3742B22 0%, #0a0a0a 60%)",
        }}
      />

      {/* Video element (swap src with real footage) */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.6) saturate(1.2)" }}
        autoPlay
        muted
        loop
        playsInline
      >
        {/* No src — placeholder gradient shows instead */}
      </video>

      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div
          className="text-6xl font-light tracking-widest uppercase"
          style={{ color: "#F3742B" }}
        >
          Capabilities
        </div>
        <p className="text-white/40 text-sm tracking-widest mt-4 uppercase">
          Click &amp; Hold to expand
        </p>
      </div>
    </div>
  );
}
