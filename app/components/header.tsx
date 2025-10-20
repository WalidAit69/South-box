"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About",
      link: "/About",
    },
    {
      title: "Services",
      link: "/Services",
    },
    {
      title: "Contact",
      link: "/Contact",
    },
  ];

  return (
    <>
      <header className="bg-[#0a0a0a] max-w-[90%] m-auto flex items-center justify-between h-[70px] relative z-50">
        <Link href="/">
          <Image src="/southbox2.png" alt="logo" width={100} height={100} />
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="group flex items-center gap-2 cursor-pointer"
        >
          <div className="overflow-hidden relative w-16">
            <span
              className="block transition-transform duration-500 ease-out"
              style={{
                transform: isMenuOpen ? "translateY(-100%)" : "translateY(0)",
              }}
            >
              Menu
            </span>
            <span
              className="block absolute top-0 right-[10px] transition-transform duration-500 ease-out"
              style={{
                transform: isMenuOpen ? "translateY(0)" : "translateY(100%)",
              }}
            >
              Close
            </span>
          </div>
          <div
            className={`
              border-2 border-white/80 w-7 h-7 rounded-lg flex items-center justify-center
              transition-all duration-300 ease-in-out rotate-45
              group-hover:rotate-[135deg]
            `}
          >
            {isMenuOpen && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 rotate-45"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>
        </button>
      </header>

      {/* Menu Overlay with Blob Animation */}
      <div
        className={`
          fixed inset-0 bg-[#0a0a0a] z-40
          transition-all duration-[1s]
          ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        style={{
          transformOrigin: "top right",
          clipPath: isMenuOpen
            ? "circle(150% at 100% 0%)"
            : "circle(0% at 100% 0%)",
          transitionTimingFunction: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        }}
      >
        <nav className="flex items-center justify-start h-full pl-[10%]">
          <ul className="space-y-8 text-white text-8xl menu-link font-semibold">
            {links.map((item, index) => (
              <li key={item.title}>
                {/* Overflow wrapper for reveal animation */}
                <div className="overflow-hidden">
                  <Link
                    onClick={() => setIsMenuOpen(false)}
                    href={item.link}
                    className="hover:text-white/70 transition-colors inline-block will-change-transform"
                    style={{
                      transform: isMenuOpen
                        ? "translateY(0)"
                        : "translateY(100%)",
                      opacity: isMenuOpen ? 1 : 0,
                      transitionProperty: "transform, opacity",
                      transitionDuration: "1s, 0.8s",
                      transitionTimingFunction:
                        "cubic-bezier(0.16, 1, 0.3, 1), ease-out",
                      transitionDelay: isMenuOpen
                        ? `${index * 100 + 400}ms`
                        : "0ms",
                    }}
                  >
                    {item.title}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Header;
