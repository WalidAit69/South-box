import Image from "next/image";
import React from "react";

interface TrustusPageProps {
  scrollProgress?: number;
}

function TrustusPage({ scrollProgress = 0 }: TrustusPageProps) {
  // Company data with names for SEO
  const companies = [
    { name: "Bayer", logo: "/images/bayer.svg", url: "https://www.bayer.com" },
    {
      name: "Brother",
      logo: "/images/brother-1.svg",
      url: "https://www.brother.com",
    },
    {
      name: "GL Events",
      logo: "/images/gl-events.svg",
      url: "https://www.gl-events.com",
    },
    {
      name: "Lavazza",
      logo: "/images/lavazza.svg",
      url: "https://www.lavazza.com",
    },
    { name: "Navya", logo: "/images/navya.svg", url: "https://navya.tech" },
    {
      name: "Pizza Hut",
      logo: "/images/pizza-hut-1.svg",
      url: "https://www.pizzahut.com",
    },
    {
      name: "Saint-Gobain",
      logo: "/images/saintgobain.svg",
      url: "https://www.saint-gobain.com",
    },
    {
      name: "Toolstation",
      logo: "/images/toolstation.svg",
      url: "https://www.toolstation.com",
    },
  ];

  // Calculate scale based on scroll progress
  const scale =
    scrollProgress < 0.5
      ? 0.9 + scrollProgress * 0.2
      : 1 + (scrollProgress - 0.5) * 0.1;

  // Calculate opacity - fades in during first half
  const opacity = Math.min(1, scrollProgress * 2);

  // Calculate individual company animations based on scroll progress
  const getCompanyStyle = (index: number) => {
    const delay = index * 0.08;
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
    <div
      className="h-screen max-w-[90%] mx-auto flex flex-col items-center justify-center gap-20 pb-20 lg:pt-20 2xl:pt-0"
      style={{
        transform: `scale(${scale})`,
        opacity: opacity,
        transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
      }}
      itemScope
      itemType="https://schema.org/ItemList"
      aria-label="Our Trusted Clients"
    >
      {/* Hidden structured data for SEO */}
      <div className="sr-only">
        <h2 itemProp="name">Trusted by Leading Companies</h2>
        <p itemProp="description">
          South Box has worked with {companies.length} major companies including
          Bayer, Brother, GL Events, Lavazza, Navya, Pizza Hut, Saint-Gobain,
          and Toolstation.
        </p>
        <meta itemProp="numberOfItems" content={String(companies.length)} />
      </div>

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
          aria-hidden="true"
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
        role="list"
      >
        {companies.map((company, index) => (
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
            role="listitem"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <meta itemProp="position" content={String(index + 1)} />

            {/* Hidden structured data for each company */}
            <div
              className="sr-only"
              itemProp="item"
              itemScope
              itemType="https://schema.org/Organization"
            >
              <span itemProp="name">{company.name}</span>
              <link itemProp="url" href={company.url} />
            </div>

            {/* Visible logo */}
            <div
              itemProp="item"
              itemScope
              itemType="https://schema.org/ImageObject"
            >
              <Image
                src={company.logo}
                alt={`${company.name} logo - trusted client of South Box`}
                width={300}
                height={300}
                itemProp="contentUrl"
                title={`${company.name} - South Box Client`}
              />
              <meta itemProp="name" content={`${company.name} Logo`} />
              <meta
                itemProp="description"
                content={`${company.name} is a trusted client of South Box Digital Agency`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Hidden list for SEO - plain text */}
      <div className="sr-only">
        <h3>Our Clients Include:</h3>
        <ul>
          {companies.map((company, index) => (
            <li key={index}>
              <a href={company.url} rel="nofollow noopener noreferrer">
                {company.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TrustusPage;
