"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import MainPage from "../components/Landing page/MainPage";
import Letstalk from "../components/Landing page/Letstalk";
import TextReveal from "../components/Landing page/TextReveal";
import WhatwedoPage from "../components/Landing page/WhatwedoPage";
import ProjectsSection from "../components/Landing page/ProjectsSection";
import TrustusPage from "../components/Landing page/TrustusPage";
import LeaveRequest from "../components/Landing page/LeaveRequest";
import Footer from "../components/Footer";

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
  MOBILE_STANDARD_DIVISOR: 600,
  MOBILE_PROJECTS_DIVISOR: 800,
  TOUCH_SENSITIVITY: 1.5,
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(SECTIONS.MAIN);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [letsTalkProgress, setLetsTalkProgress] = useState(0);
  const [section2Progress, setSection2Progress] = useState(0);
  const [section3Progress, setSection3Progress] = useState(0);
  const [section4Progress, setSection4Progress] = useState(0);
  const [trustusProgress, setTrustusProgress] = useState(0);
  const [leaveRequestProgress, setLeaveRequestProgress] = useState(0);
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
        SECTIONS.LETSTALK,
        SECTIONS.TEXT_REVEAL,
        SECTIONS.WHATWEDO,
        SECTIONS.PROJECTS,
        SECTIONS.TRUSTUS,
        SECTIONS.LEAVEREQUEST,
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
        const newProgress = updateProgress(
          scrollProgress,
          scrollAmount,
          direction,
          standardDivisor
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1 && direction === 1 && !isScrolling.current) {
          transitionToSection(
            SECTIONS.LETSTALK,
            SCROLL_CONFIG.TRANSITION_DELAY,
            () => setLetsTalkProgress(0)
          );
        }
        return;
      }

      // Section 1: Letstalk
      if (currentSection === SECTIONS.LETSTALK) {
        const newProgress = updateProgress(
          letsTalkProgress,
          scrollAmount,
          direction,
          standardDivisor
        );
        setLetsTalkProgress(newProgress);

        if (newProgress <= 0 && direction === -1 && !isScrolling.current) {
          transitionToSection(
            SECTIONS.MAIN,
            SCROLL_CONFIG.LONG_TRANSITION_DELAY,
            () => setScrollProgress(1)
          );
        } else if (
          newProgress >= 1 &&
          direction === 1 &&
          !isScrolling.current
        ) {
          transitionToSection(
            SECTIONS.TEXT_REVEAL,
            SCROLL_CONFIG.LONG_TRANSITION_DELAY,
            () => setSection2Progress(0)
          );
        }
        return;
      }

      // Section 2: Text Reveal
      if (currentSection === SECTIONS.TEXT_REVEAL) {
        const newProgress = updateProgress(
          section2Progress,
          scrollAmount,
          direction,
          standardDivisor
        );
        setSection2Progress(newProgress);

        if (newProgress <= 0 && direction === -1 && !isScrolling.current) {
          transitionToSection(
            SECTIONS.LETSTALK,
            SCROLL_CONFIG.TRANSITION_DELAY,
            () => setLetsTalkProgress(1)
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
        return;
      }

      // Section 3: What we do
      if (currentSection === SECTIONS.WHATWEDO) {
        const newProgress = updateProgress(
          section3Progress,
          scrollAmount,
          direction,
          standardDivisor
        );
        setSection3Progress(newProgress);

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
        return;
      }

      // Section 4: Projects
      if (currentSection === SECTIONS.PROJECTS) {
        const newProgress = updateProgress(
          section4Progress,
          scrollAmount,
          direction,
          projectsDivisor,
          SCROLL_CONFIG.PROJECTS_MAX
        );
        setSection4Progress(newProgress);

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
            SCROLL_CONFIG.TRANSITION_DELAY,
            () => setTrustusProgress(0)
          );
        }
        return;
      }

      // Section 5: Trustus
      if (currentSection === SECTIONS.TRUSTUS) {
        const newProgress = updateProgress(
          trustusProgress,
          scrollAmount,
          direction,
          standardDivisor
        );
        setTrustusProgress(newProgress);

        if (newProgress <= 0 && direction === -1 && !isScrolling.current) {
          transitionToSection(
            SECTIONS.PROJECTS,
            SCROLL_CONFIG.TRANSITION_DELAY,
            () => setSection4Progress(SCROLL_CONFIG.PROJECTS_MAX)
          );
        } else if (
          newProgress >= 1 &&
          direction === 1 &&
          !isScrolling.current
        ) {
          transitionToSection(
            SECTIONS.LEAVEREQUEST,
            SCROLL_CONFIG.TRANSITION_DELAY,
            () => setLeaveRequestProgress(0)
          );
        }
        return;
      }

      // Section 6: LEAVEREQUEST
      if (currentSection === SECTIONS.LEAVEREQUEST) {
        const newProgress = updateProgress(
          leaveRequestProgress,
          scrollAmount,
          direction,
          standardDivisor
        );
        setLeaveRequestProgress(newProgress);

        if (newProgress <= 0 && direction === -1 && !isScrolling.current) {
          transitionToSection(
            SECTIONS.TRUSTUS,
            SCROLL_CONFIG.TRANSITION_DELAY,
            () => setTrustusProgress(1)
          );
        } else if (
          newProgress >= 1 &&
          direction === 1 &&
          !isScrolling.current
        ) {
          transitionToSection(SECTIONS.FOOTER, SCROLL_CONFIG.TRANSITION_DELAY);
        }
        return;
      }

      // Section 7: Footer
      if (currentSection === SECTIONS.FOOTER && direction === -1) {
        transitionToSection(
          SECTIONS.LEAVEREQUEST,
          SCROLL_CONFIG.TRANSITION_DELAY,
          () => setLeaveRequestProgress(1)
        );
        return;
      }
    },
    [
      currentSection,
      scrollProgress,
      letsTalkProgress,
      section2Progress,
      section3Progress,
      section4Progress,
      trustusProgress,
      leaveRequestProgress,
      transitionToSection,
      updateProgress,
      isMobile,
    ]
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

      const direction = touchDelta > 0 ? 1 : -1;
      const scrollAmount =
        Math.abs(touchDelta) * SCROLL_CONFIG.TOUCH_SENSITIVITY;

      if (Math.abs(touchDelta) > 20) {
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
        case " ":
          e.preventDefault();
          handleScrollLogic(1, 100);
          break;
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          handleScrollLogic(-1, 100);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleScrollLogic]);

  return (
    <main
      ref={containerRef}
      className="custom-height overflow-hidden relative bg-[#0a0a0a]"
      itemScope
      itemType="https://schema.org/WebPage"
      role="main"
      aria-label="South Box Digital Creative Agency Homepage"
    >
      <div
        className="transition-transform duration-700 ease-out"
        style={{
          transform: `translateY(-${currentSection * 100}vh)`,
        }}
      >
        <section
          aria-label="Hero Section"
          style={{
            pointerEvents: currentSection === SECTIONS.MAIN ? "auto" : "none",
          }}
        >
          <MainPage scrollProgress={scrollProgress} />
        </section>
        <section
          aria-label="Let's Talk Section"
          style={{
            pointerEvents:
              currentSection === SECTIONS.LETSTALK ? "auto" : "none",
          }}
        >
          <Letstalk scrollProgress={letsTalkProgress} />
        </section>
        <section
          aria-label="Text Reveal Section"
          style={{
            pointerEvents:
              currentSection === SECTIONS.TEXT_REVEAL ? "auto" : "none",
          }}
        >
          <TextReveal scrollProgress={section2Progress} />
        </section>
        <section
          aria-label="What We Do Section"
          style={{
            pointerEvents:
              currentSection === SECTIONS.WHATWEDO ? "auto" : "none",
          }}
        >
          <WhatwedoPage scrollProgress={section3Progress} />
        </section>
        <section
          aria-label="Projects Section"
          style={{
            pointerEvents:
              currentSection === SECTIONS.PROJECTS ? "auto" : "none",
          }}
        >
          <ProjectsSection scrollProgress={section4Progress} />
        </section>
        <section
          aria-label="Trust Us Section"
          style={{
            pointerEvents:
              currentSection === SECTIONS.TRUSTUS ? "auto" : "none",
          }}
        >
          <TrustusPage scrollProgress={trustusProgress} />
        </section>
        <section
          aria-label="Leave Request Section"
          style={{
            pointerEvents:
              currentSection === SECTIONS.LEAVEREQUEST ? "auto" : "none",
          }}
        >
          <LeaveRequest scrollProgress={leaveRequestProgress} />
        </section>
        <footer
          aria-label="Footer"
          style={{
            pointerEvents: currentSection === SECTIONS.FOOTER ? "auto" : "none",
          }}
        >
          <Footer />
        </footer>
      </div>
    </main>
  );
}
