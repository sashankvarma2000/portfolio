"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Eye,
  LineChart,
  Database,
  Github,
  ChevronRight,
} from "lucide-react";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";
import AnomalyDemo from "@/components/ui/anomaly-demo";

const categoryIcons = {
  genai: Brain,
  "computer-vision": Eye,
  mlops: LineChart,
  "classical-ml": Database,
};

const categoryColors = {
  genai: "text-accent-primary bg-accent-primary/10 border-accent-primary/20",
  "computer-vision":
    "text-accent-secondary bg-accent-secondary/10 border-accent-secondary/20",
  mlops: "text-accent-tertiary bg-accent-tertiary/10 border-accent-tertiary/20",
  "classical-ml": "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
};

export default function ProjectsShowcase() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20">
      <div className="section-container">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">
            Production systems and research that drive real-world impact
          </p>
        </motion.div>

        {/* Featured projects */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid md:grid-cols-2 gap-6"
        >
          {featuredProjects.map((project) => {
            const Icon = categoryIcons[project.category];
            return (
              <motion.div
                key={project.id}
                variants={staggerItem}
                className="card-base card-hover p-6 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border",
                      categoryColors[project.category]
                    )}
                  >
                    <Icon size={12} />
                    {project.category === "genai"
                      ? "GenAI"
                      : project.category === "computer-vision"
                        ? "Computer Vision"
                        : project.category === "mlops"
                          ? "MLOps"
                          : "Classical ML"}
                  </span>
                  <span className="text-xs text-foreground-subtle">
                    {project.period}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-foreground-muted text-sm mb-4 flex-1">
                  {project.shortDescription}
                </p>

                {/* Metrics */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.metrics.map((m) => (
                    <span
                      key={m.label}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-background-tertiary"
                    >
                      <span className="font-bold text-accent-tertiary">
                        {m.value}
                      </span>
                      <span className="text-foreground-subtle">{m.label}</span>
                    </span>
                  ))}
                </div>

                {/* Highlights */}
                <ul className="space-y-1 mb-4">
                  {project.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="text-xs text-foreground-muted flex items-start gap-1.5"
                    >
                      <ChevronRight
                        size={12}
                        className="text-accent-primary mt-0.5 shrink-0"
                      />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-0.5 rounded bg-background-tertiary text-foreground-subtle"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Demo button for anomaly detection */}
                {project.demoType === "chart" && project.id === "anomaly-detection-npds" && (
                  <button
                    onClick={() =>
                      setActiveDemo(
                        activeDemo === project.id ? null : project.id
                      )
                    }
                    className="text-sm text-accent-secondary hover:text-accent-secondary/80 transition-colors flex items-center gap-1 mt-auto"
                  >
                    <LineChart size={14} />
                    {activeDemo === project.id
                      ? "Hide Demo"
                      : "View Demo Visualization"}
                  </button>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors mt-2"
                  >
                    <Github size={14} />
                    View Code
                  </a>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Anomaly demo */}
        {activeDemo === "anomaly-detection-npds" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <AnomalyDemo />
          </motion.div>
        )}

        {/* Other projects grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {otherProjects.map((project) => {
            const Icon = categoryIcons[project.category];
            return (
              <motion.div
                key={project.id}
                variants={staggerItem}
                className="card-base card-hover p-5 flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border",
                      categoryColors[project.category]
                    )}
                  >
                    <Icon size={10} />
                    {project.category === "genai"
                      ? "GenAI"
                      : project.category === "computer-vision"
                        ? "CV"
                        : project.category === "mlops"
                          ? "MLOps"
                          : "ML"}
                  </span>
                </div>
                <h3 className="font-semibold mb-1">{project.title}</h3>
                <p className="text-sm text-foreground-muted mb-3 flex-1">
                  {project.shortDescription}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.metrics.slice(0, 2).map((m) => (
                    <span
                      key={m.label}
                      className="text-xs bg-background-tertiary px-2 py-0.5 rounded"
                    >
                      <span className="font-bold text-accent-tertiary">
                        {m.value}
                      </span>{" "}
                      {m.label}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
