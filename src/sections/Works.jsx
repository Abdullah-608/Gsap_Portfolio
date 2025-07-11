import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { projects } from "../constants";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Works = () => {
  const overlayRefs = useRef([]);
  const previewRef = useRef(null);
  const projectRefs = useRef([]);

  const [currentIndex, setCurrentIndex] = useState(null);
  const text = `Featured projects that have been meticulously
    crafted with passion to drive
    results and impact.`;

  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef(null);
  const moveY = useRef(null);

  useGSAP(() => {
    // Setup the animation for the preview image movement
    moveX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 1.5,
      ease: "power3.out",
    });
    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 2,
      ease: "power3.out",
    });

    // Animate project items on scroll
    gsap.from(".project-item", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "back.out",
      scrollTrigger: {
        trigger: "#projects-container",
        start: "top 80%",
      },
    });
  }, []);

  const handleMouseEnter = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(index);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 0.15,
        ease: "power2.out",
      }
    );

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(null);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.to(el, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.2,
      ease: "power2.in",
    });

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    mouse.current.x = e.clientX + 24;
    mouse.current.y = e.clientY + 24;
    moveX.current(mouse.current.x);
    moveY.current(mouse.current.y);
  };

  return (
    <section id="work" className="flex flex-col min-h-screen bg-white">
      <AnimatedHeaderSection
        subTitle={"Logic meets Aesthetics, Seamlessly"}
        title={"Works"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />
      
      <div 
        id="projects-container"
        className="relative flex flex-col font-light px-6 md:px-10 max-w-7xl mx-auto py-8"
        onMouseMove={handleMouseMove}
      >
        {/* Subtle decorative elements */}
        <div className="absolute top-10 right-10 w-5 h-5 border-t border-r border-gray-300 opacity-40"></div>
        <div className="absolute bottom-10 left-10 w-5 h-5 border-b border-l border-gray-300 opacity-40"></div>
        
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => projectRefs.current[index] = el}
            className="project-item relative flex flex-col gap-1 py-6 cursor-pointer group md:gap-0 border-b border-gray-100 last:border-b-0"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {/* Overlay */}
            <div
              ref={(el) => {
                overlayRefs.current[index] = el;
              }}
              className="absolute inset-0 hidden md:block duration-200 bg-gradient-to-r from-black to-gray-800 -z-10 clip-path"
            />

            {/* Project number */}
            <div className="absolute top-6 right-6 text-xl font-light text-gray-200 opacity-0 md:group-hover:opacity-40 transition-opacity">
              {(index + 1).toString().padStart(2, '0')}
            </div>

            {/* Title */}
            <div className="flex justify-between px-10 text-black transition-all duration-500 md:group-hover:px-12 md:group-hover:text-white">
              <h2 className="lg:text-[32px] text-[26px] leading-none">
                {project.name}
              </h2>
              <div className="flex items-center space-x-2">
                <span className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity text-sm">View</span>
                <Icon icon="lucide:arrow-up-right" className="md:size-6 size-5" />
              </div>
            </div>
            
            {/* Divider - enhanced with animation */}
            <div className="relative w-full h-0.5 my-2">
              <div className="absolute inset-0 bg-black/80 md:group-hover:bg-white/80 transition-colors duration-300"></div>
              {/* Animated highlight that moves on hover */}
              <div className="absolute inset-y-0 left-0 w-0 md:group-hover:w-full bg-blue-500 transition-all duration-700 ease-out"></div>
            </div>
            
            {/* Frameworks */}
            <div className="flex px-10 text-xs leading-loose uppercase transition-all duration-500 md:text-sm gap-x-5 md:group-hover:px-12">
              {project.frameworks.map((framework) => (
                <p
                  key={framework.id}
                  className="text-black transition-colors duration-500 md:group-hover:text-white flex items-center space-x-1"
                >
                  <span className="inline-block w-1 h-1 bg-current rounded-full"></span>
                  <span>{framework.name}</span>
                </p>
              ))}
            </div>
            
            {/* Mobile preview image */}
            <div className="relative flex items-center justify-center px-10 md:hidden h-[400px] mt-4">
              <img
                src={project.bgImage}
                alt={`${project.name}-bg-image`}
                className="object-cover w-full h-full rounded-md brightness-50"
              />
              <img
                src={project.image}
                alt={`${project.name}-image`}
                className="absolute bg-center px-14 rounded-xl"
              />
            </div>
          </div>
        ))}
        
        {/* Desktop Floating preview image */}
        <div
          ref={previewRef}
          className="fixed -top-2/6 left-0 z-50 overflow-hidden border-8 border-black pointer-events-none w-[960px] md:block hidden opacity-0 rounded-lg shadow-2xl"
        >
          {currentIndex !== null && (
            <>
              <img
                src={projects[currentIndex].image}
                alt="preview"
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="w-10 h-px bg-white mb-2"></div>
                <p className="text-white text-sm">{projects[currentIndex].name}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Works;