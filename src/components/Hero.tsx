import { motion, useMotionValue, useTransform } from 'motion/react';
import { resumeData } from '../data/resume';
import { ChevronDown, Download, ArrowRight, Github, Linkedin } from 'lucide-react';
import Magnetic from './Magnetic';
import StatBadges from './StatBadges';
import TerminalText from './TerminalText';
import { useEffect } from 'react';

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Transform mouse position to background position for the gradient
  const bgX = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [0, 100]);
  const bgY = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [0, 100]);

  const handleScrollToExperience = () => {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadResume = () => {
    window.open(resumeData.basics.links.find(l => l.name === 'LinkedIn')?.url, '_blank');
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-20 pb-10">
      <div className="max-w-5xl mx-auto w-full z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 flex gap-4"
        >
          <Magnetic>
            <a href={resumeData.basics.links.find(l => l.name === 'Github')?.url} target="_blank" rel="noreferrer" className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center">
              <Github className="w-5 h-5 text-white/80" />
            </a>
          </Magnetic>
          <Magnetic>
            <a href={resumeData.basics.links.find(l => l.name === 'LinkedIn')?.url} target="_blank" rel="noreferrer" className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center">
              <Linkedin className="w-5 h-5 text-white/80" />
            </a>
          </Magnetic>
        </motion.div>

        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 text-transparent bg-clip-text cursor-default"
          style={{
            backgroundImage: 'linear-gradient(to right, #ffffff, #00f0ff, #ffb000)',
            backgroundSize: '200% 200%',
            backgroundPositionX: useTransform(bgX, v => `${v}%`),
            backgroundPositionY: useTransform(bgY, v => `${v}%`),
          }}
          initial={{ opacity: 0, scale: 0.9, filter: 'drop-shadow(0px 0px 0px rgba(0,240,255,0))' }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ 
            scale: 1.02,
            filter: 'drop-shadow(0px 0px 25px rgba(0,240,255,0.8))'
          }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {resumeData.basics.name.split(' ')[0]}<br />
          {resumeData.basics.name.split(' ').slice(1).join(' ')}
        </motion.h1>

        <motion.div
          className="text-xl md:text-3xl text-cyan-400 font-mono mb-8 max-w-2xl h-12 relative flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <TerminalText text="AI Engineer | GenAI Specialist" delay={400} />
        </motion.div>

        <motion.p
          className="text-base md:text-lg text-white/60 max-w-2xl mb-12 leading-relaxed font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {resumeData.basics.summary.split('.')[0]}. {resumeData.basics.summary.split('.')[1]}.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <Magnetic>
            <button
              onClick={handleScrollToExperience}
              className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <span className="relative z-10">View Experience</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-cyan-400 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
            </button>
          </Magnetic>
          
          <Magnetic>
            <button
              onClick={handleDownloadResume}
              className="px-8 py-4 bg-black/40 backdrop-blur-md text-white border border-white/20 font-medium rounded-full flex items-center justify-center gap-2 hover:bg-white/10 transition-colors w-full sm:w-auto"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </button>
          </Magnetic>
        </motion.div>

        <StatBadges />
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
