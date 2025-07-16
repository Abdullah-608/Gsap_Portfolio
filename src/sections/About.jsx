import { useRef, useState, useEffect } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FaGithub, FaDownload, FaLinkedin, FaCode, FaLaptopCode, FaServer, FaDatabase, FaStar, FaGraduationCap, FaBriefcase } from "react-icons/fa";
import { 
  SiTypescript, 
  SiReact, 
  SiNextdotjs, 
  SiVuedotjs, 
  SiNodedotjs, 
  SiPython, 
  SiMongodb, 
  SiPostgresql, 
  SiDocker, 
  SiAmazonwebservices, 
  SiGit,
  SiTailwindcss,
  SiGraphql,
  SiRedux
} from "react-icons/si";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

// Custom ColorfulHeading component with animated gradient border
const ColorfulHeading = ({ children, className = "" }) => {
  return (
    <h2 className={`text-4xl md:text-5xl font-bold text-white mb-12 pl-6 border-l-4 relative overflow-hidden ${className} gradient-border`}>
      {children}
      <div className="absolute left-0 top-0 w-1 h-full gradient-animation"></div>
    </h2>
  );
};

// Map of skill names to their corresponding colors
const skillColorMap = {
  // Frontend
  "React": "bg-blue-600/20 text-blue-400 border-blue-500/30",
  "Next.js": "bg-gray-800/40 text-gray-300 border-gray-600/50",
  "Vue": "bg-green-600/20 text-green-400 border-green-500/30",
  "TypeScript": "bg-blue-700/20 text-blue-400 border-blue-500/30",
  "HTML/CSS": "bg-orange-600/20 text-orange-400 border-orange-500/30",
  "Tailwind CSS": "bg-cyan-600/20 text-cyan-400 border-cyan-500/30",
  "Redux": "bg-purple-600/20 text-purple-400 border-purple-500/30",
  "GraphQL": "bg-pink-600/20 text-pink-400 border-pink-500/30",
  "Responsive Design": "bg-teal-600/20 text-teal-400 border-teal-500/30",
  
  // Backend
  "Node.js": "bg-green-600/20 text-green-400 border-green-500/30",
  "Express": "bg-gray-600/20 text-gray-400 border-gray-500/30",
  "Python": "bg-yellow-600/20 text-yellow-400 border-yellow-500/30",
  "Django": "bg-green-700/20 text-green-400 border-green-600/30",
  "REST API": "bg-indigo-600/20 text-indigo-400 border-indigo-500/30",
  "Authentication": "bg-rose-600/20 text-rose-400 border-rose-500/30",
  "Authorization": "bg-amber-600/20 text-amber-400 border-amber-500/30",
  
  // Database
  "MongoDB": "bg-green-600/20 text-green-400 border-green-500/30",
  "PostgreSQL": "bg-blue-600/20 text-blue-400 border-blue-500/30",
  "MySQL": "bg-orange-600/20 text-orange-400 border-orange-500/30",
  "Redis": "bg-red-600/20 text-red-400 border-red-500/30",
  "Firebase": "bg-yellow-600/20 text-yellow-400 border-yellow-500/30",
  "Database Design": "bg-indigo-600/20 text-indigo-400 border-indigo-500/30",
  "ORM": "bg-violet-600/20 text-violet-400 border-violet-500/30",
  "SQL": "bg-sky-600/20 text-sky-400 border-sky-500/30",
  
  // DevOps & Cloud
  "Docker": "bg-blue-600/20 text-blue-400 border-blue-500/30",
  "AWS": "bg-orange-600/20 text-orange-400 border-orange-500/30",
  "CI/CD": "bg-green-600/20 text-green-400 border-green-500/30",
  "GitHub Actions": "bg-purple-600/20 text-purple-400 border-purple-500/30",
  "Kubernetes": "bg-blue-700/20 text-blue-400 border-blue-600/30",
  "Serverless": "bg-yellow-600/20 text-yellow-400 border-yellow-500/30",
  "Microservices": "bg-teal-600/20 text-teal-400 border-teal-500/30",
  
  // Tools & Workflow
  "Git": "bg-red-600/20 text-red-400 border-red-500/30",
  "GitHub": "bg-gray-600/20 text-gray-400 border-gray-500/30",
  "Jest": "bg-red-700/20 text-red-400 border-red-600/30",
  "Testing": "bg-green-600/20 text-green-400 border-green-500/30",
  "Webpack": "bg-blue-600/20 text-blue-400 border-blue-500/30",
  "Vite": "bg-purple-600/20 text-purple-400 border-purple-500/30",
  "Agile": "bg-cyan-600/20 text-cyan-400 border-cyan-500/30",
  "Scrum": "bg-teal-600/20 text-teal-400 border-teal-500/30",
  
  // Other Skills
  "UI/UX Design": "bg-pink-600/20 text-pink-400 border-pink-500/30",
  "Performance Optimization": "bg-amber-600/20 text-amber-400 border-amber-500/30",
  "Web Accessibility": "bg-green-600/20 text-green-400 border-green-500/30",
  "SEO": "bg-orange-600/20 text-orange-400 border-orange-500/30",
  "Technical Writing": "bg-blue-600/20 text-blue-400 border-blue-500/30",
  "Problem Solving": "bg-violet-600/20 text-violet-400 border-violet-500/30",
};

