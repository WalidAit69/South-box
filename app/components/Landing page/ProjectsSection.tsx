import ScrollStack, { ScrollStackItem } from "./ScrollStackItem";

interface ProjectsSectionProps {
  scrollProgress: number;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A modern shopping experience with seamless checkout",
      category: "Web Development",
      color: "bg-gray-900/50",
      text: "text-white",
    },
    {
      title: "Mobile Banking App",
      description: "Secure and intuitive financial management",
      category: "Mobile App",
      color: "bg-gray-900/50",
      text: "text-white",
    },
    {
      title: "AI Analytics Dashboard",
      description: "Real-time insights powered by machine learning",
      category: "Data Science",
      color: "bg-gray-900/50",
      text: "text-white",
    },
    {
      title: "Social Media Platform",
      description: "Connecting communities through shared experiences",
      category: "Social Network",
      color: "bg-gray-900/50",
      text: "text-white",
    },
    {
      title: "Healthcare Portal",
      description: "Patient-centered care management system",
      category: "Healthcare",
      color: "bg-white/50",
      text: "text-black",
    },
    {
      title: "Smart Home IoT",
      description: "Control your entire home from one interface",
      category: "IoT",
      color: "bg-white/60",
      text: "text-black",
    },
    {
      title: "Video Streaming Service",
      description: "High-quality content delivery at scale",
      category: "Media",
      color: "bg-white/70",
      text: "text-black",
    },
    {
      title: "Educational Platform",
      description: "Interactive learning for the modern student",
      category: "EdTech",
      color: "bg-white/80",
      text: "text-black",
    },
  ];

  return (
    <section className="h-screen max-w-[90%] mx-auto">
      <div
        className="h-full
      w-full text-white relative overflow-hidden
      px-2 sm:px-4 md:px-6"
      >
        <ScrollStack
          className="h-full scrollbar-hide"
          itemDistance={80}
          itemScale={0.02}
          itemStackDistance={25}
          stackPosition="30%"
          scaleEndPosition="15%"
          baseScale={0.7}
          rotationAmount={0}
          blurAmount={2}
        >
          {projects.map((project, index) => (
            <ScrollStackItem
              key={index}
              itemClassName={`${project.color} ${project.text}`}
            >
              <div
                className="flex flex-col justify-between h-full 
              p-4 sm:p-6 md:p-8 lg:p-10"
              >
                <div>
                  <span
                    className="text-[10px] sm:text-xs md:text-sm 
                  font-semibold opacity-80 uppercase tracking-wider"
                  >
                    {project.category}
                  </span>
                  <h3
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl 
                  font-bold 
                  mt-2 sm:mt-3 md:mt-4
                  leading-tight"
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-sm sm:text-base md:text-lg lg:text-xl 
                  mt-2 sm:mt-3 md:mt-4 
                  opacity-90
                  leading-relaxed
                  max-w-2xl"
                  >
                    {project.description}
                  </p>
                </div>
                <div
                  className="flex flex-col sm:flex-row 
                items-start sm:items-center 
                justify-between 
                gap-3 sm:gap-4 
                mt-6"
                >
                  <span className="text-xs sm:text-sm opacity-70">
                    Project {index + 1} of {projects.length}
                  </span>
                  <button
                    className="px-4 sm:px-5 md:px-6 
                  py-1.5 sm:py-2 
                  text-xs sm:text-sm md:text-base
                  bg-white/20 hover:bg-white/30 
                  rounded-full backdrop-blur-sm 
                  transition-all
                  whitespace-nowrap"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
};

export default ProjectsSection;
