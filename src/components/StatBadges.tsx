import { motion } from 'motion/react';
import NumberTicker from './NumberTicker';

export default function StatBadges() {
  const stats = [
    { value: 40, suffix: '%', label: 'Latency Reduction' },
    { value: 34, suffix: '%', label: 'Bias Reduction' },
    { value: 99, suffix: '%', label: 'System Uptime' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-12 w-full max-w-4xl mx-auto">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 + i * 0.1 }}
          className="px-4 py-2 md:px-6 md:py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3 shadow-[0_0_15px_rgba(0,240,255,0.1)] chromatic-box-hover"
        >
          <span className="text-xl md:text-2xl font-bold text-cyan-400 font-mono">
            <NumberTicker value={stat.value} suffix={stat.suffix} />
          </span>
          <span className="text-xs md:text-sm text-white/60 font-medium uppercase tracking-wider">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
