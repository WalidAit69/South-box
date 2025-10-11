"use client";

import React from "react";
import FlowingMenu from "./FlowingMenu";

interface ProjectsSectionProps {
  scrollProgress: number;
}

export default function WhatwedoPage({ scrollProgress }: ProjectsSectionProps) {
  // Menu items data
  const menuItems = [
    {
      link: "#branding",
      text: "Branding",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    },
    {
      link: "#web-design",
      text: "Web Design",
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop",
    },
    {
      link: "#development",
      text: "Development",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
    },
    {
      link: "#marketing",
      text: "Marketing",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    },
  ];

  // Calculate scale based on scroll progress
  const scale = 0.95 + scrollProgress * 0.05; // Scale from 0.95 to 1

  return (
    <section
      className="custom-height
        mt-20 sm:mt-24 md:mt-28 lg:mt-32 xl:mt-[140px]
        max-w-[95%] sm:max-w-[92%] md:max-w-[90%] 
        mx-auto 
        relative overflow-hidden z-10
        px-4 sm:px-6 md:px-8 lg:px-10"
      style={{
        transform: `scale(${scale})`,
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
      }}
    >
      <FlowingMenu items={menuItems} />
    </section>
  );
}
