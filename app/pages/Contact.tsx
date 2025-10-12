"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Contact() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!formData.email || !formData.message) {
      setFormStatus("error");
      return;
    }

    setFormStatus("sending");

    setTimeout(() => {
      console.log("Form submitted:", formData);
      setFormStatus("success");
      setFormData({ email: "", message: "" });
      
      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    }, 1500);
  };

  const heroOpacity = 1;
  const heroScale = 1;

  const decorOpacity = Math.max(0, Math.min(1, scrollProgress * 3));
  const decorRotate = scrollProgress * 360;

  const formOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.2) * 4));
  const formY = (1 - Math.max(0, Math.min(1, (scrollProgress - 0.2) * 4))) * 100;

  const infoOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.5) * 4));
  const infoScale = 0.9 + Math.max(0, Math.min(1, (scrollProgress - 0.5) * 4)) * 0.1;

  return (
    <main
      ref={containerRef}
      className="bg-[#0a0a0a] text-white min-h-screen"
    >
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-20 left-10 w-32 h-32 border-2 border-amber-500/30 rounded-full"
            style={{
              opacity: decorOpacity,
              transform: `rotate(${decorRotate}deg) scale(${0.8 + decorOpacity * 0.2})`,
              transition: "opacity 0.3s ease-out",
            }}
          ></div>
          <div
            className="absolute bottom-40 right-20 w-24 h-24 border-2 border-orange-500/30"
            style={{
              opacity: decorOpacity,
              transform: `rotate(${-decorRotate}deg) scale(${0.8 + decorOpacity * 0.2})`,
              transition: "opacity 0.3s ease-out",
            }}
          ></div>
          <div
            className="absolute top-1/2 right-10 w-16 h-16 border-2 border-pink-500/30 rotate-45"
            style={{
              opacity: decorOpacity,
              transform: `rotate(${decorRotate * 0.5}deg) scale(${0.8 + decorOpacity * 0.2})`,
              transition: "opacity 0.3s ease-out",
            }}
          ></div>
        </div>

        <div
          className="text-center max-w-4xl mx-auto relative z-10"
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
                transform: `translateY(${isLoaded ? "0" : "20px"}) rotate(45deg)`,
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
              Get In Touch
            </span>
          </div>

          <div className="overflow-hidden mb-8">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              style={{
                transform: `translateY(${isLoaded ? "0" : "100%"})`,
                transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: "0.4s",
              }}
            >
              Let&apos;s create something{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
                amazing
              </span>
            </h1>
          </div>

          <div className="overflow-hidden">
            <p
              className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: `translateY(${isLoaded ? "0" : "100%"})`,
                transition:
                  "opacity 1s ease-out, transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: "0.6s",
              }}
            >
              We&apos;d love to hear from you. Drop us a message and we&apos;ll get back
              to you as soon as possible.
            </p>
          </div>

          <div
            className="mt-16"
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: "opacity 1s ease-out",
              transitionDelay: "0.8s",
            }}
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

      {/* Form Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div
          className="w-full max-w-3xl mx-auto"
          style={{
            opacity: formOpacity,
            transform: `translateY(${formY}px)`,
          }}
        >
          <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 sm:p-12 shadow-2xl">
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Send us a message
              </h2>
              <p className="text-white/70 text-lg">
                Fill out the form below and we&apos;ll be in touch shortly
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-3 text-white/80"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all duration-300"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-3 text-white/80"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={8}
                  placeholder="Tell us about your project, ideas, or just say hello..."
                  className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all duration-300 resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={formStatus === "sending"}
                className="w-full px-8 py-5 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {formStatus === "sending" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : formStatus === "success" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    Message Sent!
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>

              {formStatus === "error" && (
                <p className="text-red-400 text-sm text-center">
                  Please fill in all fields
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div
          className="max-w-6xl mx-auto w-full"
          style={{
            opacity: infoOpacity,
            transform: `scale(${infoScale})`,
          }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Other ways to reach us
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Choose your preferred method of communication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:scale-105 transition-all duration-500">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                📧
              </div>
              <h3 className="text-2xl font-bold mb-3">Email</h3>
              <p className="text-white/70 mb-4">
                Drop us an email anytime
              </p>
              <a
                href="mailto:hello@southbox.com"
                className="text-amber-400 hover:text-amber-300 transition-colors"
              >
                hello@southbox.com
              </a>
            </div>

            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:scale-105 transition-all duration-500">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                📱
              </div>
              <h3 className="text-2xl font-bold mb-3">Phone</h3>
              <p className="text-white/70 mb-4">
                Give us a call during business hours
              </p>
              <a
                href="tel:+1234567890"
                className="text-amber-400 hover:text-amber-300 transition-colors"
              >
                +212 6000000
              </a>
            </div>

            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:scale-105 transition-all duration-500">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                🌐
              </div>
              <h3 className="text-2xl font-bold mb-3">Social</h3>
              <p className="text-white/70 mb-4">
                Connect with us on social media
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-8 py-6">
              <div className="text-3xl mb-3">📍</div>
              <h3 className="text-xl font-bold mb-2">Our Office</h3>
              <p className="text-white/70">
                Agadir, Morocco
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-white/50">
        <p>&copy; 2025 SouthBox. All rights reserved.</p>
      </footer>
    </main>
  );
}