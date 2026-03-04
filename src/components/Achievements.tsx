import { motion } from 'motion/react';
import { resumeData } from '../data/resume';
import { Trophy, TrendingUp, Zap } from 'lucide-react';

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6 relative z-10 bg-black/20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Impact & Achievements</h2>
          <div className="h-1 w-20 bg-emerald-400 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumeData.achievements.map((achievement, index) => {
            // Determine icon based on content
            let Icon = Trophy;
            if (achievement.title.includes('%') || achievement.title.includes('accuracy')) Icon = TrendingUp;
            if (achievement.title.includes('latency') || achievement.title.includes('time')) Icon = Zap;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Icon className="w-24 h-24" />
                </div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-emerald-400/20 flex items-center justify-center mb-6 text-emerald-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                    {achievement.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {achievement.context}
                  </p>
                </div>
                
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/0 via-emerald-500/0 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
