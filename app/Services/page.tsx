import React from "react";
import { Metadata } from "next";
import Services from "../pages/Services";

export const metadata: Metadata = {
  title: "South box Services | Digital Creative Agency",
  description: "Our Digital Creative Agency Services",
};

function page() {
  return <Services />;
}

export default page;
