"use client";

import { useEffect, useRef, useState } from "react";
import MainPage from "../components/Landing page/MainPage";
import Letstalk from "../components/Landing page/Letstalk";
import WhatwedoPage from "../components/Landing page/WhatwedoPage";
import TextReveal from "../components/Landing page/TextReveal";
import ProjectsSection from "../components/Landing page/ProjectsSection";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [section2Progress, setSection2Progress] = useState(0);
  const [section3Progress, setSection3Progress] = useState(0);
  const [section4Progress, setSection4Progress] = useState(0);

  const isScrolling = useRef(false);
  const animationFrameRef = useRef<number>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (
        isScrolling.current &&
        currentSection !== 0 &&
        currentSection !== 2 &&
        currentSection !== 3 &&
        currentSection !== 4
      )
        return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const scrollAmount = Math.abs(e.deltaY);

      // Handle section 0 scroll progress
      if (currentSection === 0) {
        setScrollProgress((prev) => {
          const delta = (scrollAmount / 1500) * direction;
          const newProgress = Math.max(0, Math.min(1, prev + delta));

          if (newProgress >= 1 && direction === 1 && !isScrolling.current) {
            isScrolling.current = true;
            setTimeout(() => {
              setCurrentSection(1);
              isScrolling.current = false;
            }, 100);
          }

          return newProgress;
        });
        return;
      }

      // Scrolling up from section 1 back to section 0
      if (currentSection === 1 && direction === -1) {
        isScrolling.current = true;
        setCurrentSection(0);
        setScrollProgress(1);

        setTimeout(() => {
          isScrolling.current = false;
        }, 800);
        return;
      }

      // Handle section 1 to section 2 transition
      if (currentSection === 1 && direction === 1) {
        isScrolling.current = true;
        setCurrentSection(2);
        setSection2Progress(0);

        setTimeout(() => {
          isScrolling.current = false;
        }, 800);
        return;
      }

      // Handle section 2 scroll progress
      if (currentSection === 2) {
        setSection2Progress((prev) => {
          const delta = (scrollAmount / 1500) * direction;
          const newProgress = Math.max(0, Math.min(1, prev + delta));

          if (newProgress <= 0 && direction === -1 && !isScrolling.current) {
            isScrolling.current = true;
            setTimeout(() => {
              setCurrentSection(1);
              isScrolling.current = false;
            }, 100);
          }

          if (newProgress >= 1 && direction === 1 && !isScrolling.current) {
            isScrolling.current = true;
            setTimeout(() => {
              setCurrentSection(3);
              setSection3Progress(0);
              isScrolling.current = false;
            }, 100);
          }

          return newProgress;
        });
        return;
      }

      // Handle section 3 scroll progress
      if (currentSection === 3) {
        setSection3Progress((prev) => {
          const delta = (scrollAmount / 1500) * direction;
          const newProgress = Math.max(0, Math.min(1, prev + delta));

          if (newProgress <= 0 && direction === -1 && !isScrolling.current) {
            isScrolling.current = true;
            setTimeout(() => {
              setCurrentSection(2);
              setSection2Progress(1);
              isScrolling.current = false;
            }, 100);
          }

          if (newProgress >= 1 && direction === 1 && !isScrolling.current) {
            isScrolling.current = true;
            setTimeout(() => {
              setCurrentSection(4);
              setSection4Progress(0);
              isScrolling.current = false;
            }, 100);
          }

          return newProgress;
        });
        return;
      }

      // Handle section 4 scroll progress - Extended for more projects
      if (currentSection === 4) {
        setSection4Progress((prev) => {
          // Slower scroll speed for section 4 to accommodate 8 projects
          const delta = (scrollAmount / 2000) * direction;
          // Allow scrolling up to 2.0 (double the normal range) for more content
          const newProgress = Math.max(0, Math.min(2.0, prev + delta));

          if (newProgress <= 0 && direction === -1 && !isScrolling.current) {
            isScrolling.current = true;
            setTimeout(() => {
              setCurrentSection(3);
              setSection3Progress(1);
              isScrolling.current = false;
            }, 100);
          }

          return newProgress;
        });
        return;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentSection]);

  return (
    <main ref={containerRef} className="custom-height overflow-hidden">
      <div
        className="transition-transform duration-700 ease-out"
        style={{
          transform: `translateY(-${currentSection * 100}vh)`,
        }}
      >
        <MainPage scrollProgress={scrollProgress} />
        <Letstalk />
        <TextReveal scrollProgress={section2Progress} />
        <WhatwedoPage scrollProgress={section3Progress} />
        <ProjectsSection scrollProgress={section4Progress} />{" "}
      </div>
    </main>
  );
}
