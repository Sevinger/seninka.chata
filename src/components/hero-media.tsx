"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { heroShouldAutoplay } from "@/lib/interaction";

export function HeroMedia({ poster, alt }: { poster: string; alt: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const autoplay = heroShouldAutoplay(Boolean(useReducedMotion()));

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!autoplay) return video.pause();
    void video.play().catch(() => undefined);
  }, [autoplay]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-smrk">
      <Image src={poster} alt={alt} fill priority sizes="100vw" className="object-cover" />
      <video ref={videoRef} className="hero-video absolute inset-0 h-full w-full object-cover" poster={poster} muted playsInline loop autoPlay={autoplay} preload="metadata" aria-hidden="true" tabIndex={-1}>
        <source src="/video/seninka-hero-mobile.mp4" media="(max-width: 767px)" type="video/mp4" />
        <source src="/video/seninka-hero-desktop.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
