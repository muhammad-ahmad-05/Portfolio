import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PARTICLE_COUNT = 6400; 
const COLOR_CYAN = new THREE.Color("#00f3ff");
const COLOR_RED = new THREE.Color("#ff003c");

// --- RESPONSIVE SHAPE GENERATORS ---

const getOrbShape = (isMobile) => {
  const pos = new Float32Array(PARTICLE_COUNT * 3);
  const scale = isMobile ? 0.7 : 1; // Scale down for portrait screens
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    
    let r;
    const rand = Math.random();
    if (rand < 0.6) {
       r = (2.2 + Math.random() * 0.4) * scale; 
    } else if (rand < 0.9) {
       r = (Math.random() * 1.5) * scale; 
    } else {
       r = (Math.random() * 2.6) * scale; 
    }

    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta); 
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = r * Math.cos(phi);
  }
  return pos;
};

const getDNAShape = (isMobile) => {
  const pos = new Float32Array(PARTICLE_COUNT * 3);
  const radius = isMobile ? 1.0 : 1.8; // Tighter helix for mobile view
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const t = i / PARTICLE_COUNT; 
    const y = (t - 0.5) * 25; 
    const twist = t * Math.PI * 25; 

    if (i % 5 === 0) {
       const stepT = Math.floor(t * 40) / 40; 
       const stepY = (stepT - 0.5) * 25;
       const stepTwist = stepT * Math.PI * 25;
       const bridgeT = Math.random(); 
       
       const x1 = Math.cos(stepTwist) * radius;
       const z1 = Math.sin(stepTwist) * radius;
       const x2 = Math.cos(stepTwist + Math.PI) * radius;
       const z2 = Math.sin(stepTwist + Math.PI) * radius;
       
       pos[i*3] = x1 + (x2 - x1) * bridgeT + (Math.random()-0.5)*0.2;
       pos[i*3+1] = stepY + (Math.random()-0.5)*0.2;
       pos[i*3+2] = z1 + (z2 - z1) * bridgeT + (Math.random()-0.5)*0.2;
    } else {
       const isStrand1 = i % 2 === 0;
       const offset = isStrand1 ? 0 : Math.PI;
       const thicknessR = Math.random() * 0.4;
       const thicknessTheta = Math.random() * Math.PI * 2;
       
       pos[i*3] = Math.cos(twist + offset) * radius + Math.cos(thicknessTheta)*thicknessR;
       pos[i*3+1] = y + (Math.random()-0.5)*0.2;
       pos[i*3+2] = Math.sin(twist + offset) * radius + Math.sin(thicknessTheta)*thicknessR;
    }
  }
  return pos;
};

const getSidesShape = (isMobile) => {
  const pos = new Float32Array(PARTICLE_COUNT * 3);
  const offsetAmount = isMobile ? 1.8 : 4.5; // Prevent sides from going off-screen
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const t = i / PARTICLE_COUNT;
    const y = (t - 0.5) * 25;
    const twist = t * Math.PI * 15;
    const isLeftSide = i % 2 === 0;
    const xOffset = isLeftSide ? -offsetAmount : offsetAmount;
    const radius = 0.6; 

    pos[i * 3] = xOffset + (Math.cos(twist) * radius);
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = Math.sin(twist) * radius;
  }
  return pos;
};

const getCrashBallShape = (isMobile) => {
  const pos = new Float32Array(PARTICLE_COUNT * 3);
  const scale = isMobile ? 0.6 : 1;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.cbrt(Math.random()) * 2.0 * scale; 
    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = r * Math.cos(phi);
  }
  return pos;
};

const getSupernovaShape = () => {
  const pos = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const radius = 2 + Math.pow(Math.random(), 3) * 25; 
    const angle = Math.random() * Math.PI * 2;
    const z = (Math.random() - 0.5) * 30; 
    
    pos[i * 3] = Math.cos(angle) * radius;
    pos[i * 3 + 1] = Math.sin(angle) * radius;
    pos[i * 3 + 2] = z;
  }
  return pos;
};

const getColors = () => {
  const cols = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const isCyan = i % 2 === 0;
    cols[i * 3] = isCyan ? COLOR_CYAN.r : COLOR_RED.r;
    cols[i * 3 + 1] = isCyan ? COLOR_CYAN.g : COLOR_RED.g;
    cols[i * 3 + 2] = isCyan ? COLOR_CYAN.b : COLOR_RED.b;
  }
  return cols;
};

