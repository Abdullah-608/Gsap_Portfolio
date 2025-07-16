import { useRef, useState } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { servicesData } from "../constants";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Marquee from "../components/Marquee";

const Services = () => {
  const text = `I build secure, high-performance full-stack apps
    with smooth UX to drive growth 
    not headaches.`;
  const serviceRefs = useRef([]);
  const [hoverIndex, setHoverIndex] = useState(null);
  const isDesktop = useMediaQuery({ minWidth: "48rem" }); //768px
  const items = [
    "just imagin, I code",
    "just imagin, I code",
    "just imagin, I code",
    "just imagin, I code",
    "just imagin, I code",
  ];
  
  useGSAP(() => {
    serviceRefs.current.forEach((el) => {
      if (!el) return;

      gsap.from(el, {
        y: 200,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
        duration: 1,
        ease: "circ.out",
      });
    });
  }, []);
  
  return (
    <section id="services" className="min-h-screen bg-gradient-to-b from-black to-zinc-900 rounded-t-4xl relative">
      {/* Subtle background elements */}
       <Marquee items={items} className="text-white bg-gold" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-72 h-72 bg-purple-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-80 h-80 bg-indigo-900/10 rounded-full blur-[150px]"></div>
      </div>
      
      <AnimatedHeaderSection
        subTitle={"Behind the scene, Beyond the screen"}
        title={"Services"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={false}
      />
      
      <div className="relative z-10">
        {servicesData.map((service, index) => (
          <div
            ref={(el) => (serviceRefs.current[index] = el)}
            key={index}
            className="sticky px-8 sm:px-10 pt-8 pb-14 text-white bg-black/90 border-t border-white/30 transition-colors duration-300"
            style={
              isDesktop
                ? {
                    top: `calc(10vh + ${index * 5}em)`,
                    marginBottom: `${(servicesData.length - index - 1) * 5}rem`,
                    backgroundImage: hoverIndex === index ? 
                      "radial-gradient(circle at center, rgba(30,30,30,0.9) 0%, rgba(0,0,0,0.95) 100%)" : 
                      "none",
                    boxShadow: hoverIndex === index ? "0 20px 40px -20px rgba(0,0,0,0.7)" : "none"
                  }
                : { top: 0 }
            }
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 font-light">
                <div className="flex flex-col gap-6 md:w-1/2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium tracking-widest text-white/50 uppercase">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="inline-block w-12 h-[1px] bg-white/40"></span>
                  </div>
                  
                  <h2 className="text-4xl lg:text-5xl font-light tracking-tight">
                    {service.title}
                  </h2>
                  
                  <p className="text-xl leading-relaxed tracking-wide lg:text-2xl text-white/60 text-pretty">
                    {service.description}
                  </p>
                </div>
                
                <div className="flex flex-col gap-4 mt-4 md:mt-12 md:w-1/2">
                  {service.items.map((item, itemIndex) => (
                    <div 
                      key={`item-${index}-${itemIndex}`}
                      className="group"
                    >
                      <h3 className="flex items-baseline">
                        <span className="w-10 mr-6 text-base font-light text-white/40 opacity-70 group-hover:opacity-100 transition-opacity">
                          {String(itemIndex + 1).padStart(2, '0')}
                        </span>
                        <span className="text-2xl sm:text-3xl text-white/90 group-hover:text-white transition-colors">
                          {item.title}
                        </span>
                      </h3>
                      {itemIndex < service.items.length - 1 && (
                        <div className="w-full h-px my-4 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Service card highlight border */}
            <div className={`absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-opacity duration-500 ${hoverIndex === index ? 'opacity-100' : 'opacity-0'}`}></div>
          </div>
        ))}
      </div>
      
      {/* Bottom decoration */}
      <div className="h-20 bg-gradient-to-b from-transparent to-black/50"></div>
       <Marquee items={items} className="text-white bg-gold" />
    </section>
  );
};

export default Services;