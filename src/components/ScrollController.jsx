import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Hero from './sections/Hero';
import About from './sections/About';

// Resume Data for Experience Section
const resumeData = {
  about: {
    title: "About",
    description: "Aspiring Full-Stack Developer (BSCS) with a solid foundation in building responsive web applications using the MERN stack, Vite, and AWS cloud tools. Skilled in designing secure RESTful APIs with JWT authentication, implementing Redux for state management, and managing low-level C++ memory optimization. Passionate about writing clean code and deploying functional software solutions from scratch."
  },
  experience: [
    {
      title: "ByteForge & Modern E-Commerce Platform",
      tech: "Vite, Firebase, Tailwind CSS",
      points: ["High-performance e-commerce platform deployed on Firebase.", "Secure user auth and database synchronization.", "Fully responsive UI."]
    },
    {
      title: "MERN Stack Freelancing Website",
      tech: "MERN Stack, Material-UI (MUI), AWS SES, JWT",
      points: ["Secured user data with JWT and AWS SES.", "Optimized performance with Redux centralized state management."]
    },
    {
      title: "Movers.pk (Final Year Project - In Progress)",
      tech: "Node.js, PostgreSQL, Socket.io, Google Maps API",
      points: ["B2B/B2C digital freight matching platform.", "React web portal for shippers, React Native mobile app for drivers.", "Geospatial queries for dynamic radius searches.", "Live GPS tracking with WebSockets."]
    },
    {
  title: "3D Creative Portfolio",
  tech: "React Three Fiber, Three.js, GSAP ScrollTrigger, Postprocessing, Tailwind CSS",
  points: [
    "Architected an interactive, continuous 3D particle system rendering 6,400 points driven by custom mathematical vector field equations.",
    "Engineered dynamic asset-framing and responsive spatial checks to transition shapes flawlessly between complex geometries on mobile viewports.",
    "Optimized canvas render pipelines by capping device pixel ratios and disabling power-intensive antialiasing configurations on mobile GPUs."
  ]
},
     {
      title: "Native C++ Management System",
      tech: "SFML-based C++",
      points: ["Interactive front-end using SFML library.", "Advanced Object-Oriented principles.", "Memory optimization and resource loading."]
    },
  ],
  education: [
    { school: "University Of Lahore (UOL)", degree: "BSCS", date: "2023-2027", location: "Lahore, Pakistan" },
    { school: "PNY Trainings", degree: "Full Stack Web Development", date: "2022-2023", location: "" }
  ],
  contact: {
    email: "muhammadahmad.official.05@gmail.com",
    phone: "+923014898301",
    linkedin: "muhammad-ahmad-810227219",
    location: "Lahore, Pakistan"
  }
};

const ExperiencePanel = ({ experience = [] }) => {
  const container = useRef(null);

  useGSAP(() => {
    const panels = gsap.utils.toArray('.exp-panel');
    panels.forEach((panel) => {
      gsap.from(panel, {
        scrollTrigger: {
          trigger: panel,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    });
  }, { scope: container });

  const totalProjects = resumeData.experience.length;
  const isOdd = totalProjects % 2 !== 0;

  return (
    <section ref={container} id="projects" className="relative py-24 px-6 md:px-20 pointer-events-none z-10">
      {/* Added mb-12 to prevent the cards from crushing against your title */}
      <h1 className="reveal-text text-5xl md:text-8xl font-black text-white tracking-tighter uppercase pointer-events-auto mb-12">
        Projects
      </h1>
      
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {resumeData.experience.map((exp, idx) => {
          // Check if this specific card is the absolute last item in an odd list
          const isLastCenteredCard = isOdd && idx === totalProjects - 1;

          return (
            <div 
              key={idx} 
              /* THE TRICK: If it's the last odd card, it spans 2 columns, centers itself, 
                and uses a calculated width to exactly match the sizes of its sister columns above it.
              */
              className={`exp-panel glass-panel pointer-events-auto bg-black/45 backdrop-blur-xl border border-white/10 p-8 shadow-2xl hover:border-[#00f3ff]/50 transition-colors duration-500 flex flex-col justify-between
                ${isLastCenteredCard ? 'md:col-span-2 md:max-w-[calc(50%-1rem)] md:mx-auto w-full' : ''}
              `}
            >
              <div>
                <h3 className="text-xl text-white font-bold mb-2">{exp.title}</h3>
                <p className="text-sm text-[#ff003c] font-mono tracking-wide mb-4">{exp.tech}</p>
                <ul className="list-disc list-outside text-gray-400 space-y-2 ml-4">
                  {exp.points.map((point, pIdx) => (
                    <li key={pIdx} className="text-gray-400 text-sm">{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
const ContactPanel = ({ resumeData }) => {
  const contact = resumeData?.contact || { email: "muhammadahmad.official.05.com", phone: "+92 301 4898301" };
  
  return (
    <section id="contact" className="relative w-full min-h-screen py-24 px-4 md:px-20 pointer-events-none z-10 flex flex-col justify-center items-center text-center">
       {/* Reduced base padding on mobile to p-6 to give the buttons more horizontal space */}
       <div className="glass-panel pointer-events-auto bg-black/40 backdrop-blur-xl border border-white/10 p-6 sm:p-8 md:p-16 rounded-3xl max-w-4xl w-full shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:border-[#00f3ff]/50 transition-colors duration-500 flex flex-col items-center">
          
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4 drop-shadow-md">
            Connect.
          </h2>
          <p className="text-[#00f3ff] text-sm sm:text-lg mb-12 font-light tracking-widest uppercase drop-shadow-md">
            Let’s engineer something exceptional.
          </p>
          
          <div className="flex flex-col space-y-4 w-full max-w-md">
              <a 
                href={`mailto:${contact.email}`} 
                /* UPDATED: text-xs for mobile, added break-all and text-center to allow safe wrapping */
                className="w-full py-4 px-4 sm:px-6 bg-white/5 hover:bg-[#00f3ff]/10 border border-white/10 hover:border-[#00f3ff] text-white text-xs sm:text-sm md:text-xl font-mono rounded-xl transition-all duration-300 flex items-center justify-center text-center break-all"
              >
                {contact.email}
              </a>
              
              <a 
                href={`tel:${contact.phone}`} 
                /* UPDATED: scaled text size for mobile to match */
                className="w-full py-4 px-4 sm:px-6 bg-white/5 hover:bg-[#ff003c]/10 border border-white/10 hover:border-[#ff003c] text-white text-sm md:text-xl font-mono rounded-xl transition-all duration-300 flex items-center justify-center text-center"
              >
                {contact.phone}
              </a>
              
              <div className="text-gray-400 text-xs sm:text-sm md:text-base uppercase tracking-[0.3em] pt-6 mt-2 border-t border-white/10 w-full">
                Lahore, Pakistan
              </div>
          </div>

       </div>
    </section>
  )
}



/**
 * THIS IS THE COMPLETE DOM LAYOUT
 * The order of these sections determines the order of the 3D visual journey.
 */
const ScrollController = () => {
  return (
    <main className="w-full h-full relative z-10 bg-transparent">
      {/* 1. HERO - Dark Metallic Monolith (The Core) */}
      <Hero />
      
      {/* 2. ABOUT - The Fracture (Memory Allocation) */}
      <About />
      
      {/* 3. PROJECTS - Particle Grid (Logistics Web & Topography) */}
      <ExperiencePanel />
      
      {/* 4. CONTACT - Singularity (The Endpoint) */}
      <ContactPanel />
      
    </main>
  );
};

export default ScrollController;