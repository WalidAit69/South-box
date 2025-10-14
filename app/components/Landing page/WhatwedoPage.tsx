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
      description:
        "Logo design, brand identity, and visual systems for your business",
    },
    {
      link: "#web-design",
      text: "Web Design",
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop",
      description: "Custom website design and user interface creation",
    },
    {
      link: "#development",
      text: "Development",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
      description:
        "Web development, mobile apps, and custom software solutions",
    },
    {
      link: "#marketing",
      text: "Marketing",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      description: "Digital marketing, SEO, and social media strategies",
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
      itemScope
      itemType="https://schema.org/ItemList"
      aria-label="Our Services"
    >
      {/* Hidden heading for SEO */}
      <h2 className="sr-only" itemProp="name">
        What We Do - Our Services
      </h2>

      {/* Hidden structured list for SEO */}
      <div className="sr-only">
        <ul itemProp="itemListElement">
          {menuItems.map((item, index) => (
            <li key={index} itemScope itemType="https://schema.org/ListItem">
              <meta itemProp="position" content={String(index + 1)} />
              <div
                itemProp="item"
                itemScope
                itemType="https://schema.org/Service"
              >
                <h3 itemProp="name">{item.text}</h3>
                <meta itemProp="description" content={item.description} />
                <link itemProp="url" href={item.link} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <FlowingMenu items={menuItems} />
    </section>
  );
}
