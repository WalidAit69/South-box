import Image from "next/image";

export default function Footer() {
  const footerLinks = [
    { label: "Contact us", href: "/Contact" },
    { label: "Join the team", href: "/careers" },
    { label: "Terms and conditions", href: "/terms" },
    { label: "Privacy policy", href: "/privacy" },
  ];

  const socialLinks = [
    { name: "Twitter", url: "https://twitter.com/southbox", icon: "twitter" },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/company/southbox",
      icon: "linkedin",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/southbox",
      icon: "instagram",
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col justify-center w-full"
      itemScope
      itemType="https://schema.org/WPFooter"
      role="contentinfo"
      aria-label="Site Footer"
    >
      <div className="border-t border-gray-600 text-white py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-[90%] mx-auto w-full">
          {/* Main Content */}
          <div className="flex items-center flex-col sm:flex-row justify-between mb-16">
            {/* Left Section */}
            <div className="lg:col-span-1">
              <h2 className="text-4xl md:text-5xl font-light mb-4">
                You can find us
              </h2>
            </div>

            {/* Contact Information */}
            <address
              className="space-y-3 not-italic"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-semibold">
                  <span itemProp="addressLocality">Agadir</span>,
                </h3>
                <span
                  className="text-gray-300 text-sm whitespace-pre-line"
                  itemProp="streetAddress"
                >
                  Founty
                </span>
              </div>
              <meta itemProp="addressCountry" content="MA" />
              <meta itemProp="addressRegion" content="Souss-Massa" />

              <p className="text-gray-300 text-sm" itemProp="telephone">
                <a
                  href="tel:+2126000000"
                  className="hover:text-white transition-colors"
                  aria-label="Call South Box at 06000000"
                >
                  06000000
                </a>
              </p>
              <p className="text-gray-300 text-sm" itemProp="email">
                <a
                  href="mailto:southbox@gmail.com"
                  className="hover:text-white transition-colors"
                  aria-label="Email South Box at southbox@gmail.com"
                >
                  southbox@gmail.com
                </a>
              </p>
            </address>
          </div>

          {/* Logo Section */}
          <div
            className="flex justify-center mb-16"
            itemScope
            itemType="https://schema.org/Organization"
          >
            <a href="/" aria-label="South Box home page" itemProp="url">
              <Image
                src="/prism.png"
                alt="South Box logo - Digital Creative Agency"
                width={200}
                height={200}
                itemProp="logo"
              />
            </a>
            <meta itemProp="name" content="South Box" />
            <meta
              itemProp="description"
              content="Digital Creative Agency specializing in web development, design, and digital solutions"
            />
          </div>

          {/* Social Media Links (Optional - uncomment if needed) */}
          <div className="sr-only">
            <h3>Follow Us</h3>
            <nav aria-label="Social Media">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  itemProp="sameAs"
                >
                  {social.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-gray-600">
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              <time dateTime="2025">2025</time> - ©{" "}
              <span
                itemProp="copyrightHolder"
                itemScope
                itemType="https://schema.org/Organization"
              >
                <span itemProp="name">South Box</span>
              </span>
            </p>

            {/* Footer Links */}
            <nav
              className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-8"
              aria-label="Footer Navigation"
              itemScope
              itemType="https://schema.org/SiteNavigationElement"
            >
              {footerLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-300 hover:text-white text-sm transition-colors duration-200"
                  itemProp="url"
                >
                  <span itemProp="name">{link.label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Hidden structured data for comprehensive SEO */}
          <div className="sr-only">
            <div itemScope itemType="https://schema.org/Organization">
              <span itemProp="name">South Box</span>
              <span itemProp="description">
                Digital Creative Agency based in Agadir, Morocco. We specialize
                in web development, mobile apps, branding, UI/UX design, and
                digital marketing.
              </span>
              <link itemProp="url" href="https://yourdomain.com" />

              <div
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
              >
                <span itemProp="streetAddress">Founty</span>
                <span itemProp="addressLocality">Agadir</span>
                <span itemProp="addressRegion">Souss-Massa</span>
                <span itemProp="addressCountry">Morocco</span>
              </div>

              <span itemProp="telephone">+212-6000000</span>
              <span itemProp="email">southbox@gmail.com</span>

              <div
                itemProp="geo"
                itemScope
                itemType="https://schema.org/GeoCoordinates"
              >
                <meta itemProp="latitude" content="30.4278" />
                <meta itemProp="longitude" content="-9.5981" />
              </div>

              <meta itemProp="foundingDate" content="2019" />
              <meta itemProp="priceRange" content="$$" />

              <div
                itemProp="contactPoint"
                itemScope
                itemType="https://schema.org/ContactPoint"
              >
                <meta itemProp="telephone" content="+212-6000000" />
                <meta itemProp="contactType" content="Customer Service" />
                <meta itemProp="email" content="southbox@gmail.com" />
                <meta itemProp="areaServed" content="Worldwide" />
                <meta itemProp="availableLanguage" content="English" />
                <meta itemProp="availableLanguage" content="French" />
                <meta itemProp="availableLanguage" content="Arabic" />
              </div>

              {socialLinks.map((social, index) => (
                <link key={index} itemProp="sameAs" href={social.url} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
