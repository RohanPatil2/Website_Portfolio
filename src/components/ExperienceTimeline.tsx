import { motion, useScroll } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { resumeData } from '../data/resume';
import { Terminal, Activity, Cpu } from 'lucide-react';

// Sound design utility
const playClickSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(100, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    // Ignore audio errors
  }
};

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      const newIndex = Math.min(
        Math.max(Math.floor(v * resumeData.experience.length), 0),
        resumeData.experience.length - 1
      );
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
        playClickSound();
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, activeIndex]);

  return (
    <section id="experience" className="py-32 px-6 relative z-10" ref={containerRef}>
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* Left: Timeline Navigation */}
        <div className="lg:w-1/3 relative">
          <div className="sticky top-32">
            <h2 className="text-3xl font-bold text-white mb-8 tracking-tight font-mono uppercase">
              <span className="text-cyan-400">/</span> Experience
            </h2>
            
            <div className="relative border-l border-white/10 ml-4 space-y-8">
              {resumeData.experience.map((exp, idx) => (
                <div 
                  key={idx} 
                  className={`relative pl-8 cursor-pointer transition-all duration-300 ${activeIndex === idx ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                  onClick={() => {
                    setActiveIndex(idx);
                    playClickSound();
                  }}
                >
                  <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'bg-cyan-400 shadow-[0_0_10px_#00f0ff] scale-150' : 'bg-white/20'}`} />
                  <div className="font-mono text-xs text-cyan-400 mb-1">{exp.dates}</div>
                  <div className="font-bold text-white text-sm leading-tight">{exp.role}</div>
                  <div className="text-white/50 text-xs mt-1">{exp.company.split('|')[0]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Active Role Details (Depth Stack) */}
        <div className="lg:w-2/3 relative min-h-[600px] mt-12 lg:mt-0">
          {resumeData.experience.map((exp, idx) => {
            const isActive = activeIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : 50,
                  scale: isActive ? 1 : 0.95,
                  pointerEvents: isActive ? 'auto' : 'none',
                  zIndex: isActive ? 10 : 0
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <div className="glass-refraction chromatic-box-hover p-6 md:p-8 rounded-2xl h-full flex flex-col">
                  <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 chromatic-hover">{exp.role}</h3>
                      <div className="text-cyan-400 font-mono text-sm">{exp.company}</div>
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
                    <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                      <div className="flex items-center gap-2 text-white/40 text-xs font-mono mb-2 uppercase">
                        <Cpu className="w-3 h-3" /> Stack Nodes
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {/* Extract some keywords as stack nodes */}
                        {['Python', 'PyTorch', 'ROS2', 'Docker', 'FastAPI', 'JavaScript', 'Bootstrap', 'Node.js', 'MongoDB', 'BERT', 'GANs'].filter(tech => exp.bullets.join(' ').includes(tech)).map(tech => (
                          <span key={tech} className="px-2 py-0.5 text-[10px] font-mono text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto pr-4 space-y-4 custom-scrollbar">
                    {exp.bullets.map((bullet, i) => (
                      <div key={i} className="flex items-start gap-3 text-white/70 text-sm leading-relaxed">
                        <span className="mt-1.5 text-cyan-400 font-mono text-xs">›</span>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
