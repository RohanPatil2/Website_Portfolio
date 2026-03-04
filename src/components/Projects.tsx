import { motion } from 'motion/react';
import { resumeData } from '../data/resume';
import { FolderGit2, ExternalLink } from 'lucide-react';

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Featured Projects</h2>
          <div className="h-1 w-20 bg-emerald-400 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {resumeData.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col bg-black/40 border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-colors"
            >
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-white/5 rounded-xl text-emerald-400">
                    <FolderGit2 className="w-6 h-6" />
                  </div>
                  {project.links.length > 0 && (
                    <a href={project.links[0]} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stack.split(', ').map((tech, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-mono text-emerald-300 bg-emerald-400/10 rounded-full border border-emerald-400/20">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <ul className="space-y-3 mt-auto">
                  {project.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/70 text-sm leading-relaxed">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/30 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
