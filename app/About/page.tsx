import React from "react";
import { Metadata } from "next";
import About from "../pages/About";

export const metadata: Metadata = {
  title: "South box About | Digital Creative Agency",
  description: "About Our Digital Creative Agency",
};

function page() {
  return <About />;
}

export default page;
