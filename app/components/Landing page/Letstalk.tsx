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
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
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
      className="max-w-[90%] z-10 m-auto h-[100vh] lg:mt-0
        flex flex-col lg:flex-row 
        items-center justify-center lg:justify-between
        gap-0 lg:gap-12 
        px-4 sm:px-6 lg:px-8 
        py-[100px] lg:py-0"
    >
      <div className="max-w-3xl overflow-hidden flex-1">
        <p
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
        >
          We design, develop and manage innovative websites optimised using SEO
          and conversion strategies
        </p>
      </div>

      <div className="flex-shrink-0">
        <CtaButton text="Let's talk" />
      </div>
    </section>
  );
}

export default Letstalk;