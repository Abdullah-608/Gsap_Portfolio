import React, { useEffect, useState, lazy, Suspense } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero"; // Hero is still eagerly loaded
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
      setIsReady(true);
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
      {!isReady && (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 font-light">
          <p className="mb-4 text-xl tracking-widest animate-pulse">
            Loading {Math.floor(progress)}%
          </p>
          <div className="relative h-1 overflow-hidden rounded w-60 bg-white/20">
            <div
              className="absolute top-0 left-0 h-full transition-all duration-300 bg-white"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      <div
        className={`${
          isReady ? "opacity-100" : "opacity-0"
        } transition-opacity duration-1000`}
      >
        <Navbar />
        <Hero /> {/* Hero is not lazy loaded */}
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