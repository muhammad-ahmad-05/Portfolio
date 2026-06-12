import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from('.reveal-text', {
      y: '100%',
      opacity: 0,
      rotationZ: 2, 
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out',
    });

    tl.from('.hero-fade', {
      opacity: 0,
      y: 20,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
    }, "-=0.6");
  }, { scope: container });

  return (
    <section 
      ref={container} 
      className="relative w-full min-h-screen flex flex-col justify-center px-6 md:px-20 pointer-events-none z-10"
    >
      <div className="max-w-5xl z-10">
        
        <div className="overflow-hidden mb-2">
          {/* Kept the shadow on the main title so it stays grounded */}
          <h1 className="reveal-text text-5xl md:text-8xl font-black text-white tracking-tighter uppercase pointer-events-auto ">
            Muhammad Ahmad
          </h1>
        </div>
        
        <div className="overflow-hidden mb-6">
          <h2 className="reveal-text text-2xl md:text-4xl font-bold text-[#00f3ff] tracking-wide pointer-events-auto [text-shadow:_0_0_10px_rgba(0,243,255,0.4),_0_2px_4px_rgba(0,0,0,0.8)]">
            Full-Stack Developer
          </h2>
        </div>

        <div className="overflow-hidden mb-10">
          {/* THE MAGIC HAPPENS HERE: 
            Added `mix-blend-difference` and pure `text-white`. 
            Removed text shadows so the math applies cleanly to the letters.
          */}
          <div className=' overflow-hidden size-fit pl-4 backdrop-blur-md bg-black/30 border border-white/20 rounded-xl shadow-lg p-6'>
          <p className="reveal-text text-lg md:text-xl text-white max-w-2xl font-medium pointer-events-auto leading-relaxed">
            Lahore, Pakistan | Building scalable MERN applications, optimizing C++ memory, and architecting seamless digital logistics.
          </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 pointer-events-auto hero-fade">
          <a 
            href="#projects" 
            className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-[#00f3ff] transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(0,243,255,0.5)]"
          >
            View Projects
          </a>
          <a 
            href="https://linkedin.com/in/muhammad-ahmad-810227219" 
            target="_blank" 
            rel="noreferrer"
            className="px-8 py-3 border border-white/30 text-white font-bold uppercase tracking-widest hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white shadow-[0_4px_15px_rgba(0,0,0,0.5)] bg-black/10"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;