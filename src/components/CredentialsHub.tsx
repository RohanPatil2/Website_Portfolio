import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { resumeData } from '../data/resume';
import { GraduationCap, BookOpen, Award, ChevronDown, ExternalLink } from 'lucide-react';

// Animated GPA Counter
function GPACounter({ targetGPA }: { targetGPA: number }) {
  const [gpa, setGpa] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = targetGPA / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= targetGPA) {
          setGpa(targetGPA);
          clearInterval(timer);
        } else {
          setGpa(start);
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, targetGPA]);

  return <span ref={ref}>{gpa.toFixed(2)}</span>;
}

export default function CredentialsHub() {
  const [activeTab, setActiveTab] = useState<'publications' | 'patents'>('publications');
  const [expandedAbstract, setExpandedAbstract] = useState<number | null>(null);

  const publications = resumeData.extra.find(e => e.type.includes('Publications'))?.items || [];
  const patents = resumeData.extra.find(e => e.type.includes('Patents'))?.items || [];

  return (
    <section id="credentials" className="py-32 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase">
            Credentials & Publications
          </h2>
          <div className="h-1 w-24 bg-amber-400 mx-auto rounded-full shadow-[0_0_15px_#f59e0b]"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Education (The "Degree Plaque") */}
          <div className="lg:col-span-5 space-y-8">
            <h3 className="text-xl font-mono text-white/50 uppercase tracking-widest flex items-center gap-3 mb-6">
              <GraduationCap className="w-6 h-6 text-amber-400" /> Academic Foundation
            </h3>
            
            {resumeData.education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-8 rounded-3xl glass-refraction chromatic-box-hover overflow-hidden group"
              >
                {/* Embossed effect border */}
                <div className="absolute inset-0 border-t border-l border-white/20 rounded-3xl pointer-events-none" />
                <div className="absolute inset-0 border-b border-r border-black/50 rounded-3xl pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="text-amber-400 font-mono text-sm mb-2">{edu.dates}</div>
                  <h4 className="text-2xl font-bold text-white mb-2 leading-tight">{edu.degree}</h4>
                  <div className="text-white/60 text-sm mb-6">{edu.institution}</div>
                  
                  {edu.gpa && (
                    <div className="inline-flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-white/5">
                      <div className="text-xs font-mono text-white/40 uppercase">Cumulative GPA</div>
                      <div className="text-2xl font-black text-amber-400 font-mono">
                        <GPACounter targetGPA={parseFloat(edu.gpa.split('/')[0])} />
                        <span className="text-white/30 text-lg">/4.00</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Subtle background seal/logo abstraction */}
                <div className="absolute -right-10 -bottom-10 w-40 h-40 border-[20px] border-white/5 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>

          {/* Publications & Patents (The "Research Dossier") */}
          <div className="lg:col-span-7">
            <div className="glass-refraction rounded-3xl p-2 mb-8 flex gap-2">
              <button
                onClick={() => setActiveTab('publications')}
                className={`flex-1 py-3 px-6 rounded-2xl text-sm font-mono uppercase tracking-widest transition-all ${
                  activeTab === 'publications' ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white/80'
                }`}
              >
                Publications
              </button>
              <button
                onClick={() => setActiveTab('patents')}
                className={`flex-1 py-3 px-6 rounded-2xl text-sm font-mono uppercase tracking-widest transition-all ${
                  activeTab === 'patents' ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white/80'
                }`}
              >
                Patents
              </button>
            </div>

            <div className="space-y-4">
              {(activeTab === 'publications' ? publications : patents).map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-refraction rounded-2xl overflow-hidden border border-white/5"
                >
                  <button
                    onClick={() => setExpandedAbstract(expandedAbstract === i ? null : i)}
                    className="w-full p-6 flex items-start justify-between text-left hover:bg-white/5 transition-colors"
                  >
                    <div className="flex-1 pr-6">
                      <div className="flex items-center gap-3 mb-2">
                        {activeTab === 'publications' ? (
                          <BookOpen className="w-4 h-4 text-cyan-400" />
                        ) : (
                          <Award className="w-4 h-4 text-amber-400" />
                        )}
                        <span className="text-xs font-mono text-white/40 uppercase">
                          {activeTab === 'publications' ? 'Research Paper' : 'Utility Patent'}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-white leading-snug">{item}</h4>
                    </div>
                    <div className={`p-2 rounded-full bg-white/5 transition-transform duration-300 ${expandedAbstract === i ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-4 h-4 text-white/50" />
                    </div>
                  </button>
                  
                  {/* Reveal Abstract Accordion */}
                  <motion.div
                    initial={false}
                    animate={{ height: expandedAbstract === i ? 'auto' : 0, opacity: expandedAbstract === i ? 1 : 0 }}
                    className="overflow-hidden bg-black/40"
                  >
                    <div className="p-6 pt-0 text-sm text-white/60 leading-relaxed">
                      <div className="border-t border-white/10 pt-4 mt-2">
                        <p className="mb-4">
                          Abstract data is currently classified or pending public release. This research focuses on advancing state-of-the-art methodologies in {item.includes('Stock') ? 'financial time-series forecasting' : 'machine learning applications'}.
                        </p>
                        <button className="flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors">
                          <ExternalLink className="w-3 h-3" /> View External Record
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications: Verified Cryptographic Badges */}
        <div className="mt-24">
          <h3 className="text-xl font-mono text-white/50 uppercase tracking-widest flex items-center gap-3 mb-8 justify-center">
            <Award className="w-6 h-6 text-cyan-400" /> Verified Certifications
          </h3>
          
          <div className="flex flex-wrap justify-center gap-6">
            {resumeData.certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative w-48 h-48 flex items-center justify-center cursor-pointer"
              >
                {/* Hexagon SVG Background */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-[0_0_10px_rgba(0,240,255,0.2)] group-hover:drop-shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-500">
                  <polygon points="50 3, 93 25, 93 75, 50 97, 7 75, 7 25" fill="rgba(255,255,255,0.02)" stroke="rgba(0,240,255,0.3)" strokeWidth="1" className="group-hover:stroke-cyan-400 transition-colors duration-500" />
                </svg>
                
                <div className="relative z-10 text-center p-4">
                  <Award className="w-8 h-8 text-cyan-400 mx-auto mb-3 opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="text-xs font-bold text-white leading-tight line-clamp-3">
                    {cert}
                  </div>
                  
                  {/* Hover State Link */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full scale-75 group-hover:scale-100">
                    <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
                      Verify <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
