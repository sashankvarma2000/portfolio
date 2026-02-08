"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";

const education = [
  {
    school: "Boston University",
    location: "Boston, MA",
    degree: "Master of Science in Computer Science",
    gpa: "3.97/4.00",
    period: "January 2024",
    highlights: ["Experimental Design", "Machine Learning", "Deep Learning", "NLP"],
  },
  {
    school: "NIT Warangal",
    location: "Warangal, Telangana",
    degree: "B.Tech in Metallurgical & Materials Engineering",
    gpa: "3.50/4.00",
    period: "July 2018 – May 2022",
    highlights: ["Institute Merit Scholarship", "Top 5% of students", "Research on High Entropy Alloys"],
  },
];

export default function Education() {
  return (
    <section id="education" className="py-20 bg-background-secondary/30">
      <div className="section-container">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="section-title">Education</h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 grid md:grid-cols-2 gap-6"
        >
          {education.map((edu) => (
            <motion.div
              key={edu.school}
              variants={staggerItem}
              className="card-base card-hover p-6"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-accent-primary/10 text-accent-primary shrink-0">
                  <GraduationCap size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{edu.school}</h3>
                  <p className="text-foreground-muted text-sm">{edu.degree}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="text-accent-tertiary font-bold">
                      GPA: {edu.gpa}
                    </span>
                    <span className="text-foreground-subtle">{edu.period}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {edu.highlights.map((h) => (
                      <span
                        key={h}
                        className="flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-background-tertiary text-foreground-muted"
                      >
                        <Award size={10} className="text-accent-primary" />
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
