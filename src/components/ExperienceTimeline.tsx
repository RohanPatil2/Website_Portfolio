import { resumeData } from '../data/resume';
import { Timeline } from './ui/timeline';
import { Terminal, Activity, Cpu } from 'lucide-react';
import { motion } from 'motion/react';
import { Badge } from './ui/badge-1';

export default function ExperienceTimeline() {
  const timelineData = resumeData.experience.map((exp, idx) => {
    // Extract some keywords as stack nodes
    const stackNodes = ['Python', 'PyTorch', 'ROS2', 'Docker', 'FastAPI', 'JavaScript', 'Bootstrap', 'Node.js', 'MongoDB', 'BERT', 'GANs'].filter(tech => exp.bullets.join(' ').includes(tech));
    
    return {
      title: exp.dates.split(' ')[0] + (exp.dates.includes('-') ? ` - ${exp.dates.split('-')[1].trim().split(' ')[0]}` : ''),
      content: (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-refraction chromatic-box-hover p-6 md:p-8 rounded-2xl flex flex-col mb-10"
        >
          <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 chromatic-hover">{exp.role}</h3>
              <div className="text-cyan-400 font-mono text-sm">{exp.company}</div>
              <div className="text-white/40 font-mono text-xs mt-1">{exp.location}</div>
            </div>
            <div className="p-3 bg-cyan-400/10 rounded-lg border border-cyan-400/20 text-cyan-400 hidden sm:block">
              <Terminal className="w-6 h-6" />
            </div>
          </div>

          {/* Mini-Impact Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-black/40 p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 text-white/40 text-xs font-mono mb-2 uppercase">
                <Activity className="w-3 h-3" /> Status
              </div>
              <div className="text-amber-400 font-mono text-sm">Deployed / Active</div>
            </div>
            {stackNodes.length > 0 && (
              <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 text-white/40 text-xs font-mono mb-2 uppercase">
                  <Cpu className="w-3 h-3" /> Stack Nodes
                </div>
                <div className="flex flex-wrap gap-2">
                  {stackNodes.map((tech, i) => (
                    <Badge 
                      key={tech} 
                      variant={i % 2 === 0 ? "teal-subtle" : "blue-subtle"} 
                      size="sm" 
                      capitalize={false}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 space-y-4">
            {exp.bullets.map((bullet, i) => (
              <div key={i} className="flex items-start gap-3 text-white/70 text-sm leading-relaxed">
                <span className="mt-1.5 text-cyan-400 font-mono text-xs">›</span>
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )
    };
  });

  return (
    <section id="experience" className="relative z-10">
      <Timeline data={timelineData} />
    </section>
  );
}
