"use client";

import React, { useState, useEffect, useRef } from "react";
import CtaButton from "./CtaButton";

function Letstalk() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: "0px 0px -100px 0px", // Trigger slightly before entering viewport
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="max-w-[90%] z-10 m-auto h-[100vh] flex items-center justify-between"
    >
      <div className="max-w-3xl overflow-hidden">
        <p
          className="text-[2.5rem] font-light leading-relaxed will-change-transform"
          style={{
            transform: isVisible ? "translateY(0)" : "translateY(100%)",
            opacity: isVisible ? 1 : 0,
            transitionProperty: "transform, opacity",
            transitionDuration: "1.2s, 1s",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1), ease-out",
            transitionDelay: "0.2s",
          }}
        >
          We design, develop and manage innovative websites optimised using SEO
          and conversion strategies
        </p>
      </div>

      <CtaButton text="Let's talk" />
    </section>
  );
}

export default Letstalk;
