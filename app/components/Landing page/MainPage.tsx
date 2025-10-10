"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import CtaButton from "./CtaButton";

interface LandingProps {
  scrollProgress: number;
}

interface TransformProps {
  transform?: string;
  transition?: string;
  transformStyle?: "flat" | "preserve-3d";
}

export default function MainPage({ scrollProgress }: LandingProps) {
  const [imageTransform, setImageTransform] = useState<TransformProps>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const rafRef = useRef<number>(null);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Smooth easing function for more natural animation
  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  const easedProgress = easeOutCubic(scrollProgress);

  // Calculate transforms with easing
  const southTranslateX = -1300 * easedProgress;
  const boxTranslateX = 850 * easedProgress;
  const imageScale = 1 + 5 * easedProgress;
  const imageRotate = 12 * easedProgress;
  const taglineOpacity = 1 - scrollProgress;

  // Determine if we should use delays (only on initial load, not during scroll)
  const useLoadDelays = isLoaded && scrollProgress === 0;

  const handlePageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Cancel any pending animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    // Use requestAnimationFrame for smoother updates
    rafRef.current = requestAnimationFrame(() => {
      const { innerWidth, innerHeight } = window;

      const offsetX = (e.clientX / innerWidth - 0.5) * 2;
      const offsetY = (e.clientY / innerHeight - 0.5) * 2;

      // Reduced movement range for smoother feel
      const translateX = offsetX * 30;
      const translateY = offsetY * 30;
      const rotateX = offsetY * -15;
      const rotateY = offsetX * 15;

      setImageTransform({
        transform: `
          translate(${translateX}px, ${translateY}px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          scale(${imageScale})
          rotate(${imageRotate}deg)
        `,
        transition: "transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        transformStyle: "preserve-3d",
      });
    });
  };

  const handlePageMouseLeave = () => {
    // Cancel any pending animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    setImageTransform({
      transform: `translate(0, 0) rotateX(0deg) rotateY(0deg) scale(${imageScale}) rotate(${imageRotate}deg)`,
      transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
    });
  };

  return (
    <section
      className="text-white flex flex-col items-center justify-center relative max-w-[90%] mx-auto custom-height"
      onMouseMove={handlePageMouseMove}
      onMouseLeave={handlePageMouseLeave}
    >
      <div className="relative z-10 w-full">
        <div
          className="absolute right-0 transition-all duration-300"
          style={{
            opacity: isLoaded ? taglineOpacity : 0,
            transitionDuration: isLoaded ? "1s, 2s" : "0s",
            transitionDelay: useLoadDelays ? "0.3s, 0.7s" : "0s",
          }}
        >
          <CtaButton text="Start a project" />
        </div>

        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
          style={{
            ...imageTransform,
            transform:
              imageTransform.transform ||
              `scale(${imageScale}) rotate(${imageRotate}deg)`,
            transition:
              imageTransform.transition ||
              "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <Image
            src="/prism.png"
            alt="south box"
            width={300}
            height={300}
            className="pointer-events-none select-none"
            style={{
              opacity: taglineOpacity,
              transition: "opacity 0.3s ease-out",
            }}
          />
        </div>

        {/* Headings - Breaking out of container */}
        <div className="relative flex flex-col z-10 -mx-[5vw] w-[100vw]">
          {/* South heading with reveal animation */}
          <div className="overflow-hidden px-[5vw]">
            <h1
              className="text-[22rem] leading-none font-bold tracking-tight uppercase will-change-transform"
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

          {/* Box heading with reveal animation */}
          <div className="overflow-hidden self-end px-[5vw]">
            <h1
              className="text-[22rem] leading-none font-bold tracking-tight uppercase will-change-transform"
              style={{
                transform: `translateX(${boxTranslateX}px) translateY(${
                  isLoaded ? "0" : "100%"
                })`,
                transitionProperty: isLoaded ? "transform" : "none",
                transitionDuration: isLoaded ? "1s, 1s" : "0s",
                transitionTimingFunction: isLoaded
                  ? "cubic-bezier(0.25, 0.46, 0.45, 0.94), cubic-bezier(0.16, 1, 0.3, 1)"
                  : "ease",
                // transitionDelay: isLoaded ? "0.2s, 0.5s" : "0s",
              }}
            >
              Box
            </h1>
          </div>
        </div>

        {/* Tagline with reveal animation */}
        <div className="overflow-hidden max-w-md">
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
              // transitionDelay: isLoaded ? "0.3s, 0.7s" : "0s",
            }}
          >
            <p className="text-2xl font-light leading-relaxed">
              The agency that covers your digital needs in a creative and
              efficient way
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
