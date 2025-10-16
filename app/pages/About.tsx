"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Add JSON-LD structured data for About page
  useEffect(() => {
    const organizationData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "South Box",
      url: "https://yourdomain.com",
      logo: "https://yourdomain.com/prism.png",
      foundingDate: "2019",
      founders: [
        {
          "@type": "Person",
          name: "Simo Bouachra",
          jobTitle: "Creative Director",
        },
        {
          "@type": "Person",
          name: "Walid Ait Harma",
          jobTitle: "Web Developer",
        },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Casablanca",
        addressCountry: "MA",
      },
      description:
        "A passionate team dedicated to transforming ideas into stunning digital realities",
      slogan: "We craft digital experiences that inspire",
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        value: "2-10",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        bestRating: "5",
        ratingCount: "30",
      },
    };

    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://yourdomain.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: "https://yourdomain.com/about",
        },
      ],
    };

    const aboutPageData = {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About South Box",
      description: "Learn about South Box, our story, values, and team members",
      mainEntity: {
        "@type": "Organization",
        name: "South Box",
      },
    };

    const script1 = document.createElement("script");
    script1.type = "application/ld+json";
    script1.text = JSON.stringify(organizationData);
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.type = "application/ld+json";
    script2.text = JSON.stringify(breadcrumbData);
    document.head.appendChild(script2);

    const script3 = document.createElement("script");
    script3.type = "application/ld+json";
    script3.text = JSON.stringify(aboutPageData);
    document.head.appendChild(script3);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
      document.head.removeChild(script3);
    };
  }, []);

  // Initial load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate animation values
  const heroOpacity = 1;
  const heroScale = 1;

  const storyOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.1) * 5));
  const storyY =
    (1 - Math.max(0, Math.min(1, (scrollProgress - 0.1) * 5))) * 100;

  const statsOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.25) * 5));
  const statsScale =
    0.9 + Math.max(0, Math.min(1, (scrollProgress - 0.25) * 5)) * 0.1;

  const valuesOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.4) * 5));

  const teamOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.55) * 5));
  const teamY =
    (1 - Math.max(0, Math.min(1, (scrollProgress - 0.55) * 5))) * 50;

  const ctaOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.7) * 5));
  const ctaScale =
    0.95 + Math.max(0, Math.min(1, (scrollProgress - 0.7) * 5)) * 0.05;

  const stats = [
    { number: "50+", label: "Projects Completed", icon: "🚀" },
    { number: "30+", label: "Happy Clients", icon: "😊" },
    { number: "5+", label: "Years Experience", icon: "⭐" },
    { number: "100%", label: "Satisfaction Rate", icon: "💯" },
  ];

  const values = [
    {
      icon: "💡",
      title: "Innovation",
      description:
        "We push boundaries and explore new possibilities in every project we undertake",
    },
    {
      icon: "🎯",
      title: "Precision",
      description:
        "Attention to detail and pixel-perfect execution in everything we create",
    },
    {
      icon: "🚀",
      title: "Growth",
      description:
        "We help your business scale and reach new heights in the digital world",
    },
    {
      icon: "🤝",
      title: "Partnership",
      description:
        "Your success is our success - we're committed to building lasting relationships",
    },
  ];

  const team = [
    {
      name: "Simo Bouachra",
      role: "Creative Director",
      color: "from-[#0a0a0a] to-white/80",
    },
    {
      name: "Walid Ait Harma",
      role: "Web Developer",
      color: "from-white/80 to-[#0a0a0a]",
    },
  ];

  return (
    <main
      ref={containerRef}
      className="bg-[#0a0a0a] max-w-[90%] mx-auto text-white min-h-screen"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      {/* Hero Section with Text Reveal */}
      <section
        className="min-h-screen flex items-center sm:items-start justify-center px-4 sm:mt-20 pb-20 sm:pb-0"
        aria-label="About Hero Section"
      >
        <div
          className="text-center"
          style={{
            opacity: heroOpacity,
            transform: `scale(${heroScale})`,
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div
              className="border-2 border-white/80 w-2 h-2 rounded-xs rotate-45"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: `translateY(${isLoaded ? "0" : "20px"})`,
                transition:
                  "opacity 0.8s ease-out, transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: "0.2s",
              }}
              aria-hidden="true"
            ></div>
            <span
              className="text-sm sm:text-base uppercase tracking-wider"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: `translateY(${isLoaded ? "0" : "20px"})`,
                transition:
                  "opacity 0.8s ease-out, transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: "0.3s",
              }}
            >
              About Us
            </span>
          </div>

          {/* Main heading with overflow reveal */}
          <div className="overflow-hidden mb-8">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight"
              itemProp="headline"
              style={{
                transform: `translateY(${isLoaded ? "0" : "100%"})`,
                transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: "0.4s",
              }}
            >
              We craft digital experiences that{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
                inspire
              </span>
            </h1>
          </div>

          {/* Subheading with reveal */}
          <div className="overflow-hidden">
            <p
              className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed"
              itemProp="description"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: `translateY(${isLoaded ? "0" : "100%"})`,
                transition:
                  "opacity 1s ease-out, transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: "0.6s",
              }}
            >
              A passionate team dedicated to transforming ideas into stunning
              digital realities
            </p>
          </div>

          <div
            className="mt-16"
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: "opacity 1s ease-out",
              transitionDelay: "0.8s",
            }}
            aria-hidden="true"
          >
            <div className="flex flex-col items-center gap-2 animate-bounce">
              <span className="text-sm text-white/50">Scroll to continue</span>
              <svg
                className="w-6 h-6 text-white/50"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section with Reveal */}
      <section
        className="min-h-screen flex items-center justify-center px-4 py-20"
        aria-label="Our Story"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <div
          className="max-w-4xl mx-auto"
          style={{
            opacity: storyOpacity,
            transform: `translateY(${storyY}px)`,
          }}
        >
          <div className="overflow-hidden mb-8">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
              style={{
                transform: `translateY(${storyOpacity < 0.5 ? "100%" : "0"})`,
                transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              Our Story
            </h2>
          </div>
          <div className="space-y-6 text-lg sm:text-xl md:text-2xl text-white/80 leading-relaxed">
            <p itemProp="description">
              Founded in{" "}
              <time dateTime="2019" itemProp="foundingDate">
                2019
              </time>
              , SouthBox began with a simple mission: to bridge the gap between
              creative vision and technical excellence. We believe that great
              digital products aren&apos;t just functional—they&apos;re
              experiences that resonate.
            </p>
            <p>
              Our journey started with a small team of dreamers and doers who
              refused to accept the status quo. Today, we&apos;ve grown into a
              collective of passionate designers, developers, and strategists
              who share one common goal: creating work that matters.
            </p>
            <p>
              We don&apos;t just build websites and apps. We craft digital
              ecosystems that help businesses thrive in an ever-evolving digital
              landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section with Reveal */}
      <section
        className="min-h-screen flex items-center justify-center px-4 py-20"
        aria-label="Statistics"
      >
        <div
          className="max-w-6xl mx-auto w-full"
          style={{
            opacity: statsOpacity,
            transform: `scale(${statsScale})`,
          }}
        >
          <div className="overflow-hidden mb-16">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-center"
              style={{
                transform: `translateY(${statsOpacity < 0.5 ? "100%" : "0"})`,
                transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              By the Numbers
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <article
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
                itemScope
                itemType="https://schema.org/QuantitativeValue"
              >
                <div className="text-5xl mb-4" aria-hidden="true">
                  {stat.icon}
                </div>
                <div
                  className="text-4xl sm:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60"
                  itemProp="value"
                >
                  {stat.number}
                </div>
                <div
                  className="text-sm sm:text-base text-white/70"
                  itemProp="name"
                >
                  {stat.label}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section with Reveal */}
      <section
        className="min-h-screen flex items-center justify-center px-4 py-20"
        aria-label="Our Values"
      >
        <div
          className="max-w-6xl mx-auto w-full"
          style={{ opacity: valuesOpacity }}
        >
          <div className="overflow-hidden mb-16">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-center"
              style={{
                transform: `translateY(${valuesOpacity < 0.5 ? "100%" : "0"})`,
                transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              What We Value
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <article
                key={index}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500"
                style={{
                  opacity: valuesOpacity,
                  transform: `translateY(${(1 - valuesOpacity) * 30}px)`,
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className="text-5xl sm:text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300"
                  aria-hidden="true"
                >
                  {value.icon}
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold mb-4">
                  {value.title}
                </h3>
                <p className="text-base sm:text-lg text-white/70 leading-relaxed">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section with Reveal */}
      <section
        className="min-h-screen flex items-center justify-center px-4 py-20"
        aria-label="Meet the Team"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <div
          className="max-w-6xl mx-auto w-full"
          style={{
            opacity: teamOpacity,
            transform: `translateY(${teamY}px)`,
          }}
        >
          <div className="overflow-hidden mb-16">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-center"
              style={{
                transform: `translateY(${teamOpacity < 0.5 ? "100%" : "0"})`,
                transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              Meet the Team
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {team.map((member, index) => (
              <article
                key={index}
                className="group relative overflow-hidden rounded-2xl aspect-square"
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
                itemScope
                itemType="https://schema.org/Person"
                itemProp="employee"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-80 group-hover:opacity-100 transition-opacity duration-500`}
                  aria-hidden="true"
                ></div>
                <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 rounded-full mb-4 group-hover:scale-110 transition-transform duration-500"
                    aria-hidden="true"
                  ></div>
                  <h3
                    className="text-xl sm:text-2xl font-bold mb-2"
                    itemProp="name"
                  >
                    {member.name}
                  </h3>
                  <p
                    className="text-sm sm:text-base text-white/80"
                    itemProp="jobTitle"
                  >
                    {member.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Reveal */}
      <section
        className="min-h-screen flex items-center justify-center px-4 py-20"
        aria-label="Call to Action"
      >
        <div
          className="max-w-4xl mx-auto text-center"
          style={{
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
          }}
        >
          <div className="overflow-hidden mb-8">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
              style={{
                transform: `translateY(${ctaOpacity < 0.5 ? "100%" : "0"})`,
                transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              Ready to work with us?
            </h2>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl text-white/70 mb-12 leading-relaxed">
            Let&apos;s create something amazing together
          </p>
          <button
            onClick={() => router.push("/Contact")}
            className="px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all duration-300 transform hover:scale-105"
            aria-label="Start a project with South Box"
          >
            Start a Project
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-white/50">
        <p>&copy; 2025 SouthBox. All rights reserved.</p>
      </footer>
    </main>
  );
}
