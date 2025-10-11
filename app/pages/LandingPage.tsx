"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import MainPage from "../components/Landing page/MainPage";
import Letstalk from "../components/Landing page/Letstalk";
import WhatwedoPage from "../components/Landing page/WhatwedoPage";
import TextReveal from "../components/Landing page/TextReveal";
import ProjectsSection from "../components/Landing page/ProjectsSection";
import TrustusPage from "../components/Landing page/TrustusPage";
import Footer from "../components/Footer";
import LeaveRequest from "../components/Landing page/LeaveRequest";

const SECTIONS = {
  MAIN: 0,
  LETSTALK: 1,
  TEXT_REVEAL: 2,
  WHATWEDO: 3,
  PROJECTS: 4,
  TRUSTUS: 5,
  LEAVEREQUEST: 6,
  FOOTER: 7,
};

const SCROLL_CONFIG = {
  STANDARD_DIVISOR: 1500,
  PROJECTS_DIVISOR: 2000,
  PROJECTS_MAX: 2.0,
  TRANSITION_DELAY: 100,
  LONG_TRANSITION_DELAY: 800,
  MOBILE_STANDARD_DIVISOR: 1000,
  MOBILE_PROJECTS_DIVISOR: 1500,
  TOUCH_SENSITIVITY: 0.5, // Lower = more sensitive to touch
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(SECTIONS.MAIN);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [section2Progress, setSection2Progress] = useState(0);
  const [section3Progress, setSection3Progress] = useState(0);
  const [section4Progress, setSection4Progress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const isScrolling = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Touch handling refs
  const touchStartY = useRef<number>(0);
  const touchStartTime = useRef<number>(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const transitionToSection = useCallback(
    (newSection: number, delay: number, callback?: () => void) => {
      isScrolling.current = true;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setCurrentSection(newSection);
        callback?.();
        isScrolling.current = false;
      }, delay);
    },
    []
  );

  const updateProgress = useCallback(
    (
      currentProgress: number,
      scrollAmount: number,
      direction: number,
      divisor: number,
      max = 1
    ) => {
      const delta = (scrollAmount / divisor) * direction;
      return Math.max(0, Math.min(max, currentProgress + delta));
    },
    []
  );

  const handleScrollLogic = useCallback(
    (direction: number, scrollAmount: number) => {
      const scrollableSections = [
        SECTIONS.MAIN,
        SECTIONS.TEXT_REVEAL,
        SECTIONS.WHATWEDO,
        SECTIONS.PROJECTS,
      ];

      if (isScrolling.current && !scrollableSections.includes(currentSection)) {
        return;
      }

      const standardDivisor = isMobile
        ? SCROLL_CONFIG.MOBILE_STANDARD_DIVISOR
        : SCROLL_CONFIG.STANDARD_DIVISOR;
      const projectsDivisor = isMobile
        ? SCROLL_CONFIG.MOBILE_PROJECTS_DIVISOR
        : SCROLL_CONFIG.PROJECTS_DIVISOR;

      // Section 0: Main page
      if (currentSection === SECTIONS.MAIN) {
        setScrollProgress((prev) => {
          const newProgress = updateProgress(
            prev,
            scrollAmount,
            direction,
            standardDivisor
          );

          if (newProgress >= 1 && direction === 1 && !isScrolling.current) {
            transitionToSection(
              SECTIONS.LETSTALK,
              SCROLL_CONFIG.TRANSITION_DELAY
            );
          }

          return newProgress;
        });
        return;
      }

      // Section 1: Letstalk
      if (currentSection === SECTIONS.LETSTALK) {
        if (direction === -1) {
          setScrollProgress(1);
          transitionToSection(
            SECTIONS.MAIN,
            SCROLL_CONFIG.LONG_TRANSITION_DELAY
          );
        } else {
          setSection2Progress(0);
          transitionToSection(
            SECTIONS.TEXT_REVEAL,
            SCROLL_CONFIG.LONG_TRANSITION_DELAY
          );
        }
        return;
      }

      // Section 2: Text Reveal
      if (currentSection === SECTIONS.TEXT_REVEAL) {
        setSection2Progress((prev) => {
          const newProgress = updateProgress(
            prev,
            scrollAmount,
            direction,
            standardDivisor
          );

          if (newProgress <= 0 && direction === -1 && !isScrolling.current) {
            transitionToSection(
              SECTIONS.LETSTALK,
              SCROLL_CONFIG.TRANSITION_DELAY
            );
          } else if (
            newProgress >= 1 &&
            direction === 1 &&
            !isScrolling.current
          ) {
            transitionToSection(
              SECTIONS.WHATWEDO,
              SCROLL_CONFIG.TRANSITION_DELAY,
              () => setSection3Progress(0)
            );
          }

          return newProgress;
        });
        return;
      }

      // Section 3: What we do
      if (currentSection === SECTIONS.WHATWEDO) {
        setSection3Progress((prev) => {
          const newProgress = updateProgress(
            prev,
            scrollAmount,
            direction,
            standardDivisor
          );

          if (newProgress <= 0 && direction === -1 && !isScrolling.current) {
            transitionToSection(
              SECTIONS.TEXT_REVEAL,
              SCROLL_CONFIG.TRANSITION_DELAY,
              () => setSection2Progress(1)
            );
          } else if (
            newProgress >= 1 &&
            direction === 1 &&
            !isScrolling.current
          ) {
            transitionToSection(
              SECTIONS.PROJECTS,
              SCROLL_CONFIG.TRANSITION_DELAY,
              () => setSection4Progress(0)
            );
          }

          return newProgress;
        });
        return;
      }

      // Section 4: Projects
      if (currentSection === SECTIONS.PROJECTS) {
        setSection4Progress((prev) => {
          const newProgress = updateProgress(
            prev,
            scrollAmount,
            direction,
            projectsDivisor,
            SCROLL_CONFIG.PROJECTS_MAX
          );

          if (newProgress <= 0 && direction === -1 && !isScrolling.current) {
            transitionToSection(
              SECTIONS.WHATWEDO,
              SCROLL_CONFIG.TRANSITION_DELAY,
              () => setSection3Progress(1)
            );
          } else if (
            newProgress >= SCROLL_CONFIG.PROJECTS_MAX &&
            direction === 1 &&
            !isScrolling.current
          ) {
            transitionToSection(
              SECTIONS.TRUSTUS,
              SCROLL_CONFIG.TRANSITION_DELAY
            );
          }

          return newProgress;
        });
        return;
      }

      // Section 5: Trustus
      if (currentSection === SECTIONS.TRUSTUS) {
        if (direction === -1) {
          setSection4Progress(SCROLL_CONFIG.PROJECTS_MAX);
          transitionToSection(
            SECTIONS.PROJECTS,
            SCROLL_CONFIG.TRANSITION_DELAY
          );
        } else {
          transitionToSection(
            SECTIONS.LEAVEREQUEST,
            SCROLL_CONFIG.TRANSITION_DELAY
          );
        }
        return;
      }

      // Section 6: LEAVEREQUEST
      if (currentSection === SECTIONS.LEAVEREQUEST) {
        if (direction === -1) {
          setSection4Progress(SCROLL_CONFIG.PROJECTS_MAX);
          transitionToSection(SECTIONS.TRUSTUS, SCROLL_CONFIG.TRANSITION_DELAY);
        } else {
          transitionToSection(SECTIONS.FOOTER, SCROLL_CONFIG.TRANSITION_DELAY);
        }
        return;
      }

      // Section 7: Footer
      if (currentSection === SECTIONS.FOOTER && direction === -1) {
        transitionToSection(
          SECTIONS.LEAVEREQUEST,
          SCROLL_CONFIG.TRANSITION_DELAY
        );
        return;
      }
    },
    [currentSection, transitionToSection, updateProgress, isMobile]
  );

  // Wheel event handler
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? 1 : -1;
      const scrollAmount = Math.abs(e.deltaY);
      handleScrollLogic(direction, scrollAmount);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [handleScrollLogic]);

  // Touch event handlers
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartTime.current = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const touchDelta = touchStartY.current - touchEndY;
      const timeDelta = Date.now() - touchStartTime.current;

      // Calculate velocity for more natural feeling
      const velocity = Math.abs(touchDelta) / timeDelta;

      // Determine direction and scroll amount
      const direction = touchDelta > 0 ? 1 : -1;
      const scrollAmount =
        Math.abs(touchDelta) * SCROLL_CONFIG.TOUCH_SENSITIVITY;

      // Only register significant swipes
      if (Math.abs(touchDelta) > 30) {
        handleScrollLogic(direction, scrollAmount);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      container.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      container.addEventListener("touchend", handleTouchEnd, {
        passive: false,
      });
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [handleScrollLogic]);

  return (
    <main ref={containerRef} className="custom-height overflow-hidden relative">
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
        <ProjectsSection scrollProgress={section4Progress} />
        <TrustusPage />
        <LeaveRequest />
        <Footer />
      </div>
    </main>
  );
}
