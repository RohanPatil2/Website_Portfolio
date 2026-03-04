import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as d3 from 'd3-force';
import { portfolioData } from '../data/portfolioData';
import HoverContextEngine from './HoverContextEngine';

// Define categories and map skills to them
const CATEGORIES = ['All Nodes', 'GenAI & LLMs', 'Core ML & Deep Learning', 'MLOps & Cloud', 'Data & Vector DBs', 'Languages'];

const SKILL_MAPPING: Record<string, { category: string, size: number }> = {
  // Languages
  'Python': { category: 'Languages', size: 65 },
  'C++': { category: 'Languages', size: 60 }, // Increased size based on frequency
  'CUDA': { category: 'Languages', size: 45 },
  'SQL': { category: 'Languages', size: 50 },
  'JavaScript': { category: 'Languages', size: 40 },
  'TypeScript': { category: 'Languages', size: 40 },
  'Go': { category: 'Languages', size: 35 },
  'Rust': { category: 'Languages', size: 35 },
  'Bash': { category: 'Languages', size: 35 },
  
  // Core ML & Deep Learning
  'PyTorch': { category: 'Core ML & Deep Learning', size: 60 },
  'TensorFlow': { category: 'Core ML & Deep Learning', size: 65 }, // Increased
  'Keras': { category: 'Core ML & Deep Learning', size: 40 },
  'scikit-learn': { category: 'Core ML & Deep Learning', size: 50 },
  'XGBoost': { category: 'Core ML & Deep Learning', size: 45 },
  'LightGBM': { category: 'Core ML & Deep Learning', size: 40 },
  'OpenCV': { category: 'Core ML & Deep Learning', size: 45 },
  'JAX': { category: 'Core ML & Deep Learning', size: 40 },
  'ONNX': { category: 'Core ML & Deep Learning', size: 40 },
  'TensorRT': { category: 'Core ML & Deep Learning', size: 40 },
  
  // GenAI & LLMs
  'Large Language Models (LLM)': { category: 'GenAI & LLMs', size: 70 }, // Added and massive
  'LLMs': { category: 'GenAI & LLMs', size: 70 },
  'Transformers': { category: 'GenAI & LLMs', size: 60 },
  'LangChain': { category: 'GenAI & LLMs', size: 55 },
  'LlamaIndex': { category: 'GenAI & LLMs', size: 50 },
  'Hugging Face': { category: 'GenAI & LLMs', size: 55 },
  'RAG': { category: 'GenAI & LLMs', size: 60 },
  'LoRA': { category: 'GenAI & LLMs', size: 50 },
  'PEFT': { category: 'GenAI & LLMs', size: 50 },
  'GPT': { category: 'GenAI & LLMs', size: 50 },
  'BERT': { category: 'GenAI & LLMs', size: 50 },
  'LLaMA': { category: 'GenAI & LLMs', size: 50 },
  'RLHF': { category: 'GenAI & LLMs', size: 50 },
  'vLLM': { category: 'GenAI & LLMs', size: 45 },
  'Prompt Engineering': { category: 'GenAI & LLMs', size: 50 },
  'Agentic AI': { category: 'GenAI & LLMs', size: 55 },
  'AutoGPT': { category: 'GenAI & LLMs', size: 40 },
  'Semantic Search': { category: 'GenAI & LLMs', size: 45 },
  'OpenAI API': { category: 'GenAI & LLMs', size: 50 },
  'Claude API': { category: 'GenAI & LLMs', size: 45 },
  
  // MLOps & Cloud
  'Docker': { category: 'MLOps & Cloud', size: 55 },
  'Kubernetes': { category: 'MLOps & Cloud', size: 50 },
  'MLflow': { category: 'MLOps & Cloud', size: 50 },
  'DVC': { category: 'MLOps & Cloud', size: 45 },
  'Airflow': { category: 'MLOps & Cloud', size: 45 },
  'Ray': { category: 'MLOps & Cloud', size: 40 },
  'AWS': { category: 'MLOps & Cloud', size: 50 },
  'GCP': { category: 'MLOps & Cloud', size: 45 },
  'Azure': { category: 'MLOps & Cloud', size: 40 },
  'CI/CD': { category: 'MLOps & Cloud', size: 45 },
  'Terraform': { category: 'MLOps & Cloud', size: 40 },
  'Prometheus': { category: 'MLOps & Cloud', size: 40 },
  'Grafana': { category: 'MLOps & Cloud', size: 40 },

  // Data & Vector DBs
  'Data Analytics': { category: 'Data & Vector DBs', size: 65 }, // Added
  'Pinecone': { category: 'Data & Vector DBs', size: 50 },
  'ChromaDB': { category: 'Data & Vector DBs', size: 50 },
  'FAISS': { category: 'Data & Vector DBs', size: 45 },
  'Weaviate': { category: 'Data & Vector DBs', size: 40 },
  'Milvus': { category: 'Data & Vector DBs', size: 40 },
  'PostgreSQL': { category: 'Data & Vector DBs', size: 45 },
  'Elasticsearch': { category: 'Data & Vector DBs', size: 45 },
  'Apache Spark': { category: 'Data & Vector DBs', size: 45 },
  'Kafka': { category: 'Data & Vector DBs', size: 40 },
  'Hadoop': { category: 'Data & Vector DBs', size: 35 },
};

