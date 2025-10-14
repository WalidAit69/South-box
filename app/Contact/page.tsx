import React from "react";
import { Metadata } from "next";
import Contact from "../pages/Contact";

export const metadata: Metadata = {
  title: "Contact Us | South Box Digital Creative Agency",
  description:
    "Get in touch with South Box. Contact us for web development, design, and digital solutions. Located in Agadir, Morocco. Email: hello@southbox.com | Phone: +212 6000000",
  keywords: [
    "contact South Box",
    "digital agency contact",
    "web development inquiry",
    "get a quote",
    "hire web developers",
    "design agency Morocco",
    "Agadir digital agency",
    "contact creative agency",
    "project inquiry",
    "free consultation",
  ],
};

function page() {
  return <Contact />;
}

export default page;
