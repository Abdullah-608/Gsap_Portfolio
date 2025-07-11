import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaGithub, FaDownload } from "react-icons/fa";

const FloatingSkills = () => {
  const container = useRef(null);
  
  const frontendSkills = ["React", "Next.js", "Vue", "TypeScript", "HTML/CSS", "Tailwind"];
  const backendSkills = ["Node.js", "Express", "Python", "Django", "MongoDB", "PostgreSQL"];
  const otherSkills = ["Docker", "AWS", "CI/CD", "Git", "Jest", "Webpack"];
  
  useGSAP(() => {
    // Animate left to right
    gsap.fromTo(
      ".skill-left-to-right",
      { x: -2000 },
      { 
        x: "100vw", 
        duration: 25, 
        ease: "linear",
        stagger: 0.5,
        repeat: -1
      }
    );
    
    // Animate right to left
    gsap.fromTo(
      ".skill-right-to-left",
      { x: "100vw" },
      { 
        x: -2000, 
        duration: 20, 
        ease: "linear",
        stagger: 0.5,
        repeat: -1
      }
    );
    
    // Animate left to right (third row)
    gsap.fromTo(
      ".skill-left-to-right-2",
      { x: -2000 },
      { 
        x: "100vw", 
        duration: 30, 
        ease: "linear",
        stagger: 0.3,
        repeat: -1
      }
    );
  }, { scope: container });

  return (
    <div ref={container} className="my-12 py-12 overflow-hidden text-white/90">
      <div className="mb-8">
        {frontendSkills.map((skill, index) => (
          <span 
            key={index} 
            className="skill-left-to-right inline-block mx-6 text-3xl md:text-4xl font-bold"
          >
            {skill}
          </span>
        ))}
      </div>
      
      <div className="my-8">
        {backendSkills.map((skill, index) => (
          <span 
            key={index} 
            className="skill-right-to-left inline-block mx-6 text-3xl md:text-4xl font-bold"
          >
            {skill}
          </span>
        ))}
      </div>
      
      <div className="mt-8">
        {otherSkills.map((skill, index) => (
          <span 
            key={index} 
            className="skill-left-to-right-2 inline-block mx-6 text-3xl md:text-4xl font-bold"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

const About = () => {
  const text = `Passionate about clean architecture
    I build scalable, high-performance solutions
    from prototype to production`;
  
  const aboutMeText = `My journey into software development began with a curiosity that turned into passion. What started as simple HTML pages evolved into complex applications as I discovered the power of creating digital experiences that solve real problems.

Every project is an opportunity to push boundaries—whether it's optimizing performance, implementing elegant solutions, or creating intuitive interfaces that users love.`;
  
  const imgRef = useRef(null);
  const sectionRefs = useRef([]);
  
  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
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
  });
  
  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Code with purpose, Built to scale"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      
      {/* About Me Section */}
      <div className="px-8 md:px-16 py-12">
        <h2 
          ref={el => sectionRefs.current[0] = el}
          className="text-4xl md:text-5xl font-bold text-white mb-12 border-l-4 pl-4 border-white/60"
        >
          About Me
        </h2>
        
        <div className="flex flex-col items-center justify-between gap-16 text-xl font-light tracking-wide lg:flex-row md:text-2xl text-white/80">
          <img
            ref={imgRef}
            src="images/man.jpg"
            alt="profile"
            className="w-full max-w-md rounded-3xl shadow-2xl"
          />
          <AnimatedTextLines text={aboutMeText} className={"w-full"} />
        </div>
        
        <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
          <a 
            href="https://github.com/Abdullah-cr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full transition-all duration-300 border border-white/20"
          >
            <FaGithub size={20} /> GitHub Profile
          </a>
          <a 
            href="/resume.pdf" 
            download
            className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full transition-all duration-300 hover:bg-white/90"
          >
            <FaDownload size={20} /> Download Resume
          </a>
        </div>
      </div>
      
      {/* Skills Section */}
      <div className="px-8 md:px-16 py-12 bg-black/50 backdrop-blur-md">
        <h2 
          ref={el => sectionRefs.current[1] = el}
          className="text-4xl md:text-5xl font-bold text-white mb-8 border-l-4 pl-4 border-white/60"
        >
          Skills
        </h2>
        
        <FloatingSkills />
      </div>
      
      {/* Education Section */}
      <div className="px-8 md:px-16 py-12">
        <h2 
          ref={el => sectionRefs.current[2] = el}
          className="text-4xl md:text-5xl font-bold text-white mb-12 border-l-4 pl-4 border-white/60"
        >
          Education
        </h2>
        
        <div className="relative border-l-2 border-white/20 pl-8 pb-8">
          <div className="mb-12 relative">
            <div className="absolute -left-10 w-6 h-6 bg-white rounded-full"></div>
            <h3 className="text-2xl md:text-3xl font-semibold text-white">Computer Science, BSc</h3>
            <h4 className="text-xl md:text-2xl text-white/70 mt-1">University of Technology</h4>
            <p className="text-lg text-white/60 mt-2">2020 - 2024</p>
            <div className="mt-4 text-white/80">
              <p>Specialized in Software Engineering with focus on web application development and distributed systems. Graduated with honors.</p>
              <p className="mt-2">Key coursework included Advanced Algorithms, Database Systems, and Cloud Computing.</p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -left-10 w-6 h-6 bg-white/80 rounded-full"></div>
            <h3 className="text-2xl md:text-3xl font-semibold text-white">Full-Stack Web Development</h3>
            <h4 className="text-xl md:text-2xl text-white/70 mt-1">Tech Academy Bootcamp</h4>
            <p className="text-lg text-white/60 mt-2">2019</p>
            <div className="mt-4 text-white/80">
              <p>Intensive 12-week program focusing on modern web technologies. Built several real-world projects using React, Node.js, and MongoDB.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;