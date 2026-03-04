import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { resumeData } from '../data/resume';
import { FolderGit2, ExternalLink } from 'lucide-react';

const BorderBeam = () => (
  <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
    <div className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#00f0ff_50%,transparent_100%)] opacity-30" />
    <div className="absolute inset-[1px] bg-[#0a0a0a] rounded-3xl" />
  </div>
);

export default function BentoGrid() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="projects" className="py-24 px-6 relative z-10" ref={containerRef}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight font-mono uppercase">
            <span className="text-cyan-400">/</span> Featured Work
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[auto] md:auto-rows-[400px]">
          {resumeData.projects.map((project, index) => {
            // Make NeuralLift and FluxForge span 2 columns on desktop
            const isLarge = project.title.includes("NeuralLift") || project.title.includes("FluxForge");
            const yTransform = index % 2 === 0 ? y1 : y2;

            return (
              <motion.div
                key={index}
                style={{ y: yTransform }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative flex flex-col bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-colors ${
                  isLarge ? 'md:col-span-2' : 'md:col-span-1'
                }`}
              >
                {/* Background & Border Beam */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <BorderBeam />
                  </div>
                  {/* Default background when not hovered */}
                  <div className="absolute inset-0 bg-white/[0.02] group-hover:opacity-0 transition-opacity duration-500" />
                </div>

                <div className="p-8 flex-1 flex flex-col relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 bg-cyan-400/10 rounded-xl text-cyan-400 backdrop-blur-md border border-cyan-400/20 shadow-inner">
                      <FolderGit2 className="w-6 h-6" />
                    </div>
                    {project.links.length > 0 && (
                      <a href={project.links[0]} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors chromatic-hover">
                    {project.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.split(', ').map((tech, i) => (
                      <span key={i} className="px-3 py-1 text-xs font-mono text-cyan-400 bg-cyan-400/10 rounded-full border border-cyan-400/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <ul className="space-y-3 mt-auto">
                    {project.bullets.slice(0, isLarge ? 3 : 2).map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/70 text-sm leading-relaxed">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/50 shrink-0" />
                        <span className="line-clamp-3">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none z-10" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
