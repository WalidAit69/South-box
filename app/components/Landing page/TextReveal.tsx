"use client";

import React, { useRef } from "react";

interface TextRevealProps {
  scrollProgress: number;
}

export default function TextReveal({ scrollProgress }: TextRevealProps) {
  const text =
    "Whatever business you do, we take the challenge to bring your digital identity to the next level. Here's what we've done:";

  const words = text.split(" ");
  const sectionRef = useRef<HTMLElement>(null);

  const getWordOpacity = (index: number) => {
    const totalWords = words.length;
    const revealedWords = scrollProgress * totalWords * 1.5;
    const wordPosition = index;
    const fadeRange = 3;

    if (wordPosition < revealedWords - fadeRange) {
      return 1;
    } else if (wordPosition < revealedWords) {
      const fadeProgress = (revealedWords - wordPosition) / fadeRange;
      return Math.max(0, Math.min(1, fadeProgress));
    } else {
      return 0;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="custom-height
        flex items-center justify-center sm:pt-12 2xl:pt-0
        px-4 sm:px-6 md:px-8 lg:px-12"
    >
      <div className="max-w-[90%] mx-auto w-full">
        <p
          className="flex flex-wrap 
          gap-x-1.5 gap-y-0.5 
          sm:gap-x-2 sm:gap-y-1 
          md:gap-x-2.5 md:gap-y-1 
          lg:gap-x-3 lg:gap-y-1.5 
          text-xl 
          sm:text-2xl 
          md:text-3xl 
          lg:text-5xl 
          xl:text-6xl 
          2xl:text-7xl 
          font-bold 
          p-3 
          sm:p-4 
          md:p-6 
          lg:p-8 
          xl:p-10 
          leading-tight 
          sm:leading-tight 
          md:leading-tight 
          lg:leading-tight"
        >
          {words.map((word, i) => (
            <span key={i} className="relative inline-block">
              <span
                className="absolute inset-0 text-white/0 
                px-1 sm:px-1.5 md:px-2"
              >
                {word}
              </span>
              <span
                className="relative text-white 
                  transition-opacity duration-150 ease-out 
                  px-1 sm:px-1.5 md:px-2"
                style={{
                  opacity: getWordOpacity(i),
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}