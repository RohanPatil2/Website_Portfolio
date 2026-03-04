export interface Project {
  id: string;
  title: string;
  date: string;
  tech: string[];
  impact: string;
  details: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  details?: string;
  isMajor: boolean;
}

export interface Publication {
  id: string;
  title: string;
  publisher: string;
  date: string;
  abstract: string;
}

export interface OrganizationRole {
  id: string;
  organization: string;
  role: string;
  date: string;
  description: string;
  isHighPrestige: boolean;
}

export interface PortfolioData {
  projects: Project[];
  certifications: Certification[];
  hackathons: string[];
  publications: Publication[];
  organizations: OrganizationRole[];
}

export const portfolioData: PortfolioData = {
  projects: [
    {
      id: "fluxforge",
      title: "FluxForge MLOps Pipeline",
      date: "Aug 2025–Dec 2025",
      tech: ["LLMs", "DVC", "MLflow", "Airflow", "FastAPI", "Docker", "Prometheus"],
      impact: "Tabular regression on 500k+ rows, 99.5% uptime, KS drift detection.",
      details: [
        "Engineered a robust MLOps pipeline for tabular regression tasks.",
        "Processed over 500k+ rows of data efficiently.",
        "Achieved 99.5% system uptime.",
        "Implemented Kolmogorov-Smirnov (KS) drift detection to monitor model performance."
      ]
    },
    {
      id: "bias-detection",
      title: "Bias Detection in LLMs on Climate Change",
      date: "Jan 2025–May 2025",
      tech: ["LoRA", "PEFT", "GPT", "BERT", "LLaMA", "LangChain", "ChromaDB", "IBM AI Fairness 360", "RLHF"],
      impact: "Fine-tuned LLMs on conflicting corpora, evaluated factual neutrality and semantic drift.",
      details: [
        "Fine-tuned Large Language Models on conflicting climate change corpora.",
        "Evaluated factual neutrality and semantic drift across generated outputs.",
        "Utilized RLHF (Reinforcement Learning from Human Feedback) to align model responses.",
        "Leveraged IBM AI Fairness 360 to quantify and mitigate bias."
      ]
    },
    {
      id: "agentic-rag",
      title: "Agentic RAG Medical Assistant",
      date: "Dec 2024–Feb 2025",
      tech: ["LLaMA-3.1-8B", "RAG", "FastAPI", "LangChain", "ChromaDB"],
      impact: "Boosted response efficiency by 40%, integrated 5 datasets with minimal downtime.",
      details: [
        "Developed an Agentic Retrieval-Augmented Generation (RAG) system for medical assistance.",
        "Boosted response efficiency by 40%.",
        "Successfully integrated 5 distinct medical datasets.",
        "Maintained minimal downtime during deployment and updates."
      ]
    },
    {
      id: "neurallift-360",
      title: "NeuralLift-360",
      date: "Sep 2024–Dec 2024",
      tech: ["PyTorch", "TensorFlow"],
      impact: "2D to 3D 360° views, multimodal inputs (depth/semantic), model pruning/quantization, sub-network for occlusion handling.",
      details: [
        "Generated 3D 360° views from 2D images.",
        "Processed multimodal inputs including depth and semantic data.",
        "Applied model pruning and quantization techniques for optimization.",
        "Designed a specialized sub-network for occlusion handling."
      ]
    },
    {
      id: "neural-execution",
      title: "Neural Execution Engines",
      date: "Sep 2024–Oct 2024",
      tech: ["PyTorch", "TensorFlow", "Algorithm Optimization"],
      impact: "Executing structured subroutines, memory-augmented networks, cross-domain applications.",
      details: [
        "Developed engines capable of executing structured subroutines.",
        "Implemented memory-augmented neural networks.",
        "Explored cross-domain applications for the execution engines."
      ]
    },
    {
      id: "bert-sentiment",
      title: "BERT for News Sentiment Analysis & Stock Price Prediction",
      date: "May 2023–Mar 2024",
      tech: ["AI", "JavaScript", "AWS", "GANs"],
      impact: "Real-time Twitter API streams, synthetic market scenarios via GANs, deployed on AWS.",
      details: [
        "Analyzed real-time Twitter API streams for sentiment analysis.",
        "Generated synthetic market scenarios using Generative Adversarial Networks (GANs).",
        "Deployed the complete prediction pipeline on AWS infrastructure."
      ]
    },
    {
      id: "ai-shopping",
      title: "AI-Driven Shopping Companion",
      date: "Jun 2023–Nov 2023",
      tech: ["MERN Stack", "OpenAI"],
      impact: "Hyper-personalized recommendations.",
      details: [
        "Built a full-stack MERN application integrated with OpenAI.",
        "Provided hyper-personalized product recommendations to users."
      ]
    },
    {
      id: "hospital-management",
      title: "Hospital Management System",
      date: "Jan 2023–May 2023",
      tech: ["JS", "Bootstrap", "MySQL", "Node.js"],
      impact: "Patient data, billing, scheduling.",
      details: [
        "Developed a comprehensive system for managing patient data.",
        "Implemented modules for billing and appointment scheduling."
      ]
    }
  ],
  certifications: [
    { id: "c1", title: "Google Advanced Data Analytics", issuer: "Google", date: "Dec 2024", details: "7 courses, regression, ML, predictive modeling.", isMajor: true },
    { id: "c2", title: "Machine Learning", issuer: "Stanford Online", date: "Sep 2023", isMajor: true },
    { id: "c3", title: "Intro to TensorFlow for AI, ML, DL", issuer: "DeepLearning.AI", date: "Sep 2023", isMajor: true },
    { id: "c4", title: "Google Business Intelligence", issuer: "Google", date: "Jan 2025", isMajor: true },
    { id: "c5", title: "Advanced Machine Learning", issuer: "Binghamton Univ", date: "Jan 2025", isMajor: true },
    { id: "c6", title: "Intro to Energy Storage", issuer: "Badgr", date: "Feb 2025", isMajor: false },
    { id: "c7", title: "Google AI Essentials", issuer: "Google", date: "Nov 2024", isMajor: false },
    { id: "c8", title: "Electronic Arts Software Engineering Job Sim", issuer: "Forage", date: "Dec 2024", isMajor: false },
    { id: "c9", title: "Data Analytics and Visualization Virtual", issuer: "Accenture", date: "Dec 2022", isMajor: false },
    { id: "c10", title: "Google Cloud Skills Boost", issuer: "Google", date: "Oct 2021", details: "Engineer Data, BigQuery, Explainable AI, Kubernetes, Network Security, ML APIs, Foundational Infrastructure.", isMajor: false }
  ],
  hackathons: [
    "Unstop OHF Season 3 (x8)",
    "HackRx 4.0",
    "Uber HackTag 2.0",
    "NAVDHARA 2021",
    "Treasure Hunt DSC RCOEM",
    "VJTI Technovanza",
    "Skillyst Techtopia"
  ],
  publications: [
    {
      id: "p1",
      title: "Enhancing Stock Market Predictions with Heuristic Analysis",
      publisher: "IJRASET",
      date: "Nov 2023",
      abstract: "This paper explores the integration of heuristic analysis techniques to improve the accuracy and reliability of stock market prediction models, offering new insights into market trends."
    },
    {
      id: "p2",
      title: "Predicting Credit Card Defaults with Machine Learning",
      publisher: "IJRASET",
      date: "Nov 2023",
      abstract: "A comprehensive study on utilizing various machine learning algorithms to accurately predict credit card defaults, aiming to minimize financial risks for institutions."
    },
    {
      id: "p3",
      title: "Unveiling Insights: Analyzing Amazon Fine Food Reviews with Machine Learning",
      publisher: "IJRASET",
      date: "Oct 2023",
      abstract: "An in-depth sentiment analysis and topic modeling of Amazon Fine Food Reviews using natural language processing and machine learning to extract consumer insights."
    },
    {
      id: "p4",
      title: "Leveraging BERT for Enhanced Stock Market Prediction: A Comprehensive Review",
      publisher: "IJNRD",
      date: "Nov 2023",
      abstract: "This review paper examines the application of Bidirectional Encoder Representations from Transformers (BERT) in analyzing financial news sentiment for stock market forecasting."
    }
  ],
  organizations: [
    {
      id: "o1",
      organization: "Shivdarpan Magazine",
      role: "Editor-in-Chief",
      date: "Jun 2022–May 2024",
      description: "Led team of 10, produced 210-page magazine in 4 sections, won 1st place at district level.",
      isHighPrestige: true
    },
    {
      id: "o2",
      organization: "Navjeevan Foundation NGO",
      role: "Teaching Volunteer",
      date: "May 2023–Aug 2023",
      description: "Mentored underprivileged rural children, sharing insights on resilience and overcoming adversity.",
      isHighPrestige: true
    },
    {
      id: "o3",
      organization: "Código Madrid Club",
      role: "Core Technical Member",
      date: "Aug 2021–May 2024",
      description: "Conducted hands-on AI/ML training (May 2023) and C++ Competitive Coding training (May 2023).",
      isHighPrestige: false
    },
    {
      id: "o4",
      organization: "Shivanjali Annual Event",
      role: "Decoration Team Head",
      date: "Dec 2022–Mar 2023",
      description: "Project management and creative leadership.",
      isHighPrestige: false
    },
    {
      id: "o5",
      organization: "Entrepreneur's Club",
      role: "Technical Member",
      date: "Jun 2021–Jul 2022",
      description: "Supported startup-oriented technical projects.",
      isHighPrestige: false
    }
  ]
};