const CinematicSwarm = ({ isMobile }) => {
  const pointsRef = useRef(null);
  const heroOrbMeshRef = useRef(null);
  const finalCoreRef = useRef(null);
  const scrollProgress = useRef(0);
  const smoothedProgress = useRef(0);

  const shapes = useMemo(() => [
    getOrbShape(isMobile), 
    getDNAShape(isMobile), 
    getSidesShape(isMobile), 
    getCrashBallShape(isMobile), 
    getSupernovaShape()
  ], [isMobile]);

  const initialPositions = useMemo(() => new Float32Array(shapes[0]), [shapes]);
  const particleColors = useMemo(() => getColors(), []);

  useEffect(() => {
    scrollProgress.current = 0;
    smoothedProgress.current = 0;
    
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => { scrollProgress.current = self.progress; },
    });
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  useFrame((state, delta) => {
    smoothedProgress.current = THREE.MathUtils.damp(smoothedProgress.current, scrollProgress.current, 5, delta);
    
    const p = Math.max(0, Math.min(1, smoothedProgress.current)); 
    const time = state.clock.getElapsedTime();

    let currentShape, nextShape, lerpFactor;
    
    if (p <= 0.15) {
      currentShape = shapes[0]; nextShape = shapes[0]; lerpFactor = 0;
    } else if (p <= 0.35) {
      currentShape = shapes[0]; nextShape = shapes[1]; lerpFactor = (p - 0.15) / 0.20; 
    } else if (p <= 0.65) {
      currentShape = shapes[1]; nextShape = shapes[2]; lerpFactor = (p - 0.35) / 0.30;
    } else if (p <= 0.85) {
      currentShape = shapes[2]; nextShape = shapes[3]; lerpFactor = (p - 0.65) / 0.20;
    } else {
      currentShape = shapes[3]; nextShape = shapes[4]; lerpFactor = (p - 0.85) / 0.15;
    }

    const easeLerp = lerpFactor < 0.5 
      ? 4 * lerpFactor * lerpFactor * lerpFactor 
      : 1 - Math.pow(-2 * lerpFactor + 2, 3) / 2;

    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
        positions[i] = THREE.MathUtils.lerp(currentShape[i], nextShape[i], easeLerp);
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;

      if (p > 0.85) {
        pointsRef.current.rotation.y = time * 0.8; 
        pointsRef.current.rotation.z = time * 0.15;
      } else {
        pointsRef.current.rotation.y = time * 0.5; 
        pointsRef.current.rotation.z = Math.sin(time * 0.3) * 0.05;
      }

      // Keep it centered entirely on mobile, offset to the right on desktop
      const startX = isMobile ? 0 : 2.5;
      const xOffset = p < 0.15 ? THREE.MathUtils.lerp(startX, 0, p / 0.15) : 0;
      pointsRef.current.position.x = xOffset;
    }

    if (heroOrbMeshRef.current) {
      heroOrbMeshRef.current.rotation.y += delta * 0.5;
      heroOrbMeshRef.current.rotation.x += delta * 0.2;
      
      const startX = isMobile ? 0 : 2.5;
      const xOffset = p < 0.15 ? THREE.MathUtils.lerp(startX, 0, p / 0.15) : 0;
      heroOrbMeshRef.current.position.x = xOffset; 
      
      const orbOpacity = p < 0.15 ? 1 : Math.max(1 - ((p - 0.15) * 10), 0);
      heroOrbMeshRef.current.children[0].material.opacity = orbOpacity * 0.6;
      heroOrbMeshRef.current.children[1].material.opacity = orbOpacity * 0.8;
    }

    if (finalCoreRef.current) {
      finalCoreRef.current.rotation.y -= delta * 0.4;
      finalCoreRef.current.rotation.x += delta * 0.2;

      if (p > 0.85) {
        const coreScaleProgress = (p - 0.85) / 0.15; 
        const maxScale = isMobile ? 0.6 : 1; // Prevent core from completely overwhelming small screens
        const scale = THREE.MathUtils.lerp(0.01, maxScale, coreScaleProgress);
        finalCoreRef.current.scale.set(scale, scale, scale);
        
        finalCoreRef.current.children[0].material.opacity = coreScaleProgress * 0.8;
        finalCoreRef.current.children[1].material.opacity = coreScaleProgress * 0.4;
      } else {
        finalCoreRef.current.scale.set(0.01, 0.01, 0.01);
        finalCoreRef.current.children[0].material.opacity = 0;
        finalCoreRef.current.children[1].material.opacity = 0;
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />

      <group ref={heroOrbMeshRef} scale={isMobile ? [0.7, 0.7, 0.7] : [1, 1, 1]}>
        <Icosahedron args={[2.5, 1]}>
          <meshBasicMaterial color="#00f3ff" wireframe transparent opacity={0.6} />
        </Icosahedron>
        <Icosahedron args={[1.5, 1]}>
          <meshBasicMaterial color="#ff003c" wireframe transparent opacity={0.8} />
        </Icosahedron>
      </group>

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={initialPositions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={PARTICLE_COUNT} array={particleColors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={isMobile ? 0.05 : 0.08} vertexColors transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>

      <group ref={finalCoreRef} position={[0, -2, 0]}>
        <Icosahedron args={[3.5, 2]}>
          <meshBasicMaterial color="#ff003c" wireframe transparent blending={THREE.AdditiveBlending} />
        </Icosahedron>
        <Icosahedron args={[2.5, 1]}>
          <meshBasicMaterial color="#00f3ff" wireframe transparent blending={THREE.AdditiveBlending} />
        </Icosahedron>
      </group>
    </>
  );
};

export default function Scene3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Standard robust check for mobile viewports
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Canvas 
        camera={{ position: [0, 0, 8], fov: 60 }} 
        // Cap DPR to 1.5 to prevent massive frame drops on 3x pixel ratio phones
        dpr={[1, Math.min(1.5, typeof window !== 'undefined' ? window.devicePixelRatio : 1)]} 
        gl={{ antialias: false, powerPreference: "high-performance" }} 
        // pointerEvents: 'none' is crucial so users can actually scroll on touch screens
        style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: -10, pointerEvents: 'none' }} 
    >
      <color attach="background" args={['#050505']} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.1} mipmapBlur intensity={1.5} radius={0.8}/>
      </EffectComposer>
      {/* We only render the heavy math once we know the screen size */}
      {typeof window !== 'undefined' && <CinematicSwarm isMobile={isMobile} />}
    </Canvas>
  );
}