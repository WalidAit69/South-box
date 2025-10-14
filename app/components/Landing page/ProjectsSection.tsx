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
      tags: ["React", "Node.js", "Payment Integration", "Responsive Design"],
    },
    {
      title: "Mobile Banking App",
      description: "Secure and intuitive financial management",
      category: "Mobile App",
      color: "bg-gray-900/50",
      text: "text-white",
      tags: ["iOS", "Android", "Security", "FinTech"],
    },
    {
      title: "AI Analytics Dashboard",
      description: "Real-time insights powered by machine learning",
      category: "Data Science",
      color: "bg-gray-900/50",
      text: "text-white",
      tags: ["Machine Learning", "Data Visualization", "AI", "Analytics"],
    },
    {
      title: "Social Media Platform",
      description: "Connecting communities through shared experiences",
      category: "Social Network",
      color: "bg-gray-900/50",
      text: "text-white",
      tags: ["Community", "Real-time", "Social Features", "Engagement"],
    },
    {
      title: "Healthcare Portal",
      description: "Patient-centered care management system",
      category: "Healthcare",
      color: "bg-white/50",
      text: "text-black",
      tags: [
        "HIPAA Compliant",
        "Patient Management",
        "Healthcare IT",
        "Telemedicine",
      ],
    },
    {
      title: "Smart Home IoT",
      description: "Control your entire home from one interface",
      category: "IoT",
      color: "bg-white/60",
      text: "text-black",
      tags: ["IoT", "Smart Home", "Automation", "Connected Devices"],
    },
    {
      title: "Video Streaming Service",
      description: "High-quality content delivery at scale",
      category: "Media",
      color: "bg-white/70",
      text: "text-black",
      tags: ["Video Streaming", "CDN", "Media", "Scalability"],
    },
    {
      title: "Educational Platform",
      description: "Interactive learning for the modern student",
      category: "EdTech",
      color: "bg-white/80",
      text: "text-black",
      tags: ["E-learning", "Education", "LMS", "Interactive"],
    },
  ];

  return (
    <div
      className="h-screen max-w-[90%] mx-auto"
      itemScope
      itemType="https://schema.org/CollectionPage"
      aria-label="Our Projects Portfolio"
    >
      {/* Hidden heading for SEO */}
      <h2 className="sr-only" itemProp="name">
        Our Projects - Portfolio Showcase
      </h2>

      {/* Hidden structured list for SEO */}
      <div className="sr-only">
        <p itemProp="description">
          Explore our portfolio of {projects.length} successful projects across
          web development, mobile apps, data science, and more. From e-commerce
          platforms to healthcare solutions, we deliver innovative digital
          experiences.
        </p>

        <ul
          itemProp="mainEntity"
          itemScope
          itemType="https://schema.org/ItemList"
        >
          <meta itemProp="numberOfItems" content={String(projects.length)} />
          {projects.map((project, index) => (
            <li
              key={index}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content={String(index + 1)} />
              <article
                itemProp="item"
                itemScope
                itemType="https://schema.org/CreativeWork"
              >
                <h3 itemProp="name">{project.title}</h3>
                <meta itemProp="description" content={project.description} />
                <meta itemProp="genre" content={project.category} />
                <div
                  itemProp="about"
                  itemScope
                  itemType="https://schema.org/Thing"
                >
                  <meta itemProp="name" content={project.category} />
                </div>
                {project.tags.map((tag, tagIndex) => (
                  <meta key={tagIndex} itemProp="keywords" content={tag} />
                ))}
                <div
                  itemProp="creator"
                  itemScope
                  itemType="https://schema.org/Organization"
                >
                  <meta itemProp="name" content="South Box" />
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="h-full w-full text-white relative overflow-hidden px-2 sm:px-4 md:px-6"
        aria-hidden="true"
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
                    aria-label={`View details for ${project.title}`}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </div>
  );
};

export default ProjectsSection;
