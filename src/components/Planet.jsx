import React, { useRef, useState, useCallback } from "react";
import { useGLTF,  MeshDistortMaterial, Sparkles, Float, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Color, AdditiveBlending } from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function Planet(props) {
  const planetRef = useRef(null);
  const orbitingObjectsRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  // Load model
  const { nodes } = useGLTF("/models/Planet.glb");
  
  // Royal color palette
  const royalColors = {
    primary: new Color("#4B0082"),    // Deep indigo
    secondary: new Color("#9370DB"),  // Medium purple
    accent: new Color("#B8860B"),     // Dark goldenrod
    glow: new Color("#E6E6FA"),       // Lavender
    highlight: new Color("#FF1493")   // Deep pink for interactive highlights
  };
  
  // Simple GSAP animation
  useGSAP(() => {
    // Entrance animation
    gsap.from(planetRef.current.position, {
      y: -5,
      duration: 2.5,
      ease: "expo.out",
    });
    
    // Gentle pulsing glow
    gsap.to(planetRef.current.scale, {
      x: 1.05,
      y: 1.05,
      z: 1.05,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);
  
  // Interaction handlers
  const onHover = useCallback((isHovering) => {
    setHovered(isHovering);
    document.body.style.cursor = isHovering ? 'pointer' : 'auto';
  }, []);
  
  const onClick = useCallback(() => {
    setClicked(!clicked);
    
    // Spin the planet on click
    gsap.to(planetRef.current.rotation, {
      y: planetRef.current.rotation.y + Math.PI * 2,
      duration: 1.5,
      ease: "back.out(1.7)"
    });
  }, [clicked]);
  
  // Continuous animations
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Gentle planet rotation
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.002;
    }
    
    // Orbiting diamonds and spheres
    if (orbitingObjectsRef.current) {
      orbitingObjectsRef.current.rotation.y = t * 0.2;
      orbitingObjectsRef.current.rotation.z = t * 0.05;
    }
  });

  return (
    <group 
      ref={planetRef} 
      {...props} 
      onPointerOver={() => onHover(true)}
      onPointerOut={() => onHover(false)}
      onClick={onClick}
    >
      {/* Planet atmosphere glow */}
      <mesh scale={1.4}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial 
          color={hovered ? royalColors.highlight : royalColors.glow}
          transparent={true}
          opacity={0.15}
          blending={AdditiveBlending}
        />
      </mesh>
      
      {/* Main planet */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere.geometry}
        rotation={[0, 0, 0.741]}
      >
        <MeshDistortMaterial
          color={royalColors.primary}
          speed={hovered ? 1.5 : 0.5}
          distort={hovered ? 0.15 : 0.1}
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
      
      {/* Planet ring */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ring.geometry}
        rotation={[-0.124, 0.123, -0.778]}
        scale={1.6}
      >
        <meshStandardMaterial
          color={royalColors.accent}
          metalness={0.9}
          roughness={0.2}
          emissive={royalColors.accent}
          emissiveIntensity={hovered ? 0.6 : 0.3}
        />
      </mesh>
      
      {/* Orbiting diamonds and spheres */}
      <group ref={orbitingObjectsRef}>
        {/* Diamonds */}
        {[...Array(6)].map((_, i) => (
          <Float 
            key={`diamond-${i}`} 
            speed={2} 
            rotationIntensity={0.5} 
            floatIntensity={0.5}
          >
            <mesh 
              position={[
                Math.cos(i / 6 * Math.PI * 2) * 2.5,
                Math.sin(i / 6 * Math.PI * 2) * 2.5,
                Math.sin((i + 2) / 6 * Math.PI * 2) * 0.5
              ]}
              rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
              scale={0.15}
            >
              <octahedronGeometry args={[1, 0]} />
              <meshStandardMaterial 
                color={royalColors.accent}
                metalness={1}
                roughness={0.1}
                emissive={royalColors.accent}
                emissiveIntensity={0.7}
              />
            </mesh>
          </Float>
        ))}
        
        {/* Spheres */}
        {[...Array(4)].map((_, i) => (
          <Float 
            key={`sphere-${i}`} 
            speed={1.5} 
            rotationIntensity={0.3} 
            floatIntensity={0.3}
          >
            <mesh 
              position={[
                Math.cos(i / 4 * Math.PI * 2) * 3.2,
                Math.sin(i / 4 * Math.PI * 2) * 3.2,
                Math.sin((i + 1) / 4 * Math.PI * 2) * 0.8
              ]}
              scale={0.2}
            >
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial 
                color={royalColors.secondary}
                metalness={0.8}
                roughness={0.2}
                emissive={royalColors.secondary}
                emissiveIntensity={0.5}
              />
            </mesh>
          </Float>
        ))}
      </group>
      
      {/* Inner sparkles */}
      <Sparkles 
        count={80}
        scale={3}
        size={0.4}
        speed={0.3}
        opacity={0.6}
        color={royalColors.glow}
      />
      
      {/* Hover label */}
      {hovered && (
        <Text
          position={[0, 2, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {clicked ? "Royal Planet" : "Click to Explore"}
        </Text>
      )}
    </group>
  );
}

useGLTF.preload("/models/Planet.glb");