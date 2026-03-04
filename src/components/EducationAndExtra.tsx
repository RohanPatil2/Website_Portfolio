import { motion } from 'motion/react';
import { resumeData } from '../data/resume';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

export default function EducationAndExtra() {
  return (
    <section id="education" className="py-24 px-6 relative z-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Education */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4 tracking-tight flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-emerald-400" />
              Education
            </h2>
            <div className="h-1 w-12 bg-emerald-400 rounded-full"></div>
          </motion.div>

          <div className="space-y-8">
            {resumeData.education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-6 border-l border-white/10"
              >
                <div className="absolute w-3 h-3 bg-emerald-400 rounded-full -left-[6.5px] top-2 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                <h3 className="text-xl font-bold text-white mb-1">{edu.degree}</h3>
                <p className="text-white/70 mb-2">{edu.institution}</p>
                <div className="flex flex-wrap gap-4 text-sm font-mono text-white/50">
                  <span>{edu.dates}</span>
                  {edu.gpa && <span className="text-emerald-400">GPA: {edu.gpa}</span>}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400" />
              Certifications
            </h3>
            <ul className="space-y-3">
              {resumeData.certifications.map((cert, index) => (
                <li key={index} className="flex items-start gap-3 text-white/80">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Extra (Publications, Patents, Leadership) */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4 tracking-tight flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-emerald-400" />
              Additional
            </h2>
            <div className="h-1 w-12 bg-emerald-400 rounded-full"></div>
          </motion.div>

          <div className="space-y-12">
            {resumeData.extra.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-lg font-mono text-emerald-400 mb-4 uppercase tracking-widest">
                  {section.type}
                </h3>
                <ul className="space-y-4">
                  {section.items.map((item, i) => (
                    <li key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 text-white/80 text-sm leading-relaxed hover:bg-white/10 transition-colors">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
