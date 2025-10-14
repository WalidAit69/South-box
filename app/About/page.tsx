import React from "react";
import { Metadata } from "next";
import About from "../pages/About";

export const metadata: Metadata = {
  title: "About Us | South Box Digital Creative Agency",
  description:
    "Meet the passionate team behind South Box. Founded in 2019, we craft digital experiences that inspire. 50+ projects completed, 30+ happy clients, and 100% satisfaction rate.",
  keywords: [
    "about South Box",
    "digital agency team",
    "creative agency story",
    "web development team",
    "design agency about",
    "Morocco digital agency",
    "Casablanca creative agency",
    "Simo Bouachra",
    "Walid Ait Harma",
    "agency values",
    "digital innovation",
  ],
};

function page() {
  return <About />;
}

export default page;
