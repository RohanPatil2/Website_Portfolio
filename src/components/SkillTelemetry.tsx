import { motion } from 'motion/react';
import { resumeData } from '../data/resume';
import { useState } from 'react';

const SKILL_LEVELS: Record<string, { level: number, label: string, color: string }> = {
  'Python': { level: 95, label: 'Architectural Mastery', color: 'text-cyan-400' },
  'PyTorch': { level: 90, label: 'Research Level', color: 'text-amber-400' },
  'ROS2': { level: 85, label: 'Production Ready', color: 'text-cyan-400' },
  'Docker': { level: 80, label: 'Production Ready', color: 'text-cyan-400' },
  'FastAPI': { level: 85, label: 'Production Ready', color: 'text-cyan-400' },
  'C++': { level: 75, label: 'Production Ready', color: 'text-cyan-400' },
  'Transformers': { level: 90, label: 'Research Level', color: 'text-amber-400' },
  'LangChain': { level: 85, label: 'Production Ready', color: 'text-cyan-400' },
};

export default function SkillTelemetry() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  // Flatten skills for telemetry view
  const allSkills = resumeData.skills.flatMap(g => g.items);
  const displaySkills = allSkills.filter(s => SKILL_LEVELS[s]);

  return (
    <section id="skills" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight font-mono uppercase">
            <span className="text-cyan-400">/</span> Telemetry & Skills
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Skill List */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {displaySkills.map((skill, idx) => {
              const data = SKILL_LEVELS[skill];
              const isActive = activeSkill === skill;
              
              return (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  onMouseEnter={() => setActiveSkill(skill)}
                  onMouseLeave={() => setActiveSkill(null)}
                  className={`glass-refraction p-4 rounded-xl cursor-pointer transition-all duration-300 chromatic-box-hover ${isActive ? 'border-cyan-400/50 bg-cyan-400/5' : ''}`}
                >
                  <div className="flex justify-between items-end mb-3">
                    <div className="font-mono font-bold text-white">{skill}</div>
                    <div className={`text-[10px] uppercase tracking-wider font-mono ${data.color}`}>
                      {data.label}
                    </div>
                  </div>
                  
                  {/* Glowing Linear Meter */}
                  <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden relative">
                    <motion.div 
                      className={`absolute top-0 left-0 h-full ${data.color.replace('text-', 'bg-')} shadow-[0_0_10px_currentColor]`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${data.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + idx * 0.05 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Context Panel */}
          <div className="lg:col-span-1">
            <div className="glass-refraction p-6 rounded-xl h-full sticky top-32">
              <div className="text-xs font-mono text-white/40 uppercase mb-4 border-b border-white/10 pb-2">
                Usage Context
              </div>
              
              {activeSkill ? (
                <motion.div
                  key={activeSkill}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="text-xl font-bold text-cyan-400 font-mono mb-2">{activeSkill}</div>
                  <div className="text-sm text-white/70">Detected in projects:</div>
                  <ul className="space-y-2">
                    {resumeData.projects.filter(p => p.stack.includes(activeSkill) || p.bullets.join(' ').includes(activeSkill)).map((p, i) => (
                      <li key={i} className="text-xs font-mono text-white/90 bg-white/5 p-2 rounded border border-white/10">
                        {p.title}
                      </li>
                    ))}
                    {resumeData.experience.filter(e => e.bullets.join(' ').includes(activeSkill)).map((e, i) => (
                      <li key={`exp-${i}`} className="text-xs font-mono text-white/90 bg-white/5 p-2 rounded border border-white/10">
                        {e.company.split('|')[0]}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : (
                <div className="text-sm text-white/30 font-mono flex items-center justify-center h-40 text-center">
                  Hover over a telemetry node to view deployment context.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
