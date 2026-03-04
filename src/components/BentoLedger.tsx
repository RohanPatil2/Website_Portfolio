import { motion } from 'motion/react';
import { resumeData } from '../data/resume';
import { Terminal } from 'lucide-react';

export default function BentoLedger() {
  const leadershipItems = resumeData.extra.find(e => e.type.includes('Leadership'))?.items || [];
  const publications = resumeData.extra.find(e => e.type.includes('Publications'))?.items || [];
  const patents = resumeData.extra.find(e => e.type.includes('Patents'))?.items || [];

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
          
          {/* Terminal Feed for Leadership */}
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
              {leadershipItems.map((item, i) => {
                const parts = item.split('|').map(s => s.trim());
                const role = parts[0];
                const loc = parts[1];
                const date = parts[2];
                return (
                  <div key={i} className="flex flex-col gap-1 border-l-2 border-cyan-400/30 pl-3 py-1">
                    <div className="text-white/40">[{date ? date.toUpperCase() : 'LOG'}]</div>
                    <div className="text-white">
                      <span className="text-cyan-400">DEPLOYED:</span> {role} Protocol
                    </div>
                    {loc && <div className="text-amber-400">LOCATION: {loc}</div>}
                    <div className="text-emerald-400">[SUCCESS]</div>
                  </div>
                );
              })}
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
                <h3 className="text-sm font-mono text-white/60 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Publications</h3>
                <ul className="space-y-3">
                  {publications.map((pub, i) => (
                    <li key={i} className="text-sm text-white/80 flex gap-3">
                      <span className="text-cyan-400 font-mono">›</span>
                      <span>{pub}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-mono text-white/60 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Patents & Certs</h3>
                <ul className="space-y-3">
                  {patents.map((pat, i) => (
                    <li key={i} className="text-sm text-white/80 flex gap-3">
                      <span className="text-amber-400 font-mono">›</span>
                      <span>{pat}</span>
                    </li>
                  ))}
                  {resumeData.certifications.slice(0, 2).map((cert, i) => (
                    <li key={`cert-${i}`} className="text-sm text-white/80 flex gap-3">
                      <span className="text-amber-400 font-mono">›</span>
                      <span>{cert}</span>
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
