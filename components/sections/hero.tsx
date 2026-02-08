"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { staggerContainer, staggerItem } from "@/lib/animations";

const roles = [
  "ML Engineer",
  "GenAI Specialist",
  "RAG Systems Architect",
];

const metrics = [
  { value: "3+", label: "Years Experience" },
  { value: "5", label: "Production Systems" },
  { value: "$500K+", label: "Value Delivered" },
  { value: "AWS 2x", label: "Certified" },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-tertiary/3 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="section-container relative z-10 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex-1 max-w-2xl"
        >
          {/* Open to work badge */}
          {siteConfig.openToWork && (
            <motion.div variants={staggerItem} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-accent-tertiary/10 text-accent-tertiary border border-accent-tertiary/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-tertiary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-tertiary" />
                </span>
                Open to new opportunities
              </span>
            </motion.div>
          )}

          {/* Name */}
          <motion.h1
            variants={staggerItem}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
          >
            Hi, I&apos;m{" "}
            <span className="gradient-text">Sashank</span>
          </motion.h1>

          {/* Rotating role */}
          <motion.div
            variants={staggerItem}
            className="h-12 flex items-center mb-6"
          >
            <div className="text-2xl md:text-3xl text-foreground-muted font-medium flex items-center gap-3">
              <Sparkles size={24} className="text-accent-primary" />
              <span
                key={roleIndex}
                className="animate-fade-in text-foreground"
              >
                {roles[roleIndex]}
              </span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={staggerItem}
            className="text-lg text-foreground-muted max-w-2xl leading-relaxed mb-8"
          >
            Building production ML systems that deliver measurable impact.
            Specializing in GenAI applications, RAG architectures, and computer
            vision pipelines. MS in Computer Science, Boston University.
          </motion.p>

          {/* Metrics */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          >
            {metrics.map((metric) => (
              <motion.div
                key={metric.label}
                variants={staggerItem}
                className="card-base p-4 text-center"
              >
                <div className="text-2xl font-bold gradient-text">
                  {metric.value}
                </div>
                <div className="text-xs text-foreground-subtle mt-1">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={staggerItem}
            className="flex flex-wrap gap-4 mb-10"
          >
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg bg-accent-primary text-white font-medium hover:bg-accent-primary/90 transition-colors"
            >
              View Projects
            </a>
            <a
              href="/resume.pdf"
              download
              className="px-6 py-3 rounded-lg border border-border hover:border-border-hover bg-background-secondary font-medium transition-colors"
            >
              Download Resume
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={staggerItem}
            className="flex items-center gap-4"
          >
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-muted hover:text-foreground transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-muted hover:text-foreground transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-foreground-muted hover:text-foreground transition-colors"
            >
              <Mail size={20} />
            </a>
          </motion.div>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative shrink-0"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-accent-primary/20 shadow-2xl shadow-accent-primary/10">
            <Image
              src="/images/profile.jpeg"
              alt="Sashank Varma Rudraraju"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-primary/20 via-transparent to-accent-secondary/20 pointer-events-none" />
        </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground-subtle"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown size={16} className="animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
