export interface Skill {
  name: string;
  proficiency: number;
}

export interface SkillCategory {
  id: string;
  label: string;
  color: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "genai-llms",
    label: "GenAI & LLMs",
    color: "#8B5CF6",
    skills: [
      { name: "LangChain", proficiency: 92 },
      { name: "LangGraph", proficiency: 90 },
      { name: "DSPy", proficiency: 88 },
      { name: "WhisperX", proficiency: 85 },
      { name: "RAG Systems", proficiency: 95 },
      { name: "Prompt Engineering", proficiency: 90 },
    ],
  },
  {
    id: "computer-vision",
    label: "Computer Vision",
    color: "#06B6D4",
    skills: [
      { name: "YOLOv8", proficiency: 90 },
      { name: "Faster R-CNN", proficiency: 88 },
      { name: "Detectron2", proficiency: 85 },
      { name: "OpenCV", proficiency: 85 },
      { name: "PyTorch", proficiency: 88 },
    ],
  },
  {
    id: "ml-frameworks",
    label: "ML & Data Science",
    color: "#10B981",
    skills: [
      { name: "scikit-learn", proficiency: 92 },
      { name: "Pandas", proficiency: 95 },
      { name: "NumPy", proficiency: 90 },
      { name: "XGBoost", proficiency: 85 },
      { name: "statsmodels", proficiency: 80 },
      { name: "Time Series", proficiency: 85 },
    ],
  },
  {
    id: "mlops",
    label: "MLOps & Cloud",
    color: "#F59E0B",
    skills: [
      { name: "AWS SageMaker", proficiency: 88 },
      { name: "Docker", proficiency: 85 },
      { name: "pgvector", proficiency: 85 },
      { name: "MongoDB", proficiency: 80 },
      { name: "Azure ML", proficiency: 78 },
      { name: "Databricks", proficiency: 80 },
    ],
  },
  {
    id: "languages",
    label: "Languages",
    color: "#EF4444",
    skills: [
      { name: "Python", proficiency: 97 },
      { name: "SQL", proficiency: 90 },
      { name: "R", proficiency: 75 },
      { name: "JavaScript", proficiency: 72 },
      { name: "Java", proficiency: 70 },
    ],
  },
];

export const radarData = [
  { category: "GenAI/LLMs", level: 95 },
  { category: "Computer Vision", level: 90 },
  { category: "ML/Data Science", level: 92 },
  { category: "MLOps/Cloud", level: 85 },
  { category: "Languages", level: 88 },
];
