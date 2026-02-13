
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Briefcase, Globe, Zap, Code, Terminal, Menu, X, Calendar, Play, ChevronLeft, ChevronRight, Cpu, Layers, Github, Database, Layout, ShoppingCart, Calculator as CalcIcon, User, Linkedin } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import { Project } from './types';

// Updated Portfolio Data for Divakar Kumar
const PROJECTS: Project[] = [
  { 
    id: '1', 
    title: 'Connect4 Game', 
    category: 'Game Logic / C++', 
    year: '2025', 
    image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?q=80&w=1200&auto=format&fit=crop',
    description: 'A strategic implementation of the classic Connect4 game. Features a robust game engine with minimax algorithm for single-player mode and a smooth terminal/web interface.',
    tech: ['C++', 'Algorithms', 'Logic Design', 'Game Dev']
  },
  { 
    id: '2', 
    title: 'E-commerce Site', 
    category: 'Full Stack / SQL', 
    year: '2025', 
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    description: 'A scalable e-commerce platform with integrated cart management, user authentication, and a relational database backend for product inventory tracking.',
    tech: ['JavaScript', 'SQL', 'HTML/CSS', 'Database']
  },
  { 
    id: '3', 
    title: 'Smart Calculator', 
    category: 'Frontend / JS', 
    year: '2025', 
    image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=1200&auto=format&fit=crop',
    description: 'A feature-rich calculator with history tracking, advanced mathematical functions, and a sleek, responsive glassmorphic UI.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'UI/UX']
  },
  { 
    id: '4', 
    title: 'Modern Portfolio', 
    category: 'Web Design / React', 
    year: '2025', 
    image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1200&auto=format&fit=crop',
    description: 'A high-performance personal portfolio showcasing technical expertise through interactive animations and clean architectural design.',
    tech: ['React', 'Framer Motion', 'Tailwind', 'TypeScript']
  }
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const [requestingIndex, setRequestingIndex] = useState<number | null>(null);
  const [requestedIndex, setRequestedIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === 'ArrowLeft') navigateProject('prev');
      if (e.key === 'ArrowRight') navigateProject('next');
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const handleRequest = (index: number) => {
    setRequestingIndex(index);
    setTimeout(() => {
      setRequestingIndex(null);
      setRequestedIndex(index);
    }, 2500);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navigateProject = (direction: 'next' | 'prev') => {
    if (!selectedProject) return;
    const currentIndex = PROJECTS.findIndex(p => p.id === selectedProject.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % PROJECTS.length;
    } else {
      nextIndex = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length;
    }
    setSelectedProject(PROJECTS[nextIndex]);
  };
  
  return (
    <div className="relative min-h-screen text-white selection:bg-[#10b981] selection:text-black cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />
      <FluidBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-8 py-6 mix-blend-difference">
        <div className="font-heading text-xl md:text-2xl font-bold tracking-tighter text-white cursor-default z-50">
          DIVAKAR.K<span className="text-[0.4em] align-top opacity-60 ml-0.5 tracking-normal">UMAR</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-sm font-bold tracking-widest uppercase">
          {['Projects', 'Skills', 'Experience'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase())}
              className="hover:text-[#10b981] transition-colors text-white cursor-pointer bg-transparent border-none"
              data-hover="true"
            >
              {item}
            </button>
          ))}
        </div>
        <button 
          onClick={() => scrollToSection('experience')}
          className="hidden md:inline-block border border-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 text-white cursor-pointer bg-transparent"
          data-hover="true"
        >
          Contact
        </button>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-[#0a0a0a]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['Projects', 'Skills', 'Experience'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-4xl font-heading font-bold text-white hover:text-[#10b981] transition-colors uppercase bg-transparent border-none"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('experience')}
              className="mt-8 border border-white px-10 py-4 text-sm font-bold tracking-widest uppercase bg-white text-black"
            >
              Connect
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative h-[100svh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden px-4">
        <motion.div 
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-6xl pb-24 md:pb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-3 md:gap-6 text-xs md:text-base font-mono text-[#10b981] tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <span>COMPUTER SCIENCE STUDENT</span>
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#10b981] rounded-full animate-pulse"/>
            <span>C++ | SQL | Frontend</span>
          </motion.div>

          <div className="relative w-full flex justify-center items-center">
            <GradientText 
              text="DIVAKAR.K" 
              suffix="UMAR"
              as="h1" 
              className="text-[12vw] md:text-[10vw] leading-[0.9] font-black tracking-tighter text-center" 
            />
            <motion.div 
               className="absolute -z-20 w-[50vw] h-[50vw] bg-emerald-500/5 blur-[60px] rounded-full pointer-events-none"
               animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.2, 0.4, 0.2] }}
               transition={{ duration: 8, repeat: Infinity }}
            />
          </div>
          
          <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
             className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mt-4 md:mt-8 mb-6 md:mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-base md:text-2xl font-light max-w-xl mx-auto text-white/90 leading-relaxed px-4"
          >
            Specializing in robust system logic, efficient data structures, and interactive web architecture.
          </motion.p>
        </motion.div>

        {/* MARQUEE */}
        <div className="absolute bottom-12 md:bottom-16 left-0 w-full py-4 md:py-6 bg-white text-black z-20 overflow-hidden border-y-4 border-black">
          <motion.div 
            className="flex w-fit"
            animate={{ x: "-50%" }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[0, 1].map((key) => (
              <div key={key} className="flex whitespace-nowrap shrink-0">
                {["HTML5", "CSS3", "JAVASCRIPT", "C++", "SQL", "DATA STRUCTURES", "ALGORITHMS"].map((skill, i) => (
                  <span key={i} className="text-3xl md:text-5xl font-heading font-black px-8 flex items-center gap-4">
                    {skill} <span className="text-black/20 text-xl">●</span> 
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* PROJECTS SECTION */}
      <section id="projects" className="relative z-10 py-20 md:py-32 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 px-4">
             <div className="space-y-2">
               <motion.span 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 className="text-[#10b981] font-mono text-sm tracking-[0.3em] uppercase block"
                >
                  Featured Projects
                </motion.span>
                <h2 className="text-6xl md:text-9xl font-heading font-bold uppercase leading-[0.85] tracking-tighter">
                  created <br/> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-400 to-white/40">project</span>
                </h2>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {PROJECTS.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative group h-[500px] md:h-[700px] rounded-[2rem] overflow-hidden cursor-pointer"
                onClick={() => setSelectedProject(project)}
                data-hover="true"
              >
                {/* Image Layer */}
                <div className="absolute inset-0 z-0">
                  <motion.img 
                    src={project.image} 
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    alt={project.title} 
                  />
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-all duration-500" />
                </div>

                {/* Glass Card UI */}
                <div className="absolute inset-0 z-10 p-6 md:p-10 flex flex-col justify-end">
                   <div className="w-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[1.5rem] p-6 md:p-8 transform transition-all duration-500 group-hover:translate-y-[-10px] group-hover:bg-white/10 shadow-2xl group-hover:border-white/20">
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#10b981] text-xs font-mono uppercase tracking-widest">
                          {project.category}
                        </span>
                        <span className="text-white/40 font-mono text-xs uppercase">2025</span>
                      </div>
                      
                      <h3 className="text-4xl md:text-6xl font-heading font-bold uppercase mb-4 leading-none tracking-tighter group-hover:text-[#10b981] transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm md:text-base line-clamp-2 mb-6 group-hover:text-gray-200 transition-colors">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 3).map(t => (
                          <span key={t} className="text-[10px] md:text-xs font-mono text-white/40 uppercase tracking-widest border border-white/5 px-2 py-1 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                   </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.15),transparent_70%)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS/PHILOSOPHY SECTION */}
      <section id="skills" className="relative z-10 py-20 md:py-32 bg-black/20 backdrop-blur-sm border-t border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <h2 className="text-4xl md:text-7xl font-heading font-bold mb-6 md:mb-8 leading-tight">
                Tech <br/> <GradientText text="STACK" className="text-5xl md:text-8xl" />
              </h2>
              <p className="text-lg md:text-xl text-gray-200 mb-8 md:mb-12 font-light leading-relaxed">
                Focused on low-level efficiency and high-level interactivity. 
              </p>
              
              <div className="space-y-6 md:space-y-8">
                {[
                  { icon: Terminal, title: 'C++ Excellence', desc: 'Expertise in STL, memory management, and high-performance algorithms.' },
                  { icon: Layers, title: 'Modern Web (JS/CSS)', desc: 'Crafting responsive, interactive user experiences with vanilla tech.' },
                  { icon: Cpu, title: 'SQL & Data Architecture', desc: 'Designing optimized relational schemas for scalable applications.' },
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-6">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <feature.icon className="w-6 h-6 text-[#10b981]" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-2 font-heading">{feature.title}</h4>
                      <p className="text-sm text-gray-300">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 relative h-[400px] md:h-[700px] w-full order-1 lg:order-2">
              <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 group">
                <img src="https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&q=80&w=1000" alt="Code" className="h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                  <div className="text-5xl md:text-8xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/0 opacity-50">0x00</div>
                  <div className="text-lg md:text-xl font-bold tracking-widest uppercase mt-2 text-white">Full-Stack Capability</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE/ENGAGEMENT SECTION */}
      <section id="experience" className="relative z-10 py-20 md:py-32 px-4 md:px-6 bg-black/30 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
             <h2 className="text-5xl md:text-9xl font-heading font-bold opacity-10 text-white uppercase">Connect</h2>
             <p className="text-[#10b981] font-mono uppercase tracking-widest -mt-3 md:-mt-8 relative z-10 text-sm md:text-base">
               Collaboration & Opportunities
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'SDE Intern', price: 'Full-time', color: 'white', items: ['C++ Development', 'Backend Engineering', 'Database Design'] },
              { name: 'Freelance', price: 'Project', color: 'emerald', items: ['Web Development', 'SQL Optimization', 'JS Applications'] },
              { name: 'Collaborate', price: 'Open', color: 'periwinkle', items: ['Open Source', 'Hackathons', 'Peer Review'] },
            ].map((tier, i) => {
              const isRequesting = requestingIndex === i;
              const isRequested = requestedIndex === i;

              return (
                <motion.div
                  key={i}
                  whileHover={{ 
                    y: -10,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderColor: "rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(24px)"
                  }}
                  className={`relative p-8 md:p-10 border border-white/10 backdrop-blur-md flex flex-col min-h-[450px] bg-white/5 transition-all duration-500`}
                  data-hover="true"
                >
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-white">{tier.name}</h3>
                    <div className={`text-4xl md:text-5xl font-bold mb-8 md:mb-10 tracking-tighter text-white`}>
                      {tier.price}
                    </div>
                    <ul className="space-y-4 text-sm text-gray-300">
                      {tier.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3"><Zap className="w-4 h-4 text-[#10b981]" /> {item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <button 
                    onClick={() => handleRequest(i)}
                    className={`w-full py-4 text-sm font-bold uppercase tracking-widest border border-white/20 transition-all duration-300 mt-8 
                      ${isRequested ? 'bg-[#10b981] text-black border-[#10b981]' : 'text-white hover:bg-white hover:text-black'}`}
                  >
                    {isRequesting ? 'Sending...' : isRequested ? 'Request Sent' : 'Message Me'}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-12 md:py-16 bg-black/80">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
             <div className="font-heading text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-white uppercase">
               DIVAKAR.K<span className="text-[0.4em] align-top opacity-50 ml-0.5 tracking-normal">UMAR</span>
             </div>
             <div className="flex gap-2 text-xs font-mono text-gray-400">
               <span>&copy; 2025 Divakar Kumar • CSE Student</span>
             </div>
          </div>
          <div className="flex gap-8">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors flex items-center gap-2" data-hover="true"><Github className="w-4 h-4" /> Github</a>
            <a href="https://www.linkedin.com/in/divakar-singh-39b4482a8/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors flex items-center gap-2" data-hover="true"><Linkedin className="w-4 h-4" /> LinkedIn</a>
            <a href="#" className="text-gray-400 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors">Twitter</a>
          </div>
        </div>
      </footer>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 overflow-hidden flex flex-col md:flex-row rounded-[2rem]"
            >
              <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 z-20 p-2 text-white hover:text-[#10b981]"><X /></button>
              
              <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                <img src={selectedProject.image} alt={selectedProject.title} className="absolute inset-0 w-full h-full object-cover" />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <span className="font-mono text-xs tracking-widest text-[#10b981] uppercase mb-2">2025 / {selectedProject.category}</span>
                <h3 className="text-4xl md:text-6xl font-heading font-bold uppercase mb-4 leading-none tracking-tighter">{selectedProject.title}</h3>
                <p className="text-gray-300 leading-relaxed text-lg font-light mb-8">{selectedProject.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tech.map(t => (
                    <span key={t} className="px-3 py-1 border border-white/20 text-xs font-mono rounded">{t}</span>
                  ))}
                </div>

                <div className="flex gap-4">
                   <button className="flex-1 py-4 bg-white text-black font-bold uppercase text-sm tracking-widest hover:bg-[#10b981] transition-colors">Code Base</button>
                   <button className="px-6 py-4 border border-white/20 text-white hover:bg-white/10 transition-colors"><Github className="w-5 h-5"/></button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
