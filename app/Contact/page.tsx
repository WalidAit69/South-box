import React from "react";
import { Metadata } from "next";
import Contact from "../pages/Contact";

export const metadata: Metadata = {
  title: "South box Contact | Digital Creative Agency",
  description: "Contact Our Digital Creative Agency",
};

function page() {
  return <Contact />;
}

export default page;
