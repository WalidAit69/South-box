"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function ServicesPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

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

  const heroOpacity = 1;
  const servicesOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.05) * 8));
  const processOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.35) * 5));
  const whyUsOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.55) * 5));
  const ctaOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.75) * 5));

  const services = [
    {
      icon: "🎨",
      title: "Brand Identity",
      description:
        "Crafting unique visual identities that capture your essence and resonate with your audience",
      features: [
        "Logo Design",
        "Brand Guidelines",
        "Visual Systems",
        "Color Palettes",
      ],
      gradient: "from-purple-500 via-pink-500 to-rose-500",
    },
    {
      icon: "💻",
      title: "Web Development",
      description:
        "Building lightning-fast, responsive websites that convert visitors into customers",
      features: [
        "Custom Websites",
        "E-commerce",
        "Web Apps",
        "CMS Integration",
      ],
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
    },
    {
      icon: "📱",
      title: "Mobile Apps",
      description:
        "Creating seamless mobile experiences that users love and return to daily",
      features: [
        "iOS Development",
        "Android Apps",
        "Cross-Platform",
        "App Design",
      ],
      gradient: "from-green-500 via-emerald-500 to-lime-500",
    },
    {
      icon: "🎬",
      title: "Motion Design",
      description:
        "Bringing your brand to life with captivating animations and video content",
      features: [
        "Animation",
        "Video Editing",
        "Motion Graphics",
        "3D Rendering",
      ],
      gradient: "from-orange-500 via-red-500 to-pink-500",
    },
    {
      icon: "📊",
      title: "Digital Marketing",
      description:
        "Data-driven strategies that amplify your reach and maximize ROI",
      features: ["SEO", "Social Media", "Content Strategy", "Analytics"],
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
    },
    {
      icon: "✨",
      title: "UI/UX Design",
      description:
        "Designing intuitive interfaces that delight users and drive engagement",
      features: [
        "User Research",
        "Wireframing",
        "Prototyping",
        "Usability Testing",
      ],
      gradient: "from-amber-500 via-orange-500 to-red-500",
    },
  ];

  const process = [
    {
      number: "01",
      title: "Discovery",
      description:
        "We dive deep into understanding your vision, goals, and target audience",
      icon: "🔍",
    },
    {
      number: "02",
      title: "Strategy",
      description:
        "We craft a comprehensive plan tailored to your unique needs and objectives",
      icon: "🎯",
    },
    {
      number: "03",
      title: "Design",
      description:
        "Our creative team brings concepts to life with stunning visual solutions",
      icon: "✏️",
    },
    {
      number: "04",
      title: "Development",
      description:
        "We build robust, scalable solutions using cutting-edge technologies",
      icon: "⚙️",
    },
    {
      number: "05",
      title: "Launch",
      description:
        "We ensure a smooth deployment and provide ongoing support for success",
      icon: "🚀",
    },
  ];

  const whyUs = [
    { title: "10+ Years Combined Experience", icon: "⭐" },
    { title: "Award-Winning Design", icon: "🏆" },
    { title: "100% Client Satisfaction", icon: "💯" },
    { title: "Fast Turnaround Times", icon: "⚡" },
    { title: "Transparent Communication", icon: "💬" },
    { title: "Ongoing Support", icon: "🤝" },
  ];

  return (
    <div
      ref={containerRef}
      className="bg-[#0a0a0a] max-w-[90%] mx-auto text-white min-h-screen"
    >
      {/* Hero Section */}
      <section className="min-h-screen flex items-center sm:items-start justify-center px-4 sm:mt-20 pb-20 sm:pb-0">
        <div
          className="max-w-6xl mx-auto text-center"
          style={{ opacity: heroOpacity }}
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
              Our Services
            </span>
          </div>

          <div className="overflow-hidden mb-8">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight"
              style={{
                transform: `translateY(${isLoaded ? "0" : "100%"})`,
                transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: "0.4s",
              }}
            >
              Elevate your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
                digital presence
              </span>
            </h1>
          </div>

          <div className="overflow-hidden">
            <p
              className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: `translateY(${isLoaded ? "0" : "100%"})`,
                transition:
                  "opacity 1s ease-out, transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: "0.6s",
              }}
            >
              From concept to execution, we deliver comprehensive digital
              solutions that drive results
            </p>
          </div>

          {/* Floating geometric shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <div className="absolute top-20 left-10 w-20 h-20 border border-amber-500 rotate-12 animate-pulse"></div>
            <div
              className="absolute bottom-40 right-20 w-16 h-16 border border-cyan-500 -rotate-12 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 right-10 w-12 h-12 border border-pink-500 rotate-45 animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div
          className="max-w-7xl mx-auto w-full"
          style={{ opacity: servicesOpacity }}
        >
          <div className="overflow-hidden mb-16">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-center"
              style={{
                transform: `translateY(${
                  servicesOpacity < 0.5 ? "100%" : "0"
                })`,
                transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              What We Offer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 overflow-hidden"
                style={{
                  opacity: servicesOpacity,
                  transform: `translateY(${(1 - servicesOpacity) * 50}px)`,
                  transitionDelay: `${index * 100}ms`,
                }}
                onMouseEnter={() => setActiveService(index)}
              >
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                <div className="relative z-10">
                  <div className="text-5xl sm:text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    {service.icon}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                    {service.title}
                  </h3>

                  <p className="text-white/70 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-white/60"
                      >
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <button className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-all duration-300 group-hover:translate-x-2">
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div
          className="max-w-6xl mx-auto w-full"
          style={{ opacity: processOpacity }}
        >
          <div className="overflow-hidden mb-16">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-center"
              style={{
                transform: `translateY(${processOpacity < 0.5 ? "100%" : "0"})`,
                transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              Our Process
            </h2>
          </div>

          <div className="space-y-8">
            {process.map((step, index) => (
              <div
                key={index}
                className="group relative"
                style={{
                  opacity: processOpacity,
                  transform: `translateX(${
                    (1 - processOpacity) * (index % 2 === 0 ? -50 : 50)
                  }px)`,
                  transitionDelay: `${index * 100}ms`,
                  transition:
                    "opacity 0.8s ease-out, transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-500">
                  <div className="flex-shrink-0">
                    <div className="text-4xl sm:text-5xl md:text-6xl">
                      {step.icon}
                    </div>
                  </div>

                  <div className="flex-grow w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                      <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                        {step.number}
                      </span>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {index < process.length - 1 && (
                  <div className="flex justify-center my-4">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-amber-400 to-transparent"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div
          className="max-w-6xl mx-auto w-full"
          style={{ opacity: whyUsOpacity }}
        >
          <div className="overflow-hidden mb-16">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-center"
              style={{
                transform: `translateY(${whyUsOpacity < 0.5 ? "100%" : "0"})`,
                transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              Why Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-105 transition-all duration-500"
                style={{
                  opacity: whyUsOpacity,
                  transform: `translateY(${(1 - whyUsOpacity) * 30}px)`,
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className="text-4xl">{item.icon}</div>
                <div className="text-lg font-semibold">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div
          className="max-w-4xl mx-auto text-center"
          style={{ opacity: ctaOpacity }}
        >
          <div className="overflow-hidden mb-8">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
              style={{
                transform: `translateY(${ctaOpacity < 0.5 ? "100%" : "0"})`,
                transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              Ready to start your project?
            </h2>
          </div>

          <p className="text-lg sm:text-xl md:text-2xl text-white/70 mb-12 leading-relaxed">
            Let&apos;s transform your vision into reality
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => router.push("/")}
              className="px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-white/50">
        <p>&copy; 2025 SouthBox. All rights reserved.</p>
      </footer>
    </div>
  );
}
