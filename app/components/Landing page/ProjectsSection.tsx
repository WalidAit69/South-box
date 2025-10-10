"use client";

import React from "react";

interface ProjectsSectionProps {
  scrollProgress: number;
}

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
}

export default function ProjectsSection({
  scrollProgress,
}: ProjectsSectionProps) {
  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "Development",
      image:
        "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    },
    {
      id: 2,
      title: "Brand Identity",
      category: "Branding",
      image:
        "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop",
    },
    {
      id: 3,
      title: "Mobile App Design",
      category: "UI/UX",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    },
    {
      id: 4,
      title: "Marketing Campaign",
      category: "Marketing",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    },
    {
      id: 5,
      title: "Corporate Website",
      category: "Web Design",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    },
    {
      id: 6,
      title: "Social Media Strategy",
      category: "Digital Marketing",
      image:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    },
    {
      id: 7,
      title: "Product Photography",
      category: "Photography",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
    },
    {
      id: 8,
      title: "Video Production",
      category: "Media",
      image:
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop",
    },
  ];

  // Calculate animation progress for each project
  const getProjectProgress = (index: number): number => {
    const startPoint = index * 0.15; // Adjusted stagger timing
    const duration = 0.5; // Animation duration
    const endPoint = startPoint + duration;

    if (scrollProgress < startPoint) return 0;
    if (scrollProgress > endPoint)
      return (scrollProgress - startPoint) / duration;

    return (scrollProgress - startPoint) / duration;
  };

  const getProjectStyle = (index: number) => {
    const progress = getProjectProgress(index);

    // Easing function for smoother animation
    const easeOutQuad = (t: number): number => {
      return t * (2 - t);
    };

    const easedProgress = easeOutQuad(Math.min(progress, 1));

    // Start at 40% scale and grow to full size
    const initialScale = 0.4;
    const scale = initialScale + easedProgress * (1 - initialScale);

    // Start from bottom of viewport (150% down) and move up beyond top
    const translateY = 150 - progress * 200; // Starts at 150%, moves to -50%

    // Faster fade in, slower fade out
    let opacity = 1;
    if (progress < 0.2) {
      // Quick fade in
      opacity = progress / 0.2;
    } else if (progress > 1.5) {
      // Fade out only when almost off screen (for last items)
      opacity = Math.max(0, 1 - (progress - 1.5) / 0.5);
    }

    return {
      transform: `translateY(${translateY}%) scale(${scale})`,
      opacity: opacity,
      transition: "none",
    };
  };

  return (
    <section className="custom-height mt-[250px] flex items-center justify-center px-4 py-20 relative overflow-visible">
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="relative overflow-hidden rounded-2xl group cursor-pointer w-[500px] h-[700px]"
              style={getProjectStyle(index)}
            >
              <div className="w-full h-full relative overflow-hidden bg-gray-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-sm text-white/80 mb-2 uppercase tracking-wider">
                      {project.category}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
