import React from "react";

function TrustusPage() {
  const companies = [
    { name: "Company 1", bgColor: "bg-white" },
    { name: "Company 2", bgColor: "bg-white" },
    { name: "Company 3", bgColor: "bg-white" },
    { name: "Company 4", bgColor: "bg-white" },
    { name: "Company 5", bgColor: "bg-white" },
    { name: "Company 6", bgColor: "bg-white" },
    { name: "Company 7", bgColor: "bg-white" },
    { name: "Company 8", bgColor: "bg-white" },
    { name: "Company 9", bgColor: "bg-white" },
    { name: "Company 10", bgColor: "bg-white" },
    { name: "Company 11", bgColor: "bg-white" },
    { name: "Company 12", bgColor: "bg-white" },
  ];

  return (
    <section className="h-screen flex flex-col items-center justify-center gap-20 pb-20">
      {/* Header */}
      <div className="text-center animate-fadeIn">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl 
          font-semibold
          leading-tight"
        >
          They trust us
        </h2>
      </div>

      {/* Companies Grid */}
      <div
        className="max-w-7xl w-full 
        grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 
        gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10
        place-items-center"
      >
        {companies.map((company, index) => (
          <div
            key={index}
            className="w-16 h-16 
              sm:w-20 sm:h-20 
              md:w-24 md:h-24 
              lg:w-24 lg:h-24
              group relative rounded-xl sm:rounded-2xl 
              shadow-lg hover:shadow-2xl 
              transition-all duration-300 hover:-translate-y-2"
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
            }}
          >
            {/* Placeholder for company logo */}
            <div
              className={`${company.bgColor} w-full h-full rounded-xl 
                flex items-center justify-center 
                transition-transform duration-300 group-hover:scale-105`}
            >
              <span
                className="text-black 
                text-xl sm:text-2xl md:text-3xl 
                font-bold"
              >
                {company.name.charAt(0)}
              </span>
            </div>

            {/* Hover effect overlay */}
            <div
              className="absolute inset-0 
              bg-gradient-to-br from-amber-400/0 to-orange-400/0 
              group-hover:from-amber-400/10 group-hover:to-orange-400/10 
              transition-all duration-300 rounded-xl sm:rounded-2xl"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrustusPage;
