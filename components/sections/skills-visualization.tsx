"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { skillCategories, radarData } from "@/data/skills";
import { cn } from "@/lib/utils";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";

export default function SkillsVisualization() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section id="skills" className="py-20 bg-background-secondary/30">
      <div className="section-container">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle">
            Technical expertise across the ML stack
          </p>
        </motion.div>

        <div className="mt-12 grid lg:grid-cols-2 gap-12 items-center">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#262626" />
                  <PolarAngleAxis
                    dataKey="category"
                    tick={{ fill: "#A3A3A3", fontSize: 12 }}
                  />
                  <Radar
                    name="Skills"
                    dataKey="level"
                    stroke="#8B5CF6"
                    fill="#8B5CF6"
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Skill Categories */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3"
          >
            {skillCategories.map((category) => (
              <motion.div key={category.id} variants={staggerItem}>
                <button
                  onClick={() =>
                    setActiveCategory(
                      activeCategory === category.id ? null : category.id
                    )
                  }
                  className={cn(
                    "w-full card-base p-4 text-left transition-all duration-300",
                    activeCategory === category.id
                      ? "border-border-hover"
                      : "hover:border-border-hover"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium" style={{ color: category.color }}>
                      {category.label}
                    </span>
                    <span className="text-foreground-subtle text-sm">
                      {category.skills.length} skills
                    </span>
                  </div>

                  {activeCategory === category.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.2 }}
                      className="mt-3 space-y-2"
                    >
                      {category.skills.map((skill) => (
                        <div key={skill.name}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-foreground-muted">
                              {skill.name}
                            </span>
                            <span className="text-foreground-subtle">
                              {skill.proficiency}%
                            </span>
                          </div>
                          <div className="h-1.5 bg-background-tertiary rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.proficiency}%` }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: category.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Technology pills */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12"
        >
          <h3 className="text-lg font-semibold mb-4 text-foreground-muted">
            All Technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {skillCategories
              .flatMap((c) => c.skills.map((s) => ({ ...s, color: c.color })))
              .sort((a, b) => b.proficiency - a.proficiency)
              .map((skill) => (
                <span
                  key={skill.name}
                  className="px-3 py-1 rounded-full text-sm border border-border hover:border-border-hover transition-colors"
                  style={{
                    backgroundColor: `${skill.color}10`,
                    borderColor: `${skill.color}30`,
                    color: skill.color,
                  }}
                >
                  {skill.name}
                </span>
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
