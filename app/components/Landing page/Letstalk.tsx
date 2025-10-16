"use client";

import React, { useState, useEffect, useRef } from "react";
import CtaButton from "./CtaButton";

interface LetsTalkProps {
  scrollProgress?: number;
}

function Letstalk({ scrollProgress = 0 }: LetsTalkProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentSection = sectionRef.current; // Store ref value in variable

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [isVisible]);

  // Calculate scale based on scroll progress
  const scale =
    scrollProgress < 0.5
      ? 0.9 + scrollProgress * 0.2
      : 1 + (scrollProgress - 0.5) * 0.1;

  // Calculate opacity - fades in during first half
  const opacity = Math.min(1, scrollProgress * 2);

  return (
    <div
      ref={sectionRef}
      className="max-w-[90%] z-10 m-auto h-[100vh] lg:mt-0
        flex flex-col lg:flex-row 
        items-center justify-center lg:justify-between
        gap-0 lg:gap-12 
        px-4 sm:px-6 lg:px-8
        py-[100px] lg:py-0"
      style={{
        transform: `scale(${scale})`,
        opacity: opacity,
        transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
        pointerEvents: "auto",
      }}
      itemScope
      itemType="https://schema.org/Service"
      aria-label="Our Services Overview"
    >
      <div className="max-w-3xl overflow-hidden flex-1">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] 
            font-light leading-relaxed 
            will-change-transform 
            text-center lg:text-left"
          style={{
            transform: isVisible ? "translateY(0)" : "translateY(100%)",
            opacity: isVisible ? 1 : 0,
            transitionProperty: "transform, opacity",
            transitionDuration: "1.2s, 1s",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1), ease-out",
            transitionDelay: "0.2s",
          }}
          itemProp="description"
        >
          We design, develop and manage innovative websites optimised using{" "}
          <span
            itemProp="hasOfferCatalog"
            itemScope
            itemType="https://schema.org/OfferCatalog"
          >
            <meta itemProp="name" content="SEO Services" />
            SEO
          </span>{" "}
          and conversion strategies
        </h2>
      </div>

      <div
        className="flex-shrink-0"
        style={{ pointerEvents: "auto" }}
        itemProp="potentialAction"
        itemScope
        itemType="https://schema.org/CommunicateAction"
      >
        <meta itemProp="name" content="Contact South Box" />
        <CtaButton text="Let's talk" href="/Contact" />
      </div>
    </div>
  );
}

export default Letstalk;
