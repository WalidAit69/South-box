"use client";

import React, { useEffect, useRef } from "react";

interface TextRevealProps {
  scrollProgress: number;
}

export default function TextReveal({ scrollProgress }: TextRevealProps) {
  const text =
    "Whatever business you do, we take the challenge to bring your digital identity to the next level. Here's what we've done:";

  const words = text.split(" ");
  const sectionRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered.current) {
            hasTriggered.current = true;
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observerRef.current.observe(sectionRef.current);
    }

    return () => {
      if (observerRef.current && sectionRef.current) {
        observerRef.current.unobserve(sectionRef.current);
      }
    };
  }, [words.length]);

  const getWordOpacity = (index: number) => {
    const wordProgress = Math.max(
      0,
      Math.min(1, (scrollProgress - index * 0.03) * 3)
    );
    return wordProgress;
  };

  return (
    <section
      ref={sectionRef}
      className="custom-height flex items-center justify-center px-4"
    >
      <div className="max-w-[90%] mx-auto">
        <p className="flex flex-wrap gap-x-2 gap-y-1 text-2xl md:text-3xl lg:text-4xl xl:text-7xl font-bold p-5 md:p-8 lg:p-10">
          {words.map((word, i) => (
            <span key={i} className="relative inline-block">
              <span className="absolute inset-0 text-white/0 px-2">{word}</span>
              <span
                className="relative text-white transition-opacity duration-300 ease-out px-2"
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
