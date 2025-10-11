import Image from "next/image";

export default function Footer() {
  const footerLinks = [
    { label: "Contact us", href: "#" },
    { label: "Join the team", href: "#" },
    { label: "Terms and conditions", href: "#" },
    { label: "Privacy policy", href: "#" },
  ];

  return (
    <footer className="min-h-screen flex flex-col justify-center w-full">
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

            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-semibold">Agadir,</h3>
                <span className="text-gray-300 text-sm whitespace-pre-line">
                  Founty
                </span>
              </div>

              <p className="text-gray-300 text-sm">06000000</p>
              <p className="text-gray-300 text-sm">southbox@gmail.com</p>
            </div>
          </div>

          <div className="flex justify-center mb-16">
            <Image src="/prism.png" alt="logo" width={200} height={200} />
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-gray-600">
            {/* Copyright */}
            <p className="text-gray-400 text-sm">2025 - © South box</p>

            {/* Footer Links */}
            <div className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-8">
              {footerLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-300 hover:text-white text-sm transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
