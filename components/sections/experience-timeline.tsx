"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Calendar, MapPin } from "lucide-react";
import { experiences } from "@/data/experiences";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export default function ExperienceTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>(
    "htc-ml-engineer"
  );

  return (
    <section id="experience" className="py-20">
      <div className="section-container">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">
            Building production ML systems with measurable business impact
          </p>
        </motion.div>

        <div className="mt-12 relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={staggerItem}
                className={cn(
                  "relative flex gap-4 md:gap-8",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent-primary border-2 border-background mt-5 z-10" />

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />

                {/* Content card */}
                <div
                  className={cn(
                    "flex-1 ml-10 md:ml-0",
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  )}
                >
                  <div
                    className={cn(
                      "card-base card-hover p-6 cursor-pointer",
                      expandedId === exp.id && "border-border-hover"
                    )}
                    onClick={() =>
                      setExpandedId(expandedId === exp.id ? null : exp.id)
                    }
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={cn(
                              "text-xs px-2 py-0.5 rounded-full",
                              exp.type === "full-time"
                                ? "bg-accent-primary/10 text-accent-primary"
                                : "bg-accent-secondary/10 text-accent-secondary"
                            )}
                          >
                            {exp.type === "full-time" ? "Full-time" : "Intern"}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold">{exp.role}</h3>
                        <div className="text-accent-primary font-medium">
                          {exp.company}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-foreground-subtle mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {exp.startDate} – {exp.endDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                      <button className="text-foreground-subtle mt-1 shrink-0">
                        {expandedId === exp.id ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </button>
                    </div>

                    {/* Metrics - always visible */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.metrics.slice(0, 3).map((metric) => (
                        <span key={metric.label} className="metric-badge">
                          <span className="font-bold mr-1">{metric.value}</span>
                          {metric.label}
                        </span>
                      ))}
                    </div>

                    {/* Expandable content */}
                    {expandedId === exp.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-border"
                      >
                        <ul className="space-y-2 text-sm text-foreground-muted">
                          {exp.responsibilities.map((resp, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-accent-primary mt-1">
                                ›
                              </span>
                              {resp}
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs px-2 py-1 rounded bg-background-tertiary text-foreground-subtle"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
