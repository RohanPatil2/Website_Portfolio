import { useEffect, useRef } from 'react';

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const initCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    class Neuron {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseRadius: number;
      radius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.baseRadius = Math.random() * 1.5 + 0.5;
        this.radius = this.baseRadius;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Mouse interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          this.radius = this.baseRadius + (150 - dist) * 0.02;
        } else {
          this.radius = this.baseRadius;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          ctx.fillStyle = `rgba(0, 240, 255, ${0.8 - dist/150})`; // Neon Cyan
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        }
        ctx.fill();
      }
    }

    let neurons: Neuron[] = [];
    const initNeurons = () => {
      neurons = [];
      const isMobile = width < 768;
      const count = isMobile ? 50 : 120; // Reduced count for spatial optimization
      for (let i = 0; i < count; i++) {
        neurons.push(new Neuron());
      }
    };

    const drawSynapses = () => {
      // Simple distance check (O(n^2) but n is small enough for 60fps)
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const dx = neurons[i].x - neurons[j].x;
          const dy = neurons[i].y - neurons[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx!.beginPath();
            ctx!.moveTo(neurons[i].x, neurons[i].y);
            ctx!.lineTo(neurons[j].x, neurons[j].y);
            
            // Check if near mouse to highlight synapse
            const mx = (neurons[i].x + neurons[j].x) / 2;
            const my = (neurons[i].y + neurons[j].y) / 2;
            const mDist = Math.sqrt(Math.pow(mouseX - mx, 2) + Math.pow(mouseY - my, 2));
            
            if (mDist < 150) {
              ctx!.strokeStyle = `rgba(0, 240, 255, ${0.4 - distance / 300})`;
              ctx!.lineWidth = 1.5;
            } else {
              ctx!.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance / 1200})`;
              ctx!.lineWidth = 0.5;
            }
            ctx!.stroke();
          }
        }
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!ctx) return;
      
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      neurons.forEach((neuron) => {
        neuron.update();
        neuron.draw();
      });
      drawSynapses();
    };

    initCanvas();
    initNeurons();
    animate();

    const handleResize = () => {
      initCanvas();
      initNeurons();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[-2]"
    />
  );
}
