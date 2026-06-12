import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const container = useRef(null);

  useGSAP(() => {
    // Select all glass panels within this component
    const panels = gsap.utils.toArray('.glass-panel');

    panels.forEach((panel) => {
      gsap.from(panel, {
        scrollTrigger: {
          trigger: panel,
          start: 'top 85%', // Triggers when the top of the panel hits 85% down the viewport
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    });
  }, { scope: container });

  return (
    <section 
      ref={container} 
      id="about"
      className="relative w-full min-h-screen py-24 px-6 md:px-20 pointer-events-none z-10 flex flex-col justify-center"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Summary Panel */}
        <div className="glass-panel pointer-events-auto bg-black/25 backdrop-blur-xl border border-white/10 p-8 md:p-12 shadow-2xl hover:border-[#00f3ff]/50 transition-colors duration-500">
          <h3 className="text-sm font-bold tracking-[0.2em] text-[#ff003c] uppercase mb-6">
            Professional Summary
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
            Aspiring Full-Stack Developer (BSCS) with a solid foundation in building responsive web applications using the MERN stack, Vite, and AWS cloud tools. 
          </p>
          <p className="text-gray-300 text-lg leading-relaxed font-light">
            Skilled in designing secure RESTful APIs with JWT authentication, implementing Redux for state management, and managing low-level C++ memory optimization. Passionate about writing clean code and deploying functional software solutions from scratch.
          </p>
        </div>

        {/* Education & Training Panel */}
        <div className="flex flex-col gap-8">
          
          <div className="glass-panel pointer-events-auto bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl hover:border-[#00f3ff]/50 transition-colors duration-500">
            <h3 className="text-sm font-bold tracking-[0.2em] text-[#00f3ff] uppercase mb-6">
              Education
            </h3>
            <div className="mb-2 flex justify-between items-start">
              <h4 className="text-xl text-white font-bold">University Of Lahore (UOL)</h4>
              <span className="text-[#00f3ff] text-sm font-mono mt-1">2023 - 2027</span>
            </div>
            <p className="text-gray-400">Bachelor of Science in Computer Science (BSCS)</p>
          </div>

          <div className="glass-panel pointer-events-auto bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl hover:border-[#ff003c]/50 transition-colors duration-500">
            <h3 className="text-sm font-bold tracking-[0.2em] text-[#ff003c] uppercase mb-6">
              Training
            </h3>
            <div className="mb-2 flex justify-between items-start">
              <h4 className="text-xl text-white font-bold">PNY Trainings</h4>
              <span className="text-[#ff003c] text-sm font-mono mt-1">2022 - 2023</span>
            </div>
            <p className="text-gray-400 font-bold mb-1">Full Stack Web Development</p>
            <p className="text-gray-500 text-sm">Core focus on HTML, CSS, JavaScript, PHP, and the MERN stack.</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;