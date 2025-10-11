"use client";

import React, { useState } from "react";
import CtaButton from "./CtaButton";

function LeaveRequest() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    description: "",
  });

  const handleSubmit = () => {
    if (!formData.email || !formData.description) {
      alert("Please fill in all fields");
      return;
    }
    console.log("Form submitted:", formData);
    alert("Thank you! We'll get back to you soon.");
    setShowForm(false);
    setFormData({ email: "", description: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="max-w-[90%] mx-auto h-screen flex flex-col items-center justify-center pb-20 relative">
      {/* Initial Content */}
      <div
        className={`w-full 
        px-0 sm:px-4 md:px-6 lg:px-10 
        flex flex-col lg:flex-row 
        items-center lg:items-center 
        justify-between 
        gap-8 lg:gap-12
        transition-all duration-700 ease-out
        ${
          showForm
            ? "opacity-0 scale-95 pointer-events-none"
            : "opacity-100 scale-100"
        }`}
      >
        <div
          className="max-w-3xl overflow-hidden 
          text-center lg:text-left 
          w-full lg:w-auto"
        >
          <div
            className="group flex items-center gap-2 
            justify-center lg:justify-start 
            mb-3 sm:mb-4"
          >
            <div
              className="border-2 border-white/80 w-2 h-2 rounded-xs
                transition-all duration-300 ease-in-out rotate-45
                group-hover:rotate-[135deg]"
            ></div>
            <span className="text-sm sm:text-base">Leave a request</span>
          </div>
          <p
            className="text-lg sm:text-xl md:text-2xl lg:text-[2rem] 
            font-light leading-relaxed will-change-transform"
          >
            We&apos;d love to be challenged by you! Feel free to share your brief
            with us.
          </p>
        </div>

        <div className="flex-shrink-0">
          <div onClick={() => setShowForm(true)}>
            <CtaButton text="Let's start your project" />
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div
        className={`absolute inset-0 flex items-center justify-center
        transition-all duration-700 ease-out
        ${
          showForm
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div
          className="w-full max-w-2xl 
          px-4 sm:px-6 md:px-8 
          py-8 sm:py-10 md:py-12
          bg-white/5 backdrop-blur-md 
          rounded-2xl border border-white/10
          shadow-2xl"
        >
          {/* Form Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="border-2 border-white/80 w-2 h-2 rounded-xs rotate-45"></div>
                <span className="text-sm sm:text-base">Start Your Project</span>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light">
              Tell us about your project
            </h2>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-white/80"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3 
                  bg-white/5 border border-white/20 
                  rounded-lg 
                  text-white placeholder:text-white/40
                  focus:outline-none focus:border-white/40 focus:bg-white/10
                  transition-all duration-300"
              />
            </div>

            {/* Description Textarea */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-2 text-white/80"
              >
                Project Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                placeholder="Tell us about your project, goals, and any specific requirements..."
                className="w-full px-4 py-3 
                  bg-white/5 border border-white/20 
                  rounded-lg 
                  text-white placeholder:text-white/40
                  focus:outline-none focus:border-white/40 focus:bg-white/10
                  transition-all duration-300
                  resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 
                  bg-white text-black 
                  rounded-full font-medium
                  hover:bg-white/90
                  transition-all duration-300
                  transform hover:scale-[1.02]"
              >
                Submit Request
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-3 
                  bg-white/10 text-white 
                  rounded-full font-medium
                  hover:bg-white/20
                  transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LeaveRequest;