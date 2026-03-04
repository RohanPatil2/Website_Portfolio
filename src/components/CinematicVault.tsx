import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { portfolioData, Project } from '../data/portfolioData';
import { X, ArrowRight, Layers, Cpu, Activity } from 'lucide-react';

const PROJECT_COLORS = [
  'rgba(16, 185, 129, 0.2)', // Emerald
  'rgba(59, 130, 246, 0.2)', // Blue
  'rgba(139, 92, 246, 0.2)', // Violet
  'rgba(245, 158, 11, 0.2)', // Amber
];

const PROJECT_BRAND_COLORS = [
  '#10b981', // Emerald
  '#3b82f6', // Blue
  '#8b5cf6', // Violet
  '#f59e0b', // Amber
];

const PROJECT_SEEDS = [
  'server',
  'medical',
  'geometry',
  'finance'
];

interface VaultCardProps {
  project: Project;
  index: number;
  isFullWidth: boolean;
  color: string;
  brandColor: string;
  onClick: () => void;
}

const VaultCard: React.FC<VaultCardProps> = ({ project, index, isFullWidth, color, brandColor, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  
  const seed = PROJECT_SEEDS[index % PROJECT_SEEDS.length];

  return (
    <motion.div
      ref={cardRef}
      layoutId={`project-${index}`}
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        rotateX,
        scale,
        background: hovered ? color : 'rgba(255, 255, 255, 0.02)',
        transition: 'background 0.5s ease',
        perspective: 1000
      }}
      className={`group relative cursor-pointer rounded-3xl overflow-hidden glass-refraction chromatic-box-hover ${
        isFullWidth ? 'md:col-span-2 aspect-[21/9]' : 'md:col-span-1 aspect-square md:aspect-auto'
      }`}
    >
      {/* Subtle Background Image */}
      <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none">
        <img 
          src={`https://picsum.photos/seed/${seed}/800/600`} 
          alt="" 
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute inset-0 mix-blend-overlay" style={{ background: `linear-gradient(to bottom right, ${brandColor}, transparent)` }} />
      </div>

      {/* 0.5px glowing border */}
      <div className="absolute inset-0 border border-white/10 rounded-3xl group-hover:border-white/30 transition-colors duration-500" />
      
      <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-10">
        <motion.h3 
          layoutId={`title-${index}`}
          className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight chromatic-hover drop-shadow-lg"
        >
          {project.title}
        </motion.h3>
        
        <div className="flex flex-wrap gap-3 mb-6 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
          {project.tech.slice(0, 4).map((tech: string, i: number) => (
            <span key={i} className="px-3 py-1 text-xs font-mono text-white bg-black/40 rounded-full border border-white/20 backdrop-blur-md">
              {tech}
            </span>
          ))}
        </div>

        <div className="overflow-hidden h-0 group-hover:h-12 transition-all duration-500 ease-in-out">
          <button className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-white mt-4 drop-shadow-md" style={{ color: brandColor }}>
            View Architecture <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tech Stack Orbit (Abstract representation) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-0 group-hover:opacity-20 transition-opacity duration-1000 pointer-events-none">
        <div className="absolute inset-0 animate-[spin_20s_linear_infinite] rounded-full border border-dashed border-white/30" />
        <div className="absolute inset-10 animate-[spin_15s_linear_infinite_reverse] rounded-full border border-white/20" />
      </div>
    </motion.div>
  );
}

export default function CinematicVault() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <section id="projects" className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase">
            Projects
          </h2>
          <div className="h-1 w-24 bg-cyan-400 mx-auto rounded-full shadow-[0_0_15px_#00f0ff]"></div>
        </motion.div>

        {/* Symmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-[400px]" style={{ perspective: 1200 }}>
          {portfolioData.projects.map((project, index) => {
            const isFullWidth = index === 0 || index === portfolioData.projects.length - 1;
            const color = PROJECT_COLORS[index % PROJECT_COLORS.length];
            const brandColor = PROJECT_BRAND_COLORS[index % PROJECT_BRAND_COLORS.length];

            return (
              <VaultCard 
                key={index}
                project={project}
                index={index}
                isFullWidth={isFullWidth}
                color={color}
                brandColor={brandColor}
                onClick={() => setSelectedProject(index)}
              />
            );
          })}
        </div>

        {/* Full-Screen Modal */}
        <AnimatePresence>
          {selectedProject !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-2xl"
            >
              <div className="absolute inset-0" onClick={() => setSelectedProject(null)} />
              
              <motion.div
                layoutId={`project-${selectedProject}`}
                className="relative w-full max-w-6xl max-h-full overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl custom-scrollbar"
              >
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-20"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="p-8 md:p-16">
                  <motion.h2 
                    layoutId={`title-${selectedProject}`}
                    className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter"
                  >
                    {portfolioData.projects[selectedProject].title}
                  </motion.h2>

                  <div className="flex flex-wrap gap-3 mb-12">
                    {portfolioData.projects[selectedProject].tech.map((tech, i) => (
                      <span key={i} className="px-4 py-2 text-sm font-mono text-cyan-400 bg-cyan-400/10 rounded-full border border-cyan-400/20">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                      <div>
                        <h3 className="text-xl font-mono text-white/50 uppercase tracking-widest mb-4 flex items-center gap-3">
                          <Layers className="w-5 h-5 text-cyan-400" /> Architecture & Implementation
                        </h3>
                        <div className="space-y-4">
                          {portfolioData.projects[selectedProject].details.map((bullet, i) => (
                            <div key={i} className="flex items-start gap-4 text-white/80 text-lg leading-relaxed">
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_10px_#00f0ff]" />
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                        <h3 className="text-sm font-mono text-white/50 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Activity className="w-4 h-4 text-amber-400" /> Measurable Impact
                        </h3>
                        <div className="text-white/80 text-sm leading-relaxed">
                          {portfolioData.projects[selectedProject].impact}
                        </div>
                      </div>

                      <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                        <h3 className="text-sm font-mono text-white/50 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-cyan-400" /> Core Technologies
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {portfolioData.projects[selectedProject].tech.map((tech, i) => (
                            <span key={i} className="text-sm text-white/80 bg-white/10 px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
