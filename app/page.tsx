import React from "react";
import Home from "./pages/LandingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "South box | Digital Creative Agency",
  description: "Digital Creative Agency",
};

function page() {
  return <Home />;
}

export default page;
