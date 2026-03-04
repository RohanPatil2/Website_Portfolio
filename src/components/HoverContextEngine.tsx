import { motion, AnimatePresence } from 'motion/react';
import { resumeData } from '../data/resume';
import { ExternalLink, Clock, Code2, Briefcase, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HoverContextProps {
  skillId: string | null;
  position: { x: number; y: number } | null;
  containerRect: DOMRect | null;
}

interface RelationalData {
  projects: { title: string; type: 'project' }[];
  experience: { company: string; type: 'experience' }[];
  proficiency: string;
  timeInFlight: string;
}

// Helper to determine proficiency and time based on skill category/size
const getSkillMetrics = (skillId: string, size: number) => {
  let proficiency = "Familiar";
  if (size >= 60) proficiency = "Architect";
  else if (size >= 50) proficiency = "Production";
  else if (size >= 40) proficiency = "Research";

  let timeInFlight = "1+ Years";
  if (size >= 60) timeInFlight = "4+ Years";
  else if (size >= 50) timeInFlight = "3+ Years";
  else if (size >= 40) timeInFlight = "2+ Years";

  return { proficiency, timeInFlight };
};

export default function HoverContextEngine({ skillId, position, containerRect }: HoverContextProps) {
  const [relationalData, setRelationalData] = useState<RelationalData | null>(null);

  useEffect(() => {
    if (!skillId) {
      setRelationalData(null);
      return;
    }

    // Build relational data dynamically
    const projects = resumeData.projects
      .filter(p => p.stack.toLowerCase().includes(skillId.toLowerCase()) || p.bullets.some(b => b.toLowerCase().includes(skillId.toLowerCase())))
      .map(p => ({ title: p.title, type: 'project' as const }));

    const experience = resumeData.experience
      .filter(e => e.bullets.some(b => b.toLowerCase().includes(skillId.toLowerCase())))
      .map(e => ({ company: e.company, type: 'experience' as const }));

    // Mock size for now, ideally passed from parent
    const mockSize = 50; 
    const metrics = getSkillMetrics(skillId, mockSize);

    setRelationalData({
      projects,
      experience,
      ...metrics
    });
  }, [skillId]);

  if (!skillId || !position || !containerRect || !relationalData) return null;

  // Edge detection
  const tooltipWidth = 320;
  const tooltipHeight = 250;
  const padding = 20;

  let x = position.x + padding;
  let y = position.y + padding;

  if (x + tooltipWidth > containerRect.width) {
    x = position.x - tooltipWidth - padding;
  }
  if (y + tooltipHeight > containerRect.height) {
    y = position.y - tooltipHeight - padding;
  }

  // Ensure it doesn't go off top/left
  x = Math.max(padding, x);
  y = Math.max(padding, y);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          position: 'absolute',
          left: x,
          top: y,
          pointerEvents: 'none',
          zIndex: 50,
          willChange: 'transform, opacity'
        }}
        className="w-[320px] bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,240,255,0.1)] overflow-hidden chromatic-box-hover"
      >
        {/* Header */}
        <div className="p-4 border-b border-white/5 bg-gradient-to-r from-cyan-500/10 to-transparent flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-cyan-400/20 flex items-center justify-center border border-cyan-400/30 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
              <Code2 className="w-4 h-4 text-cyan-400" />
            </div>
            <h3 className="text-lg font-black text-white tracking-tight">{skillId}</h3>
          </div>
          <div className="flex items-center gap-1 text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-full border border-cyan-400/20">
            <Clock className="w-3 h-3" /> {relationalData.timeInFlight}
          </div>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
          {/* Proficiency Gauge */}
          <div>
            <div className="flex justify-between text-xs font-mono text-white/50 uppercase tracking-widest mb-2">
              <span>Proficiency</span>
              <span className="text-white/80">{relationalData.proficiency}</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex gap-0.5">
              {['Familiar', 'Research', 'Production', 'Architect'].map((level, i) => {
                const levels = ['Familiar', 'Research', 'Production', 'Architect'];
                const currentIndex = levels.indexOf(relationalData.proficiency);
                const isActive = i <= currentIndex;
                return (
                  <div 
                    key={level} 
                    className={`h-full flex-1 rounded-full ${isActive ? 'bg-cyan-400 shadow-[0_0_10px_#00f0ff]' : 'bg-transparent'}`} 
                  />
                );
              })}
            </div>
          </div>

          {/* Deployed In */}
          <div>
            <div className="text-xs font-mono text-white/50 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Briefcase className="w-3 h-3" /> Deployed In
            </div>
            <div className="space-y-2 max-h-[120px] overflow-y-auto custom-scrollbar pr-2">
              {relationalData.projects.length === 0 && relationalData.experience.length === 0 && (
                <div className="text-xs text-white/30 italic">Foundational capability</div>
              )}
              
              {relationalData.experience.map((exp, i) => (
                <div key={`exp-${i}`} className="flex items-center gap-2 text-xs text-white/70 bg-white/5 p-2 rounded-lg border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span className="truncate">{exp.company}</span>
                </div>
              ))}

              {relationalData.projects.map((proj, i) => (
                <div key={`proj-${i}`} className="flex items-center gap-2 text-xs text-white/70 bg-white/5 p-2 rounded-lg border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span className="truncate">{proj.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
