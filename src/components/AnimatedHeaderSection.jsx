import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const AnimatedHeaderSection = ({
  subTitle,
  title,
  text,
  textColor = "text-white",
  withScrollTrigger = false,
  accent = "bg-indigo-500",
  variant = "default", // default, minimal, elegant
}) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const dividerRef = useRef(null);
  const textContainerRef = useRef(null);
  const decorRef = useRef(null);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const textLines = text.split("\n").filter(line => line.trim() !== "");
  
  // Handle variant styling
  const getVariantStyles = () => {
    switch(variant) {
      case "minimal":
        return {
          container: "py-16",
          divider: "h-px opacity-30",
          title: "tracking-tight",
          subtitle: "tracking-widest opacity-80"
        };
      case "elegant":
        return {
          container: "py-20",
          divider: "h-[2px] bg-gradient-to-r",
          title: "tracking-normal font-light",
          subtitle: "tracking-[0.4em] font-light"
        };
      default:
        return {
          container: "py-16",
          divider: "h-[1px] opacity-50",
          title: "tracking-wide",
          subtitle: "tracking-[0.5em]"
        };
    }
  };
  
  const variantStyles = getVariantStyles();
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  useGSAP(() => {
    if (!isLoaded) return;
    
    // Main timeline
    const mainTl = gsap.timeline({
      scrollTrigger: withScrollTrigger ? {
        trigger: sectionRef.current,
        start: "top 70%",
      } : null
    });
    
    // Split text for title animation
    const titleSplit = new SplitText(titleRef.current, { type: "chars, words" });
    const subtitleSplit = new SplitText(subtitleRef.current, { type: "chars" });
    
    // Section entrance
    mainTl.fromTo(sectionRef.current, 
      { y: withScrollTrigger ? 0 : 100, opacity: withScrollTrigger ? 1 : 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
    
    // Subtitle animation
    mainTl.fromTo(subtitleSplit.chars, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.02, ease: "power2.out" },
      withScrollTrigger ? "-=0.5" : "+=0.1"
    );
    
    // Title animation
    mainTl.fromTo(titleSplit.chars, 
      { opacity: 0, y: 80, rotationX: -20 },
      { opacity: 1, y: 0, rotationX: 0, duration: 1, stagger: 0.03, ease: "power2.out" },
      "-=0.7"
    );
    
    // Divider animation
    mainTl.fromTo(dividerRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 1.2, ease: "power3.inOut" },
      "-=0.5"
    );
    
    // Text lines animation
    const textLines = gsap.utils.toArray(textContainerRef.current.children);
    mainTl.fromTo(textLines,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" },
      "-=0.8"
    );
    
    // Decorative elements
    if (decorRef.current) {
      mainTl.fromTo(decorRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
        "-=1"
      );
    }
    
    return () => {
      if (titleSplit) titleSplit.revert();
      if (subtitleSplit) subtitleSplit.revert();
    };
  }, [isLoaded, withScrollTrigger]);
  
  return (
    <section 
      ref={sectionRef} 
      className={`relative ${variantStyles.container} overflow-hidden`}
    >
      {/* Premium decorative elements */}
      <div ref={decorRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full ${accent} opacity-10 blur-[60px]`}></div>
        <div className={`absolute -bottom-20 -left-20 w-60 h-60 rounded-full ${accent} opacity-5 blur-[80px]`}></div>
        
        {variant === "elegant" && (
          <>
            <div className="absolute top-16 left-8 w-6 h-6 border-l border-t opacity-20"></div>
            <div className="absolute bottom-16 right-8 w-6 h-6 border-r border-b opacity-20"></div>
          </>
        )}
        
        {variant === "default" && (
          <div className="absolute top-1/3 right-12 grid grid-cols-3 gap-1.5 opacity-20">
            {[...Array(9)].map((_, i) => (
              <div key={i} className={`w-1 h-1 rounded-full ${textColor.replace('text', 'bg')}`}></div>
            ))}
          </div>
        )}
      </div>
      
      {/* Header Content */}
      <div className="px-6 md:px-10 lg:px-16 max-w-7xl mx-auto">
        {/* Subtitle */}
        <div className="mb-8">
          <div 
            ref={subtitleRef}
            className={`inline-block text-sm uppercase ${variantStyles.subtitle} ${textColor} relative`}
          >
            {subTitle}
            {variant === "elegant" && (
              <span className={`absolute -bottom-3 left-0 w-8 h-px ${accent} opacity-60`}></span>
            )}
          </div>
        </div>
        
        {/* Title */}
        <div className="mb-14 md:mb-20 overflow-hidden">
          <h1 
            ref={titleRef}
            className={`text-4xl sm:text-5xl lg:text-6xl uppercase font-medium ${variantStyles.title} ${textColor}`}
          >
            {title}
          </h1>
        </div>
        
        {/* Divider */}
        <div className="relative mb-14 md:mb-20">
          <div 
            ref={dividerRef} 
            className={`w-full ${variantStyles.divider} ${
              variant === "elegant" 
                ? `from-transparent via-${accent.replace('bg-', '')} to-transparent`
                : textColor.replace('text', 'bg')
            }`}
          ></div>
          
          {variant === "default" && (
            <div className={`absolute right-0 -top-1 w-2 h-2 ${accent} rounded-full opacity-80`}></div>
          )}
        </div>
        
        {/* Text Content */}
        <div className="flex justify-end">
          <div 
            ref={textContainerRef}
            className={`w-full md:w-3/4 lg:w-1/2 space-y-5 ${textColor} text-right`}
          >
            {textLines.map((line, index) => (
              <p 
                key={index} 
                className={`text-xl md:text-2xl font-light leading-relaxed opacity-90 transform`}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedHeaderSection;