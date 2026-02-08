export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  category: "genai" | "computer-vision" | "mlops" | "classical-ml";
  period: string;
  metrics: ProjectMetric[];
  technologies: string[];
  featured: boolean;
  githubUrl?: string;
  highlights: string[];
  demoType: "chart" | "flow" | "chat" | "none";
}

export const projects: Project[] = [
  {
    id: "genai-schema-translation",
    title: "Multi-Tenant GenAI Schema Translation Agent",
    shortDescription:
      "Converts natural-language requests to canonical SQL then tenant-specific SQL across 6+ heterogeneous schemas",
    category: "genai",
    period: "Oct 2025 – Nov 2025",
    metrics: [
      { value: "98%", label: "Successful Execution" },
      { value: "95%", label: "Latency Reduction" },
      { value: "6+", label: "Schemas Supported" },
    ],
    technologies: ["GPT-4o", "DSPy", "LangChain", "PostgreSQL", "Python"],
    featured: true,
    highlights: [
      "Self-correcting validation loop with schema-aware column extraction and retry/regeneration",
      "Deterministic field-mapping cache + fast-path rewrites for 95% latency reduction",
      "Prevents hallucinated columns/joins from reaching execution",
    ],
    demoType: "flow",
  },
  {
    id: "rag-document-discovery",
    title: "Multimodal RAG Document Discovery",
    shortDescription:
      "Enterprise RAG system for natural-language discovery across 1,000+ documents with 95% first-query resolution",
    category: "genai",
    period: "2024",
    metrics: [
      { value: "95%", label: "First-Query Resolution" },
      { value: "40%", label: "Discovery Time Reduced" },
      { value: "1000+", label: "Documents Indexed" },
    ],
    technologies: ["pgvector", "LangChain", "OpenAI", "PostgreSQL", "Python"],
    featured: true,
    highlights: [
      "Gold-question set for tracking retrieval success",
      "Multimodal embeddings for documents with mixed content",
      "Deployed across 10+ teams at enterprise scale",
    ],
    demoType: "chat",
  },
  {
    id: "anomaly-detection-npds",
    title: "Statistical Anomaly Detection Pipeline",
    shortDescription:
      "Detects emerging substance signals 3 weeks early from 9M+ NPDS poison control records",
    category: "mlops",
    period: "2024",
    metrics: [
      { value: "9M+", label: "Records Processed" },
      { value: "3 weeks", label: "Early Signal Detection" },
      { value: "3x", label: "Seasonality Patterns" },
    ],
    technologies: ["AWS SageMaker", "Python", "statsmodels", "Pandas", "NumPy"],
    featured: false,
    highlights: [
      "Models daily/weekly/monthly seasonality baselines",
      "Flags emerging substance signals vs traditional surveillance",
      "Deployed on AWS SageMaker at scale",
    ],
    demoType: "chart",
  },
  {
    id: "genealogy-document-extraction",
    title: "Document Field Detection & Extraction",
    shortDescription:
      "Faster R-CNN pipeline for key entity localization in 2M+ historical genealogy records",
    category: "computer-vision",
    period: "2024",
    metrics: [
      { value: "~90%", label: "Bounding-Box Accuracy" },
      { value: "40%", label: "Manual Review Reduced" },
      { value: "2M+", label: "Records Processed" },
    ],
    technologies: ["Faster R-CNN", "Detectron2", "Python", "OpenCV", "PyTorch"],
    featured: false,
    highlights: [
      "Productized reusable framework for archival digitization",
      "40% reduction in delivery time for similar projects",
      "Custom training data pipeline for historical documents",
    ],
    demoType: "none",
  },
  {
    id: "high-entropy-alloys",
    title: "High Entropy Alloys Property Prediction",
    shortDescription:
      "ML model predicting mechanical properties of high entropy alloys with R² = 0.931",
    category: "classical-ml",
    period: "Aug 2021 – May 2023",
    metrics: [
      { value: "0.931", label: "R² Score" },
      { value: "0.029", label: "RMSLE" },
      { value: "30%", label: "Faster Development" },
    ],
    technologies: [
      "scikit-learn",
      "XGBoost",
      "Ensemble Methods",
      "Python",
      "Pandas",
    ],
    featured: false,
    highlights: [
      "Extensive data collection, cleaning, and visualization",
      "Ensemble methods for hardness prediction",
      "Potentially reducing R&D costs by 20%",
    ],
    demoType: "chart",
  },
];
