import { useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'motion/react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export default function TerminalText({ text, delay = 0 }: { text: string, delay?: number }) {
  const [displayText, setDisplayText] = useState('');
  const controls = useAnimationControls();
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;
    
    timeout = setTimeout(() => {
      let iteration = 0;
      interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );
        
        if (iteration >= text.length) {
          clearInterval(interval);
          controls.start({
            opacity: 1,
            filter: 'blur(0px)',
            transition: { duration: 0.5 }
          });
        }
        
        iteration += 1 / 3; // speed
      }, 30);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay, controls]);

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
