import { useEffect, useState, useRef } from 'react';
import { motion, useAnimationControls } from 'motion/react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export default function TerminalText({ 
  texts, 
  delay = 0, 
  intervalMs = 5000 
}: { 
  texts: string[], 
  delay?: number, 
  intervalMs?: number 
}) {
  const [displayText, setDisplayText] = useState('');
  const controls = useAnimationControls();
  const indexRef = useRef(0);
  
  useEffect(() => {
    let scrambleInterval: NodeJS.Timeout;
    let cycleInterval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;
    
    const scramble = (targetText: string) => {
      let iteration = 0;
      controls.set({ opacity: 0.8, filter: 'blur(2px)' });
      
      clearInterval(scrambleInterval);
      scrambleInterval = setInterval(() => {
        setDisplayText(
          targetText
            .split('')
            .map((letter, index) => {
              if (index < iteration) {
                return targetText[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );
        
        if (iteration >= targetText.length) {
          clearInterval(scrambleInterval);
          controls.start({
            opacity: 1,
            filter: 'blur(0px)',
            transition: { duration: 0.5 }
          });
        }
        
        iteration += 1 / 3; // speed
      }, 30);
    };

    timeout = setTimeout(() => {
      // Initial scramble
      scramble(texts[indexRef.current]);
      
      // Start cycling
      cycleInterval = setInterval(() => {
        indexRef.current = (indexRef.current + 1) % texts.length;
        scramble(texts[indexRef.current]);
      }, intervalMs);
      
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(scrambleInterval);
      clearInterval(cycleInterval);
    };
  }, [texts, delay, intervalMs, controls]);

  return (
    <motion.span
      initial={{ opacity: 0.8, filter: 'blur(2px)' }}
      animate={controls}
      className="inline-block"
    >
      {displayText || ' '}
    </motion.span>
  );
}
