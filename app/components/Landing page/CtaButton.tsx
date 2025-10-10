"use client";

import React, { useState } from "react";

interface props {
  text: string;
}

function CtaButton({ text }: props) {
  const [buttonTransform, setButtonTransform] = useState({});
  const [rippleStyle, setRippleStyle] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  const handleButtonMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const moveX = (x / rect.width - 0.5) * 50;
    const moveY = (y / rect.height - 0.5) * 50;

    setButtonTransform({
      transform: `translate(${moveX}px, ${moveY}px) scale(1.05)`,
    });
  };

  const handleButtonEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate the maximum distance to ensure full coverage
    const maxDistance = Math.max(
      Math.hypot(x, y),
      Math.hypot(rect.width - x, y),
      Math.hypot(x, rect.height - y),
      Math.hypot(rect.width - x, rect.height - y)
    );

    setRippleStyle({
      left: `${x}px`,
      top: `${y}px`,
      width: `${maxDistance * 2}px`,
      height: `${maxDistance * 2}px`,
    });
    setIsHovered(true);
  };

  const handleButtonLeave = () => {
    setButtonTransform({
      transform: "translate(0, 0) scale(1)",
      transition: "transform 0.6s ease",
    });
    setIsHovered(false);
  };

  return (
    <button
      onMouseMove={handleButtonMove}
      onMouseEnter={handleButtonEnter}
      onMouseLeave={handleButtonLeave}
      className="z-50 cursor-pointer group relative w-[300px] h-[300px] rounded-full border-2 border-white/30 hover:border-white transition-all duration-300 flex items-center justify-center overflow-hidden"
    >
      {/* Circular reveal background */}
      <div
        className="absolute rounded-full bg-white transition-all duration-500 ease-out pointer-events-none"
        style={{
          ...rippleStyle,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1 : 0})`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      <div
        className="relative z-10 flex flex-col items-center text-white group-hover:text-black transition-colors duration-300"
        style={buttonTransform}
      >
        <svg
          className="w-8 h-8 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 17L17 7M17 7H7M17 7V17"
          />
        </svg>
        <span className="mt-2 text-sm font-light">{text}</span>
      </div>
    </button>
  );
}

export default CtaButton;
