import Image from "next/image";
import React from "react";

interface TrustusPageProps {
  scrollProgress?: number;
}

function TrustusPage({ scrollProgress = 0 }: TrustusPageProps) {
  const images = [
    "/images/bayer.svg",
    "/images/brother-1.svg",
    "/images/gl-events.svg",
    "/images/lavazza.svg",
    "/images/navya.svg",
    "/images/pizza-hut-1.svg",
    "/images/saintgobain.svg",
    "/images/toolstation.svg",
  ];

  // Calculate scale based on scroll progress
  // Starts at 0.9, reaches 1 at progress 0.5, then scales to 1.05 at progress 1
  const scale =
    scrollProgress < 0.5
      ? 0.9 + scrollProgress * 0.2
      : 1 + (scrollProgress - 0.5) * 0.1;

  // Calculate opacity - fades in during first half
  const opacity = Math.min(1, scrollProgress * 2);

  // Calculate individual company animations based on scroll progress
  const getCompanyStyle = (index: number) => {
    // Each company animates in sequence
    const delay = index * 0.08; // Staggered delay
    const itemProgress = Math.max(0, Math.min(1, (scrollProgress - delay) * 2));

    return {
      opacity: itemProgress,
      transform: `translateY(${(1 - itemProgress) * 30}px) scale(${
        0.8 + itemProgress * 0.2
      })`,
      transition: "opacity 0.1s ease-out, transform 0.1s ease-out",
    };
  };

  return (
    <section
      className="h-screen max-w-[90%] mx-auto flex flex-col items-center justify-center gap-20 pb-20 lg:pt-20 2xl:pt-0"
      style={{
        transform: `scale(${scale})`,
        opacity: opacity,
        transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
      }}
    >
      {/* Header */}
      <div
        className="text-center"
        style={{
          opacity: Math.min(1, scrollProgress * 3),
          transform: `translateY(${
            (1 - Math.min(1, scrollProgress * 3)) * 20
          }px)`,
          transition: "opacity 0.1s ease-out, transform 0.1s ease-out",
        }}
      >
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl 
          font-semibold
          leading-tight"
        >
          They trust us
        </h2>
      </div>

      {/* Companies Grid */}
      <div
        className="w-full 
        grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 
        gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10
        place-items-center"
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="w-16 h-16 
              sm:w-20 sm:h-20 
              md:w-24 md:h-24 
              lg:w-24 lg:h-24
              group relative rounded-xl sm:rounded-2xl 
              shadow-lg hover:shadow-2xl 
              transition-all duration-500"
            style={getCompanyStyle(index)}
          >
            <Image src={img} alt="company" width={300} height={300} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrustusPage;