const SkillCategory = ({ title, icon, skills, color, shadowColor }) => {
  return (
    <div className={`bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:scale-105 border border-white/10 hover:border-white/20 hover:shadow-lg ${shadowColor}`}>
      <div className={`w-14 h-14 mb-4 rounded-xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span 
            key={index} 
            className={`px-3 py-1 text-sm rounded-full cursor-pointer transition-all hover:-translate-y-1 duration-200 border ${skillColorMap[skill] || "bg-white/10 text-white border-white/20"}`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

const TimelineItem = ({ year, title, subtitle, description, isLast = false, icon, color }) => {
  return (
    <div className="mb-16 relative">
      <div className={`absolute -left-10 w-8 h-8 ${color} rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center`}>
        {icon}
      </div>
      {!isLast && <div className="absolute -left-7 top-8 h-full w-2 bg-gradient-to-b from-blue-500/50 to-purple-500/30"></div>}
      <h3 className="text-2xl md:text-3xl font-semibold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">{title}</h3>
      <h4 className="text-xl md:text-2xl text-white/70 mt-1">{subtitle}</h4>
      <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 mt-2 backdrop-blur-sm border border-blue-500/30">
        <p className="text-lg text-blue-300">{year}</p>
      </div>
      <div className="mt-4 text-white/80 bg-gradient-to-br from-black/60 to-black/40 p-6 rounded-lg backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
        <p>{description}</p>
      </div>
    </div>
  );
};

// Tab button component
const TabButton = ({ active, onClick, children }) => (
  <button 
    onClick={onClick}
    className={`py-3 px-6 font-medium text-lg transition-all relative ${
      active 
        ? "text-white" 
        : "text-white/50 hover:text-white/80"
    }`}
  >
    {children}
    {active && (
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
    )}
  </button>
);

const About = () => {
  const [activeTab, setActiveTab] = useState("skills");
  const [currentTime, setCurrentTime] = useState("");
  
  useEffect(() => {
    // Add last updated timestamp
    setCurrentTime("2025-07-12");
  }, []);
  
  const text = `Crafting digital experiences with purpose
    Building the architecture of tomorrow
    Where code meets creativity`;
  
  const aboutMeText = `As a Full Stack Developer with over 5 years of experience, I blend technical expertise with creative problem-solving to build solutions that make a difference.

My journey began with a fascination for how code can transform ideas into reality. Today, I specialize in creating performant, scalable applications that deliver exceptional user experiences while maintaining clean, maintainable codebases.

What drives me is the continuous evolution of technology and the endless opportunities to learn and grow. I believe in writing code that tells a story – one that's not just functional but also elegant and purposeful.`;
  
  const imgRef = useRef(null);
  const sectionRefs = useRef([]);
  
  useGSAP(() => {
    // Parallax effect for the background
    gsap.to(".parallax-bg", {
      backgroundPositionY: "30%",
      scrollTrigger: {
        trigger: "#about",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to("#about", {
      scale: 0.98,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
      },
      ease: "power1.inOut",
    });

    // Image reveal animation
    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: { 
        trigger: imgRef.current,
        start: "top 80%",
      },
    });
    
    // Floating stars animation
    gsap.to(".floating-star", {
      y: -15,
      rotation: 5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2
    });
    
    // Animate section titles
    sectionRefs.current.forEach((section) => {
      gsap.fromTo(
        section,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          }
        }
      );
    });

    // Animate tab transitions
    gsap.fromTo(
      ".tab-content",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );

    // Skill categories staggered animation
    gsap.fromTo(
      ".skill-category",
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 80%",
        }
      }
    );
  });

  // Add animated dots background
  const renderAnimatedBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 30 }).map((_, i) => (
            <div 
              key={i}
              className={`absolute rounded-full ${
                i % 3 === 0 ? "bg-blue-500" : i % 3 === 1 ? "bg-purple-500" : "bg-cyan-400"
              }`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 8 + 2}px`,
                height: `${Math.random() * 8 + 2}px`,
                opacity: Math.random() * 0.5 + 0.3,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl relative overflow-hidden">
      <div className="parallax-bg absolute inset-0 bg-gradient-to-b from-blue-900/20 via-indigo-900/15 to-black opacity-50"></div>
      {renderAnimatedBackground()}
      
      <div className="relative z-10">
        <AnimatedHeaderSection
          subTitle={"Code with purpose, Built for impact"}
          title={"About Me"}
          text={text}
          textColor={"text-white"}
          withScrollTrigger={true}
        />
        
        {/* About Me Section */}
        <div className="px-8 md:px-16 py-12">
          <ColorfulHeading>
            My Story
          </ColorfulHeading>
          
          <div className="flex flex-col items-center justify-between gap-16 text-xl font-light tracking-wide lg:flex-row md:text-2xl text-white/80">
            <div className="w-full max-w-md relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 blur-xl opacity-30 rounded-3xl transform -rotate-3"></div>
              
              {/* Floating stars around image */}
              <div className="floating-star absolute -top-4 -left-4 text-yellow-400 opacity-70">
                <FaStar size={18} />
              </div>
              <div className="floating-star absolute top-1/4 -right-4 text-blue-400 opacity-70" style={{ animationDelay: "0.5s" }}>
                <FaStar size={14} />
              </div>
              <div className="floating-star absolute -bottom-2 left-1/4 text-purple-400 opacity-70" style={{ animationDelay: "1s" }}>
                <FaStar size={16} />
              </div>
              
              <img
                ref={imgRef}
                src="images/man.png"
                alt="profile"
                className="w-full relative z-10 max-w-md rounded-3xl shadow-2xl border border-white/10"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-xl opacity-50"></div>
            </div>
            <div className="w-full">
              <AnimatedTextLines text={aboutMeText} className={"w-full"} />
              
              <div className="mt-12 flex flex-wrap gap-4 justify-center md:justify-start">
                <a 
                  href="https://github.com/Abdullah-cr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-4 rounded-full transition-all duration-300 border border-white/10 hover:border-white/30 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/10"
                >
                  <FaGithub size={20} className="text-white" /> GitHub Profile
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/30"
                >
                  <FaLinkedin size={20} /> LinkedIn
                </a>
                <a 
                  href="/resume.pdf" 
                  download
                  className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white px-6 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-1"
                >
                  <FaDownload size={20} /> Download Resume
                </a>
              </div>
              
              <div className="mt-8 text-xs text-white/40 text-right">
                Last updated: {currentTime}
              </div>
            </div>
          </div>
        </div>
        
        {/* Expertise Tabs Section */}
        <div className="px-8 md:px-16 py-20 bg-gradient-to-b from-black via-black/95 to-black/90">
          <ColorfulHeading>
            My Expertise
          </ColorfulHeading>
          
          <div className="flex border-b border-white/10 mb-12 justify-center md:justify-start">
            <TabButton 
              active={activeTab === "skills"}
              onClick={() => setActiveTab("skills")}
            >
              <div className="flex items-center gap-2">
                <FaCode size={16} className={activeTab === "skills" ? "text-blue-400" : "text-white/50"} />
                Skills
              </div>
            </TabButton>
            <TabButton 
              active={activeTab === "experience"}
              onClick={() => setActiveTab("experience")}
            >
              <div className="flex items-center gap-2">
                <FaBriefcase size={16} className={activeTab === "experience" ? "text-blue-400" : "text-white/50"} />
                Experience
              </div>
            </TabButton>
            <TabButton 
              active={activeTab === "education"}
              onClick={() => setActiveTab("education")}
            >
              <div className="flex items-center gap-2">
                <FaGraduationCap size={16} className={activeTab === "education" ? "text-blue-400" : "text-white/50"} />
                Education
              </div>
            </TabButton>
          </div>
          
          <div className="tab-content">
            {activeTab === "skills" && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 skills-grid">
                  <div className="skill-category">
                    <SkillCategory 
                      title="Frontend Development" 
                      icon={<FaLaptopCode size={28} color="white" />} 
                      skills={["React", "Next.js", "Vue", "TypeScript", "HTML/CSS", "Tailwind CSS", "Redux", "GraphQL", "Responsive Design"]}
                      color="bg-gradient-to-r from-blue-600 to-blue-500"
                      shadowColor="hover:shadow-blue-500/20"
                    />
                  </div>
                  <div className="skill-category">
                    <SkillCategory 
                      title="Backend Development" 
                      icon={<FaServer size={28} color="white" />} 
                      skills={["Node.js", "Express", "Python", "Django", "REST API", "GraphQL", "Authentication", "Authorization"]}
                      color="bg-gradient-to-r from-emerald-600 to-green-500"
                      shadowColor="hover:shadow-green-500/20"
                    />
                  </div>
                  <div className="skill-category">
                    <SkillCategory 
                      title="Database" 
                      icon={<FaDatabase size={28} color="white" />} 
                      skills={["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", "Database Design", "ORM", "SQL"]}
                      color="bg-gradient-to-r from-orange-600 to-amber-500"
                      shadowColor="hover:shadow-orange-500/20"
                    />
                  </div>
                  <div className="skill-category">
                    <SkillCategory 
                      title="DevOps & Cloud" 
                      icon={<SiAmazonwebservices size={28} color="white" />} 
                      skills={["Docker", "AWS", "CI/CD", "GitHub Actions", "Kubernetes", "Serverless", "Microservices"]}
                      color="bg-gradient-to-r from-violet-600 to-purple-500"
                      shadowColor="hover:shadow-purple-500/20"
                    />
                  </div>
                  <div className="skill-category">
                    <SkillCategory 
                      title="Tools & Workflow" 
                      icon={<SiGit size={28} color="white" />} 
                      skills={["Git", "GitHub", "Jest", "Testing", "Webpack", "Vite", "Agile", "Scrum"]}
                      color="bg-gradient-to-r from-rose-600 to-red-500"
                      shadowColor="hover:shadow-red-500/20"
                    />
                  </div>
                  <div className="skill-category">
                    <SkillCategory 
                      title="Other Skills" 
                      icon={<FaCode size={28} color="white" />} 
                      skills={["UI/UX Design", "Performance Optimization", "Web Accessibility", "SEO", "Technical Writing", "Problem Solving"]}
                      color="bg-gradient-to-r from-cyan-600 to-teal-500"
                      shadowColor="hover:shadow-cyan-500/20"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "experience" && (
              <div className="bg-black/30 rounded-xl p-8 backdrop-blur-sm border border-white/10">
                <div className="relative border-l-2 border-gradient pl-8 pb-8">
                  <TimelineItem
                    year="2023 - Present"
                    title="Senior Full Stack Developer"
                    subtitle="Tech Innovations Inc."
                    description="Leading development of cloud-based SaaS platform. Architected microservices using Next.js, Node.js, and AWS. Implemented CI/CD pipelines and mentored junior developers. Reduced API response times by 40% through optimization."
                    icon={<FaBriefcase size={16} />}
                    color="bg-gradient-to-r from-blue-500 to-indigo-600"
                  />
                  
                  <TimelineItem
                    year="2021 - 2023"
                    title="Full Stack Developer"
                    subtitle="Digital Solutions Co."
                    description="Built and maintained multiple client projects using React, TypeScript, and Node.js. Integrated payment gateways and third-party APIs. Collaborated with design team to implement responsive, accessible interfaces."
                    icon={<FaBriefcase size={16} />}
                    color="bg-gradient-to-r from-blue-500 to-indigo-600"
                  />
                  
                  <TimelineItem
                    year="2019 - 2021"
                    title="Frontend Developer"
                    subtitle="WebCraft Agency"
                    description="Developed interactive web applications using React and Vue.js. Implemented component libraries and design systems. Optimized applications for performance and cross-browser compatibility."
                    isLast={true}
                    icon={<FaBriefcase size={16} />}
                    color="bg-gradient-to-r from-blue-500 to-indigo-600"
                  />
                </div>
              </div>
            )}
            
            {activeTab === "education" && (
              <div className="bg-black/30 rounded-xl p-8 backdrop-blur-sm border border-white/10">
                <div className="relative border-l-2 border-gradient pl-8 pb-8">
                  <TimelineItem
                    year="2020 - 2024"
                    title="Computer Science, BSc"
                    subtitle="University of Technology"
                    description="Specialized in Software Engineering with focus on web application development, distributed systems, and cloud computing. Graduated with honors (3.8 GPA). Completed capstone project developing a scalable e-learning platform with real-time collaboration features."
                    icon={<FaGraduationCap size={16} />}
                    color="bg-gradient-to-r from-purple-500 to-violet-600"
                  />
                  
                  <TimelineItem
                    year="2019"
                    title="Full-Stack Web Development"
                    subtitle="Tech Academy Bootcamp"
                    description="Intensive 12-week program focusing on modern web technologies. Built several real-world projects using React, Node.js, and MongoDB. Won Best Project Award for a community marketplace application with geolocation features."
                    icon={<FaGraduationCap size={16} />}
                    color="bg-gradient-to-r from-purple-500 to-violet-600"
                  />
                  
                  <TimelineItem
                    year="2018"
                    title="UI/UX Design Fundamentals"
                    subtitle="Design Institute"
                    description="Studied user-centered design principles, wireframing, prototyping, and user testing methodologies. Created design systems and component libraries for web applications."
                    isLast={true}
                    icon={<FaGraduationCap size={16} />}
                    color="bg-gradient-to-r from-purple-500 to-violet-600"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(10px); }
          50% { transform: translateY(0px) translateX(20px); }
          75% { transform: translateY(10px) translateX(10px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        
        .border-gradient {
          border-image: linear-gradient(to bottom, #3b82f6, #8b5cf6, rgba(139, 92, 246, 0.3)) 1 100%;
        }
        
        .gradient-border {
          position: relative;
          border-left-width: 4px;
          border-image: linear-gradient(to bottom, #3b82f6, #8b5cf6, #d946ef) 1;
        }
        
        .gradient-animation {
          animation: gradientAnimation 3s ease infinite;
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6, #d946ef);
        }
        
        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};

export default About;