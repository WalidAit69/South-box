import React from "react";
import Home from "./pages/LandingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "South box | Digital Creative Agency",
  description:
    "The agency that covers your digital needs in a creative and efficient way. Expert web development, design, and digital solutions for modern businesses.",
  keywords: [
    "digital agency",
    "creative agency",
    "web development",
    "web design",
    "digital solutions",
    "branding",
    "UI/UX design",
    "South Box",
  ],
};

function page() {
  return <Home />;
}

export default page;
