"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect, useMemo } from "react";
import CtaButton from "./CtaButton";

interface LandingProps {
  scrollProgress: number;
}

interface MouseTransform {
  translateX: number;
  translateY: number;
  rotateX: number;
  rotateY: number;
}

export default function MainPage({ scrollProgress }: LandingProps) {
  const [mouseTransform, setMouseTransform] = useState<MouseTransform>({
    translateX: 0,
    translateY: 0,
    rotateX: 0,
    rotateY: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  const easedProgress = useMemo(
    () => easeOutCubic(scrollProgress),
    [scrollProgress]
  );

  // Responsive transform calculations
  const southTranslateX = -1300 * easedProgress;
  const boxTranslateX = 850 * easedProgress;
  const imageScale = 1 + 5 * easedProgress;
  const imageRotate = 12 * easedProgress;
  const taglineOpacity = 1 - scrollProgress;

  const useLoadDelays = isLoaded && scrollProgress === 0;

  const handlePageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const { innerWidth, innerHeight } = window;

      const offsetX = (e.clientX / innerWidth - 0.5) * 2;
      const offsetY = (e.clientY / innerHeight - 0.5) * 2;

      const translateX = offsetX * 30;
      const translateY = offsetY * 30;
      const rotateX = offsetY * -15;
      const rotateY = offsetX * 15;

      setMouseTransform({
        translateX,
        translateY,
        rotateX,
        rotateY,
      });
    });
  };

  const handlePageMouseLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    setMouseTransform({
      translateX: 0,
      translateY: 0,
      rotateX: 0,
      rotateY: 0,
    });
  };

  // Combine mouse and scroll transforms
  const combinedTransform = `
    translate(${mouseTransform.translateX}px, ${mouseTransform.translateY}px)
    rotateX(${mouseTransform.rotateX}deg)
    rotateY(${mouseTransform.rotateY}deg)
    scale(${imageScale})
    rotate(${imageRotate}deg)
  `;

  return (
    <section
      className="text-white flex flex-col items-center justify-center relative max-w-[90%] mx-auto custom-height"
      onMouseMove={handlePageMouseMove}
      onMouseLeave={handlePageMouseLeave}
    >
      <div className="relative z-10 w-full">
        {/* CTA Button - Responsive positioning */}
        <div
          className="absolute right-0 -top-30 lg:top-[40%] lg:right-[70%] transition-all duration-300 z-20 2xl:right-0 2xl:top-2"
          style={{
            opacity: isLoaded ? taglineOpacity : 0,
            transitionDuration: isLoaded ? "1s, 2s" : "0s",
            transitionDelay: useLoadDelays ? "0.3s, 0.7s" : "0s",
          }}
        >
          <CtaButton text="Start a project" />
        </div>

        {/* Prism Image - Responsive sizing */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
          style={{
            transform: combinedTransform,
            transition:
              mouseTransform.translateX === 0 && mouseTransform.translateY === 0
                ? "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)"
                : "transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transformStyle: "preserve-3d",
          }}
        >
          <Image
            src="/prism.png"
            alt="south box"
            width={300}
            height={300}
            className="pointer-events-none select-none w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px]"
            style={{
              opacity: taglineOpacity,
              transition: "opacity 0.3s ease-out",
            }}
            priority
          />
        </div>

        {/* Headings - Now using CSS classes from globals.css */}
        <div className="relative flex flex-col z-10 -mx-[5vw] w-[100vw]">
          {/* South heading */}
          <div className="overflow-hidden px-[5vw]">
            <h1
              className="hero-heading"
              style={{
                transform: `translateX(${southTranslateX}px) translateY(${
                  isLoaded ? "0" : "100%"
                })`,
                transitionProperty: isLoaded ? "transform" : "none",
                transitionDuration: isLoaded ? "1s, 1s" : "0s",
                transitionTimingFunction: isLoaded
                  ? "cubic-bezier(0.25, 0.46, 0.45, 0.94), cubic-bezier(0.16, 1, 0.3, 1)"
                  : "ease",
              }}
            >
              South
            </h1>
          </div>

          {/* Box heading */}
          <div className="overflow-hidden self-end px-[5vw]">
            <h1
              className="hero-heading"
              style={{
                transform: `translateX(${boxTranslateX}px) translateY(${
                  isLoaded ? "0" : "100%"
                })`,
                transitionProperty: isLoaded ? "transform" : "none",
                transitionDuration: isLoaded ? "1s, 1s" : "0s",
                transitionTimingFunction: isLoaded
                  ? "cubic-bezier(0.25, 0.46, 0.45, 0.94), cubic-bezier(0.16, 1, 0.3, 1)"
                  : "ease",
              }}
            >
              Box
            </h1>
          </div>
        </div>

        {/* Tagline - Now using CSS class from globals.css */}
        <div className="overflow-hidden max-w-md mt-6 lg:mt-0">
          <div
            className="will-change-[opacity,transform]"
            style={{
              opacity: isLoaded ? taglineOpacity : 0,
              transform: `translateY(${isLoaded ? "0" : "100%"})`,
              transitionProperty: isLoaded ? "opacity, transform" : "none",
              transitionDuration: isLoaded ? "1s, 2s" : "0s",
              transitionTimingFunction: isLoaded
                ? "ease-out, cubic-bezier(0.16, 1, 0.3, 1)"
                : "ease",
            }}
          >
            <p className="hero-tagline">
              The agency that covers your digital needs in a creative and
              efficient way
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
