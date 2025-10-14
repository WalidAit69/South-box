import React from "react";
import { Metadata } from "next";
import Services from "../pages/Services";

export const metadata: Metadata = {
  title: "Our Services | South Box Digital Creative Agency",
  description:
    "Comprehensive digital solutions including Brand Identity, Web Development, Mobile Apps, Motion Design, Digital Marketing, and UI/UX Design. Transform your vision into reality with South Box.",
  keywords: [
    "digital agency services",
    "brand identity design",
    "web development services",
    "mobile app development",
    "motion design",
    "UI/UX design",
    "digital marketing",
    "SEO services",
    "e-commerce development",
    "custom websites",
    "app design",
    "South Box services",
  ],
};

function page() {
  return <Services />;
}

export default page;
