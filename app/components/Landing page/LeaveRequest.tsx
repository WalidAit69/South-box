"use client";

import React, { useState } from "react";

interface LeaveRequestProps {
  scrollProgress?: number;
}

function LeaveRequest({ scrollProgress = 0 }: LeaveRequestProps) {
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

  // Calculate scale based on scroll progress
  const scale =
    scrollProgress < 0.5
      ? 0.9 + scrollProgress * 0.2
      : 1 + (scrollProgress - 0.5) * 0.1;

  // Calculate opacity - fades in during first half
  const opacity = Math.min(1, scrollProgress * 2);

  // Calculate text slide-in animation
  const textTranslateY = (1 - Math.min(1, scrollProgress * 2)) * 30;
  const textOpacity = Math.min(1, scrollProgress * 2.5);

  // Calculate button animation (appears slightly later)
  const buttonProgress = Math.max(0, (scrollProgress - 0.3) * 2);
  const buttonScale = 0.8 + buttonProgress * 0.2;
  const buttonOpacity = Math.min(1, buttonProgress);

  return (
    <div
      className="max-w-[90%] mx-auto h-screen flex flex-col items-center justify-center pb-20 relative"
      style={{
        transform: `scale(${scale})`,
        opacity: opacity,
        transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
      }}
      itemScope
      itemType="https://schema.org/ContactPage"
      aria-label="Project Request Form"
    >
      {/* Hidden SEO content */}
      <div className="sr-only">
        <h2 itemProp="name">Start Your Project with South Box</h2>
        <p itemProp="description">
          Leave a project request to work with South Box Digital Agency. Share
          your brief, goals, and requirements. We specialize in web development,
          mobile apps, branding, and digital marketing. Get a free consultation
          and quote for your next digital project.
        </p>
        <div
          itemProp="provider"
          itemScope
          itemType="https://schema.org/Organization"
        >
          <meta itemProp="name" content="South Box" />
          <meta itemProp="email" content="hello@southbox.com" />
        </div>
      </div>

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
          style={{
            transform: `translateY(${textTranslateY}px)`,
            opacity: textOpacity,
            transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
          }}
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
              aria-hidden="true"
            ></div>
            <span className="text-sm sm:text-base">Leave a request</span>
          </div>
          <h2
            className="text-lg sm:text-xl md:text-2xl lg:text-[2rem] 
            font-light leading-relaxed will-change-transform"
            aria-hidden="true"
          >
            We&apos;d love to be challenged by you! Feel free to share your
            brief with us.
          </h2>
        </div>

        <div
          className="flex-shrink-0"
          style={{
            transform: `scale(${buttonScale})`,
            opacity: buttonOpacity,
            transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
          }}
          itemProp="potentialAction"
          itemScope
          itemType="https://schema.org/CommunicateAction"
        >
          <meta itemProp="name" content="Start Your Project" />
          <div onClick={() => setShowForm(true)}>
            <button
              className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors"
              aria-label="Open project request form"
            >
              Let&apos;s start your project
            </button>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div
        className={`absolute sm:inset-0 flex items-center justify-center
        transition-all duration-700 ease-out
        ${
          showForm
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        role="dialog"
        aria-modal={showForm}
        aria-labelledby="form-title"
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
                <div
                  className="border-2 border-white/80 w-2 h-2 rounded-xs rotate-45"
                  aria-hidden="true"
                ></div>
                <span className="text-sm sm:text-base">Start Your Project</span>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Close form"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
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
            <h2
              id="form-title"
              className="text-2xl sm:text-3xl md:text-4xl font-light"
            >
              Tell us about your project
            </h2>
          </div>

          {/* Form Fields */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            itemScope
            itemType="https://schema.org/ContactForm"
            className="space-y-6"
          >
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-white/80"
              >
                Email Address <span aria-label="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                autoComplete="email"
                aria-required="true"
                itemProp="email"
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
                Project Description <span aria-label="required">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                placeholder="Tell us about your project, goals, and any specific requirements..."
                required
                aria-required="true"
                itemProp="text"
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
                type="submit"
                className="flex-1 px-6 py-3 
                  bg-white text-black 
                  rounded-full font-medium
                  hover:bg-white/90
                  transition-all duration-300
                  transform hover:scale-[1.02]"
                aria-label="Submit project request"
              >
                Submit Request
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-3 
                  bg-white/10 text-white 
                  rounded-full font-medium
                  hover:bg-white/20
                  transition-all duration-300"
                aria-label="Cancel and close form"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LeaveRequest;
