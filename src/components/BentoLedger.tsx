import { motion } from 'motion/react';
import { resumeData } from '../data/resume';
import { portfolioData } from '../data/portfolioData';
import { Terminal, Award, BookOpen, ShieldCheck } from 'lucide-react';

export default function BentoLedger() {
  return (
    <section id="ledger" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight font-mono uppercase">
            <span className="text-cyan-400">/</span> Personal Ledger
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
          
          {/* Terminal Feed for Organizations & Volunteering */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 glass-refraction rounded-2xl p-6 flex flex-col chromatic-box-hover"
          >
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
              <Terminal className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-mono text-white/60 uppercase tracking-widest">Activity Log</h3>
            </div>
            <div className="space-y-4 font-mono text-xs md:text-sm flex-1 overflow-y-auto custom-scrollbar pr-2">
              {portfolioData.organizations.map((org, i) => (
                <div key={i} className={`flex flex-col gap-1 border-l-2 pl-3 py-1 ${org.isHighPrestige ? 'border-amber-400/50' : 'border-cyan-400/30'}`}>
                  <div className="text-white/40">[{org.date.toUpperCase()}]</div>
                  <div className="text-white">
                    <span className={org.isHighPrestige ? 'text-amber-400 font-bold' : 'text-cyan-400'}>EXECUTED:</span> {org.role} @ {org.organization}
                  </div>
                  <div className="text-emerald-400/80">[IMPACT: {org.description}]</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education Bento */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-refraction rounded-2xl p-6 chromatic-box-hover"
          >
            <h3 className="text-sm font-mono text-white/60 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Education</h3>
            <div className="space-y-6">
              {resumeData.education.map((edu, i) => (
                <div key={i}>
                  <div className="text-cyan-400 font-mono text-xs mb-1">{edu.dates}</div>
                  <div className="font-bold text-white text-sm mb-1">{edu.degree}</div>
                  <div className="text-white/50 text-xs">{edu.institution.split(',')[0]}</div>
                  {edu.gpa && <div className="text-amber-400 font-mono text-xs mt-2">GPA: {edu.gpa}</div>}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Publications & Patents */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-3 glass-refraction rounded-2xl p-6 chromatic-box-hover"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-mono text-white/60 uppercase tracking-widest mb-6 border-b border-white/10 pb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-400" /> Publications
                </h3>
                <ul className="space-y-3">
                  {portfolioData.publications.map((pub, i) => (
                    <li key={i} className="text-sm text-white/80 flex gap-3">
                      <span className="text-cyan-400 font-mono">›</span>
                      <span>{pub.title} <span className="text-white/40 text-xs">({pub.publisher})</span></span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-mono text-white/60 uppercase tracking-widest mb-6 border-b border-white/10 pb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" /> Certifications
                </h3>
                <ul className="space-y-3">
                  {portfolioData.certifications.slice(0, 4).map((cert, i) => (
                    <li key={`cert-${i}`} className="text-sm text-white/80 flex gap-3">
                      <span className="text-amber-400 font-mono">›</span>
                      <span>{cert.title} <span className="text-white/40 text-xs">({cert.issuer})</span></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