interface Node extends d3.SimulationNodeDatum {
  id: string;
  radius: number;
  category: string;
  targetRadius: number;
}

export default function SkillPhysicsMatrix() {
  const [activeCategory, setActiveCategory] = useState('All Nodes');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number, y: number } | null>(null);
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const simulationRef = useRef<d3.Simulation<Node, undefined> | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const hoveredNodeRef = useRef<string | null>(null); // For canvas loop access

  useEffect(() => {
    // Initialize nodes from portfolioData tech stacks
    const allSkillsSet = new Set<string>();
    portfolioData.projects.forEach(p => p.tech.forEach(t => allSkillsSet.add(t)));
    
    // Add some core skills that might not be explicitly in project tech stacks but are important
    ['Python', 'C++', 'TensorFlow', 'Data Analytics', 'Large Language Models (LLM)'].forEach(s => allSkillsSet.add(s));

    const allSkills = Array.from(allSkillsSet);
    
    nodesRef.current = allSkills.map(skill => {
      const mapping = SKILL_MAPPING[skill] || { category: 'Other', size: 30 };
      return {
        id: skill,
        radius: mapping.size,
        targetRadius: mapping.size,
        category: mapping.category,
        x: Math.random() * 800,
        y: Math.random() * 600,
      };
    });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = containerRef.current?.clientWidth || window.innerWidth;
    let height = 600;
    
    if (containerRef.current) {
      setContainerRect(containerRef.current.getBoundingClientRect());
    }
    
    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    const simulation = d3.forceSimulation<Node>(nodesRef.current)
      .force('charge', d3.forceManyBody().strength(5))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius((d: any) => d.radius + 2).iterations(2))
      .on('tick', ticked);

    simulationRef.current = simulation;

    function ticked() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      nodesRef.current.forEach(node => {
        // Smoothly animate radius
        node.radius += (node.targetRadius - node.radius) * 0.1;

        if (node.radius < 1) return; // Don't draw if invisible

        ctx.beginPath();
        ctx.arc(node.x!, node.y!, node.radius, 0, 2 * Math.PI);
        
        // Styling based on hover state
        const isHovered = hoveredNodeRef.current === node.id;
        const isDimmed = hoveredNodeRef.current !== null && hoveredNodeRef.current !== node.id;
        
        ctx.fillStyle = isHovered ? 'rgba(0, 240, 255, 0.3)' : `rgba(0, 240, 255, ${isDimmed ? 0.05 : 0.1})`;
        ctx.fill();
        ctx.strokeStyle = isHovered ? 'rgba(0, 240, 255, 1)' : `rgba(0, 240, 255, ${isDimmed ? 0.2 : 0.5})`;
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.stroke();

        // Text
        ctx.fillStyle = isDimmed ? 'rgba(255, 255, 255, 0.2)' : '#ffffff';
        ctx.font = `${isHovered ? '800' : '600'} ${Math.max(10, node.radius / 3)}px 'JetBrains Mono'`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Only draw text if bubble is large enough
        if (node.radius > 15) {
          const text = node.id.length > 10 && node.radius < 30 ? node.id.substring(0, 8) + '..' : node.id;
          ctx.fillText(text, node.x!, node.y!);
        }
      });
    }

    // Interaction
    let isDragging = false;
    let dragNode: Node | null = null;

    const getMousePos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const pos = getMousePos(e);
      
      if (isDragging && dragNode) {
        dragNode.fx = pos.x;
        dragNode.fy = pos.y;
        return;
      }

      // Find hovered node
      const hovered = simulation.find(pos.x, pos.y, 50);
      
      // Check if mouse is actually inside the node's radius
      if (hovered) {
        const dx = pos.x - hovered.x!;
        const dy = pos.y - hovered.y!;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance <= hovered.radius) {
          if (hoveredNodeRef.current !== hovered.id) {
            hoveredNodeRef.current = hovered.id;
            setHoveredNodeId(hovered.id);
            // Restart simulation slightly to trigger redraw
            simulation.alpha(0.05).restart();
          }
          setHoverPos({ x: pos.x, y: pos.y });
          canvas.style.cursor = 'pointer';
        } else {
          clearHover();
        }
      } else {
        clearHover();
      }
    };

    const clearHover = () => {
      if (hoveredNodeRef.current !== null) {
        hoveredNodeRef.current = null;
        setHoveredNodeId(null);
        setHoverPos(null);
        canvas.style.cursor = 'grab';
        simulation.alpha(0.05).restart();
      }
    };

    const dragStarted = (e: MouseEvent | TouchEvent) => {
      const pos = getMousePos(e);
      dragNode = simulation.find(pos.x, pos.y, 50) || null;
      if (dragNode) {
        isDragging = true;
        simulation.alphaTarget(0.3).restart();
        dragNode.fx = dragNode.x;
        dragNode.fy = dragNode.y;
        canvas.style.cursor = 'grabbing';
      }
    };

    const dragEnded = () => {
      if (!isDragging || !dragNode) return;
      isDragging = false;
      simulation.alphaTarget(0);
      dragNode.fx = null;
      dragNode.fy = null;
      dragNode = null;
      canvas.style.cursor = 'grab';
    };

    canvas.addEventListener('mousedown', dragStarted);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', dragEnded);
    canvas.addEventListener('mouseleave', () => {
      dragEnded();
      clearHover();
    });
    
    canvas.addEventListener('touchstart', dragStarted, { passive: true });
    canvas.addEventListener('touchmove', (e) => {
      if (isDragging && dragNode) {
        const pos = getMousePos(e);
        dragNode.fx = pos.x;
        dragNode.fy = pos.y;
      }
    }, { passive: true });
    canvas.addEventListener('touchend', dragEnded);

    const handleResize = () => {
      width = containerRef.current?.clientWidth || window.innerWidth;
      if (containerRef.current) {
        setContainerRect(containerRef.current.getBoundingClientRect());
      }
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      simulation.force('center', d3.forceCenter(width / 2, height / 2));
      simulation.alpha(1).restart();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      simulation.stop();
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', dragStarted);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', dragEnded);
      canvas.removeEventListener('mouseleave', dragEnded);
      canvas.removeEventListener('touchstart', dragStarted);
      canvas.removeEventListener('touchmove', dragEnded);
      canvas.removeEventListener('touchend', dragEnded);
    };
  }, []);

  // Update node targets when category changes
  useEffect(() => {
    if (!simulationRef.current) return;
    
    nodesRef.current.forEach(node => {
      const mapping = SKILL_MAPPING[node.id] || { category: 'Other', size: 30 };
      if (activeCategory === 'All Nodes' || node.category === activeCategory) {
        node.targetRadius = mapping.size;
      } else {
        node.targetRadius = 0; // Deflate
      }
    });

    simulationRef.current.force('collision', d3.forceCollide().radius((d: any) => d.targetRadius + 2).iterations(2));
    simulationRef.current.alpha(0.5).restart();
  }, [activeCategory]);

  return (
    <section id="skills" className="py-32 px-6 relative z-10">
      <div className="max-w-6xl mx-auto" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight font-mono uppercase">
            <span className="text-cyan-400">/</span> Physics-Driven Node Matrix
          </h2>
        </motion.div>

        {/* Categorical Dock */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap justify-center gap-2 p-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-mono transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-cyan-400/20 text-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.2)]' 
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Canvas Container */}
        <div className="w-full h-[600px] glass-refraction rounded-3xl overflow-hidden relative border border-white/10 chromatic-box-hover">
          <div className="absolute top-4 left-4 text-xs font-mono text-white/30 uppercase tracking-widest pointer-events-none z-10">
            Interactive Physics Environment
          </div>
          <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing absolute inset-0 z-0" />
          
          {/* Hover Context Engine Overlay */}
          <AnimatePresence>
            {hoveredNodeId && hoverPos && (
              <HoverContextEngine 
                skillId={hoveredNodeId} 
                position={hoverPos} 
                containerRect={containerRect} 
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
