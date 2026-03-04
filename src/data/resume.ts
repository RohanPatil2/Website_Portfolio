export const resumeData = {
  basics: {
    name: "Rohan Upendra Patil",
    title: "AI Engineer | Architecting Reliable RAG Pipelines & AI Agents",
    summary: "I am a Computer Science Master’s student focused on engineering autonomous systems—from underwater vehicles to intelligent software agents. My core expertise lies in bridging the gap between theoretical models and reliable, real-world deployment. Currently, as a Graduate Research Assistant, I specialize in Reinforcement Learning (SAC/TD3) for marine robotics, where I design parallel dynamics simulators and optimize sim-to-real policy deployment for Autonomous Underwater Vehicles (AUVs). This work has instilled in me a rigorous approach to state management, decision latency, and system reliability. I am now applying this engineering mindset to Generative AI and Agentic RAG Systems. I focus on building AI workflows that go beyond simple chatbots—architecting systems that can reason, verify facts, and execute complex tasks with minimal hallucination. whether it's optimizing a control policy or fine-tuning an LLM pipeline, I am a builder who loves solving the 'last mile' problems in AI.",
    location: "Binghamton, New York, United States",
    email: "rpatil4@binghamton.edu",
    phone: "(607)-774-7979",
    links: [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/rohanpatil7979" },
      { name: "Github", url: "https://github.com" }
    ]
  },
  experience: [
    {
      company: "Marine Robotics Lab | Binghamton University",
      role: "Research Assistant",
      dates: "Jun 2025 – Present",
      location: "Binghamton, NY",
      bullets: [
        "Architected SAC/TD3 deep RL controllers for 6-DOF thruster-vectored AUVs, achieving stable trajectory tracking in ROS2 Humble",
        "Developed a parallelized Gazebo simulation with domain randomization on currents, sensor noise, and thruster dynamics, enabling robust sim-to-real transfer",
        "Optimized particle filter to achieve 10Hz update rates via PyTorch vectorization, supporting real-time underwater navigation",
        "Designed experimental protocols with Prof. Monika Roznere, establishing PID baselines and reward shaping across six motion primitives",
        "Implemented custom ROS2 action servers for sequential waypoint navigation, cutting autonomy stack integration complexity by 40%",
        "Trained continuous-space Deep Reinforcement Learning models to improve decision-making capabilities.",
        "Created simulation environments that facilitated large-scale data generation, enhancing model training efficiency.",
        "Focused on optimising policy alignment to ensure effective real-world application and generalisation."
      ]
    },
    {
      company: "School of Computing | Binghamton University",
      role: "Graduate Assistant",
      dates: "Sep 2024 – May 2025",
      location: "Binghamton, NY",
      bullets: [
        "Developed three bias mitigation techniques for BERT/GPT-2, reducing gender bias on WinoBias by 34% while maintaining 97% accuracy",
        "Engineered a counterfactual data augmentation pipeline processing 50,000+ examples via template transformation and GPT-3.5 synthesis",
        "Designed projection-based debiasing with SVD to remove gender subspace from embeddings, validated on StereoSet benchmark",
        "Developed an automated evaluation framework, measuring eight fairness metrics across WinoBias, HolisticBias, and RealToxicityPrompts",
        "Established reproducible pipelines with W&B tracking, enabling systematic comparison across twelve debiasing configurations",
        "Authored a technical report detailing fairness-accuracy tradeoffs and optimal configurations for production LLM deployment"
      ]
    },
    {
      company: "One Club Cloud",
      role: "Full-Stack Developer Intern / Web Developer",
      dates: "Dec 2022 - May 2023",
      location: "Pune (Remote) / Maharashtra, India",
      bullets: [
        "Developed a responsive multi-page website with Bootstrap 5 and JavaScript, ensuring cross-browser compatibility on Chrome and Firefox",
        "Reduced page load time from 4.2s to 2.5s using lazy loading, WebP image optimisation, and CSS/JS minification.",
        "Implemented Schema.org structured data and meta optimisation, moving Google ranking from page 3 to page 1 for five keywords",
        "Integrated Google Analytics and heatmap tracking to identify engagement patterns, boosting session duration by 22%",
        "During my internship in Web Development at One Club Cloud from December 15, 2022, to February 20, 2023, I worked on developing and deploying a dynamic, responsive website for a dental clinic.",
        "Designed features such as appointment scheduling, patient information management, and an interactive user interface to enhance engagement.",
        "Collaborated closely with a U.S.-based client, implementing real-time updates and changes to meet their requirements seamlessly.",
        "Successfully deployed the website on Google-hosted domains, ensuring reliable and efficient access for end-users."
      ]
    },
    {
      company: "PrepInsta",
      role: "Growth Manager",
      dates: "June 2023 - April 2024",
      location: "Pune, Maharashtra, India",
      bullets: [
        "Played a pivotal role in driving user engagement, expanding brand visibility, and executing strategies that supported PrepInsta’s mission to empower students with essential career resources.",
        "Analyzed user data and market trends to identify growth opportunities and designing targeted campaigns that increased user acquisition and retention.",
        "Collaborated with cross-functional teams, including product development and marketing, to optimize our offerings and ensure alignment with the company’s strategic objectives."
      ]
    },
    {
      company: "Edu-versity",
      role: "Full Stack Web Development Intern",
      dates: "June 2023 - September 2023",
      location: "Pune, Maharashtra, India",
      bullets: [
        "Successfully completed an internship program in Full Stack Web Development, where I worked on developing a dynamic and responsive gym management website.",
        "Designed a user-friendly interface using HTML, CSS, and JavaScript to provide a seamless experience for gym members and administrators.",
        "Utilized Node.js and MongoDB to implement features such as member registration, workout scheduling, and payment tracking.",
        "Collaborated with the team to integrate front-end and back-end components, ensuring smooth data flow and functionality.",
        "Worked on debugging and optimizing the website for performance and scalability."
      ]
    },
    {
      company: "CodeClause",
      role: "Web Developer Intern",
      dates: "January 2023 - May 2023",
      location: "Pune, Maharashtra, India",
      bullets: [
        "Responsible for developing responsive, user-centered web applications, gaining hands-on experience across both front-end and back-end technologies.",
        "Involved in the full development lifecycle, from coding to testing, delivering high-quality solutions that met client needs.",
        "Applied modern tools and frameworks to enhance functionality, stay aligned with industry best practices, and improve the user experience.",
        "Collaborated closely with cross-functional teams, aligning goals with organizational objectives and refining ability to work within a diverse team environment."
      ]
    },
    {
      company: "Bowled.io",
      role: "Game Tester",
      dates: "November 2022 - November 2022",
      location: "Pune, Maharashtra, India",
      bullets: [
        "Completed a 1-month Game Testing Internship at Bowled.io, where I displayed outstanding competence and dedication.",
        "Contributed by finding/reporting bugs, suggesting creative game ideas & consistently offering valuable feedback that helped improve game quality."
      ]
    }
  ],
  achievements: [
    {
      title: "Reduced inference latency by 40%",
      context: "Fine-tuned LLaMA-3.1-8B with LoRA for medical Q&A"
    },
    {
      title: "Achieved 99% uptime",
      context: "Across 1000+ test queries with automatic fallback mechanisms for retrieval failures"
    },
    {
      title: "Reduced per-scene time from 8 hours to 5.5 hours",
      context: "Optimised NeRF training with hierarchical sampling and early ray termination"
    },
    {
      title: "Improved reconstruction quality from PSNR 28.3 dB to 31.7 dB",
      context: "Integrated ViT-B/16 encoder for multi-view features"
    },
    {
      title: "Boosted stock price prediction accuracy by 20%",
      context: "Fine-tuning a custom financial BERT model on real-time Twitter sentiment data"
    },
    {
      title: "Improved forecasting precision by 15%",
      context: "Deploying GANs to simulate and train on diverse financial edge-case scenarios"
    },
    {
      title: "Reduced gender bias on WinoBias by 34%",
      context: "While maintaining 97% accuracy using bias mitigation techniques for BERT/GPT-2"
    },
    {
      title: "Reduced page load time from 4.2s to 2.5s",
      context: "Using lazy loading, WebP image optimisation, and CSS/JS minification"
    },
    {
      title: "Moved Google ranking from page 3 to page 1",
      context: "For five keywords by implementing Schema.org structured data and meta optimisation"
    },
    {
      title: "Boosted session duration by 22%",
      context: "Integrated Google Analytics and heatmap tracking to identify engagement patterns"
    }
  ],
  projects: [
    {
      title: "FluxForge MLOps Pipeline",
      stack: "DVC, MLflow, Airflow, FastAPI, Docker, Prometheus, GitHub Actions, CML",
      bullets: [
        "Built an end-to-end MLOps pipeline for tabular regression on 500,000+ rows, integrating DVC versioning and MLflow tracking across fifty runs",
        "Automated retraining with Airflow DAGs orchestrating validation, feature engineering, training, and deployment on six-hour cycles",
        "Deployed FastAPI endpoint with Docker, implementing health checks, logging, and Prometheus metrics to achieve 99.5% uptime",
        "Designed drift detection with Kolmogorov-Smirnov tests on feature distributions, triggering retraining at threshold breach",
        "Implemented CI/CD with GitHub Actions and CML for automated testing, performance validation, and staging-to-production deployment"
      ],
      links: []
    },
    {
      title: "Agentic RAG Medical Assistant",
      stack: "LLaMA-3.1-8B, LoRA, ChromaDB, FastAPI",
      bullets: [
        "Fine-tuned LLaMA-3.1-8B with LoRA for medical Q&A, reducing inference latency by 40% through ChromaDB vector retrieval",
        "Integrated 5 medical datasets with FastAPI backend, implementing context-aware query routing and source attribution",
        "Achieved 99% uptime across 1000+ test queries with automatic fallback mechanisms for retrieval failures"
      ],
      links: []
    },
    {
      title: "NeuralLift-360: 3D Object Reconstruction",
      stack: "NeRF, ViT-B/16, instant-NGP, latent diffusion, Git",
      bullets: [
        "Optimised NeRF training with hierarchical sampling and early ray termination, reducing per-scene time from 8 hours to 5.5 hours",
        "Integrated ViT-B/16 encoder for multi-view features, improving reconstruction quality from PSNR 28.3 dB to 31.7 dB on complex scenes",
        "Designed a two-stage pipeline combining instant-NGP for geometry and latent diffusion for texture, achieving 15 FPS on RTX 3060",
        "Implemented adaptive resolution scaling from 128³ to 512³ voxel grids during training, balancing memory with reconstruction detail",
        "Coordinated a 2-developer team using Git workflows and code reviews, catching 20+ edge cases before deployment"
      ],
      links: []
    },
    {
      title: "Stock Price Prediction using BERT",
      stack: "BERT, GANs, NLP",
      bullets: [
        "Boosted stock price prediction accuracy by 20% by fine-tuning a custom financial BERT model on real-time Twitter sentiment data",
        "Improved forecasting precision during market volatility by 15% by deploying GANs to simulate and train on diverse financial edge-case scenarios",
        "Scaled NLP analytics pipelines for massive financial datasets by collaborating cross-functionally to integrate state-of-the-art transformer architectures"
      ],
      links: []
    }
  ],
  skills: [
    {
      group: "Languages",
      items: ["Python", "C++", "CUDA", "SQL", "JavaScript", "TypeScript", "Go", "Rust", "Bash"]
    },
    {
      group: "Core ML & Deep Learning",
      items: ["PyTorch", "TensorFlow", "Keras", "scikit-learn", "XGBoost", "LightGBM", "OpenCV", "JAX", "ONNX", "TensorRT"]
    },
    {
      group: "GenAI & LLMs",
      items: ["Transformers", "LangChain", "LlamaIndex", "Hugging Face", "RAG", "LoRA/QLoRA", "vLLM", "Prompt Engineering", "Agentic AI", "AutoGPT", "Semantic Search", "OpenAI API", "Claude API"]
    },
    {
      group: "MLOps & Cloud",
      items: ["Docker", "Kubernetes", "MLflow", "DVC", "Airflow", "Ray", "AWS", "GCP", "Azure", "CI/CD", "Terraform", "Prometheus", "Grafana"]
    },
    {
      group: "Data & Vector DBs",
      items: ["Pinecone", "ChromaDB", "FAISS", "Weaviate", "Milvus", "PostgreSQL", "Elasticsearch", "Apache Spark", "Kafka", "Hadoop"]
    }
  ],
  education: [
    {
      institution: "State University of New York Binghamton, Thomas J. Watson College of Engineering and Applied Science",
      degree: "Master of Science in Computer Science, Machine Learning and Artificial Intelligence",
      dates: "August 2024 - May 2026",
      gpa: "3.8/4.00"
    },
    {
      institution: "Savitribai Phule Pune University",
      degree: "Bachelor's degree, Computer Engineering",
      dates: "July 2020 - May 2024"
    }
  ],
  certifications: [
    "Advanced Machine Learning",
    "Certificate of Participation in Hackathon of Online Hackathon Festival (OHF) Season 3",
    "Engineer Data in Google Cloud"
  ],
  awards: [],
  extra: [
    {
      type: "Publications",
      items: [
        "Enhancing Stock Market Predictions with Heuristic Analysis",
        "Predicting Credit Card Defaults with Machine Learning",
        "Unveiling Insights: Analyzing Amazon Fine Food Reviews with Machine Learning",
        "Leveraging BERT for Enhanced Stock Market Prediction: A Comprehensive Review"
      ]
    },
    {
      type: "Patents",
      items: [
        "Machine Learning-Based Power Quality Enhancement System"
      ]
    },
    {
      type: "Leadership & Extracurricular",
      items: [
        "Student Supervisor | Binghamton, New York, USA | May 2025 - Aug 2025",
        "Data Algorithms Teaching Assistant | Pune, India | May 2023 - May 2024",
        "Artificial Intelligence Teaching Assistant | Pune, India | May 2022 - May 2023",
        "Materials Research Society at Binghamton University, Student Member | January 2025 - Present"
      ]
    }
  ]
};
