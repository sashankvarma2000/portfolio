export interface Metric {
  value: string;
  label: string;
  context?: string;
}

export interface Experience {
  id: string;
  company: string;
  location: string;
  role: string;
  startDate: string;
  endDate: string;
  type: "full-time" | "internship";
  description: string;
  responsibilities: string[];
  metrics: Metric[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    id: "htc-ml-engineer",
    company: "HTC Global Services",
    location: "Remote",
    role: "Machine Learning Engineer",
    startDate: "Jan 2024",
    endDate: "Present",
    type: "full-time",
    description:
      "Leading development of enterprise GenAI solutions and production ML systems across multiple verticals.",
    responsibilities: [
      "Designed and validated a multimodal RAG system (pgvector + LangChain) for natural-language document discovery across 1,000+ documents, achieving 95% first-query resolution",
      "Architected a GenAI call-center QA auditor (WhisperX + GPT-4o + DSPy) with human-in-the-loop scoring, scaled to 10K+ calls/month",
      "Developed a statistical anomaly detection pipeline for NPDS poison control data on 9M+ records in AWS SageMaker",
      "Led development of a custom document field-detection and extraction pipeline for 2M+ historical genealogy records using Faster R-CNN",
      "Mentored 3 interns on evaluation design and reproducible experimentation",
    ],
    metrics: [
      { value: "95%", label: "First-Query Resolution", context: "RAG system" },
      { value: "40%", label: "Discovery Time Reduction", context: "across 10+ teams" },
      {
        value: "$100K/yr",
        label: "QA Cost Savings",
        context: "call-center auditor",
      },
      { value: "~0.85", label: "Cohen's κ", context: "QA agreement score" },
      {
        value: "70%",
        label: "More Root Causes",
        context: "complaint analysis",
      },
    ],
    technologies: [
      "GPT-4o",
      "WhisperX",
      "DSPy",
      "LangChain",
      "pgvector",
      "Faster R-CNN",
      "AWS SageMaker",
      "Python",
      "PostgreSQL",
    ],
  },
  {
    id: "htc-intern",
    company: "HTC Global Services",
    location: "Remote",
    role: "Machine Learning Engineer Intern",
    startDate: "Sep 2023",
    endDate: "Dec 2023",
    type: "internship",
    description:
      "Built forecasting and computer vision solutions for retail inventory management.",
    responsibilities: [
      "Built and deployed ARIMA/SARIMA forecasts for inventory shrinkage across 50+ retail categories",
      "Streamlined video dataset creation by integrating YOLOv8 auto pre-labeling into the annotation workflow",
    ],
    metrics: [
      { value: "15%", label: "Shrinkage Reduction", context: "across 8 locations" },
      { value: "$200K/yr", label: "Loss Prevention", context: "retail inventory" },
      { value: "50%", label: "Labeling Throughput", context: "YOLOv8 pipeline" },
      { value: "30%", label: "Dataset Prep Time Saved", context: "annotation workflow" },
    ],
    technologies: ["ARIMA", "SARIMA", "YOLOv8", "Python", "scikit-learn", "Pandas"],
  },
  {
    id: "technocolabs-intern",
    company: "Technocolabs Softwares",
    location: "Remote",
    role: "Data Science Intern",
    startDate: "May 2021",
    endDate: "Jul 2021",
    type: "internship",
    description:
      "Built ML models for loan default prediction with real-time API deployment.",
    responsibilities: [
      "Built a loan default prediction model using Random Forest, achieving 86% accuracy",
      "Deployed a real-time scoring API that reduced loan processing time by 35%",
    ],
    metrics: [
      { value: "86%", label: "Model Accuracy", context: "+6% vs baseline" },
      { value: "35%", label: "Processing Time Saved", context: "loan scoring API" },
      { value: "$200K", label: "Defaults Prevented", context: "potential loss avoided" },
    ],
    technologies: ["Random Forest", "Python", "Flask", "scikit-learn", "Pandas"],
  },
];
