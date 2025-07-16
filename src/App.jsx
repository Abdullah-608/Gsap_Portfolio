import React, { useEffect, useState, lazy, Suspense } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ReactLenis from "lenis/react";
import { useProgress } from "@react-three/drei";

// Lazy load all components except Hero
const Services = lazy(() => import("./sections/Services"));
const About = lazy(() => import("./sections/About"));
const Works = lazy(() => import("./sections/Works"));
const Contact = lazy(() => import("./sections/Contact"));

const App = () => {
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => setIsReady(true), 800);
    }
  }, [progress]);

  // Loading spinner for lazy-loaded sections
  const sectionLoadingFallback = (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full"></div>
    </div>
  );

  return (
    <ReactLenis root className="relative w-screen min-h-screen overflow-x-auto">
      <style>
        {`
          .loader-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
          }
          
          .gold-text-wrapper {
            position: relative;
            overflow: hidden;
          }
          
          .gold-text {
            font-size: 2.5rem;
            font-weight: 800; /* Extra bold */
            letter-spacing: 0.2em;
            color: rgba(40, 40, 40, 0.7); /* Darker base color for more contrast */
            position: relative;
            text-transform: uppercase; /* Makes it look more premium */
          }
          
          .gold-text::before {
            content: "From Concept to Code";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            color: transparent;
            background: linear-gradient(90deg, 
              transparent 0%,
              #BF953F 10%, /* Royal gold */
              #FCF6BA 40%, /* Light gold */
              #FBF5B7 45%, /* Bright gold */
              #FFFFFF 50%, /* White highlight for extreme contrast */
              #FBF5B7 55%, /* Bright gold */
              #FCF6BA 60%, /* Light gold */
              #BF953F 90%, /* Royal gold */
              transparent 100%
            );
            -webkit-background-clip: text;
            background-clip: text;
            background-size: 200% 100%;
            animation: leftToRightScan 2.5s linear infinite;
            filter: drop-shadow(0 0 5px rgba(251, 245, 183, 0.5)); /* Gold glow */
            text-transform: uppercase;
          }
          
          @keyframes leftToRightScan {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }
        `}
      </style>

      {!isReady && (
        <div className="loader-container">
          <div className="gold-text-wrapper">
            <div className="gold-text">From Concept to Code</div>
          </div>
        </div>
      )}
      
      <div
        className={`${
          isReady ? "opacity-100" : "opacity-0"
        } transition-opacity duration-1000`}
      >
        <Navbar />
        <Hero />
        <Suspense fallback={sectionLoadingFallback}>
          <Services />
        </Suspense>
        <Suspense fallback={sectionLoadingFallback}>
          <About />
        </Suspense>
        <Suspense fallback={sectionLoadingFallback}>
          <Works />
        </Suspense>
        <Suspense fallback={sectionLoadingFallback}>
          <Contact />
        </Suspense>
      </div>
    </ReactLenis>
  );
};

export default App;