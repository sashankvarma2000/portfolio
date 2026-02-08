"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="section-container">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle mx-auto">
            Open to ML Engineer, GenAI Engineer, and Research Engineer roles.
            Let&apos;s build something impactful together.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 max-w-lg mx-auto"
        >
          {/* Contact links */}
          <div className="space-y-3">
            <motion.a
              variants={staggerItem}
              href={`mailto:${siteConfig.email}`}
              className="card-base card-hover flex items-center gap-4 p-4 group"
            >
              <div className="p-2 rounded-lg bg-accent-primary/10 text-accent-primary">
                <Mail size={18} />
              </div>
              <div>
                <div className="text-sm text-foreground-subtle">Email</div>
                <div className="font-medium group-hover:text-accent-primary transition-colors">
                  {siteConfig.email}
                </div>
              </div>
            </motion.a>

            <motion.a
              variants={staggerItem}
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="card-base card-hover flex items-center gap-4 p-4 group"
            >
              <div className="p-2 rounded-lg bg-accent-secondary/10 text-accent-secondary">
                <Linkedin size={18} />
              </div>
              <div>
                <div className="text-sm text-foreground-subtle">LinkedIn</div>
                <div className="font-medium group-hover:text-accent-secondary transition-colors">
                  Sashank Varma Rudraraju
                </div>
              </div>
            </motion.a>

            <motion.a
              variants={staggerItem}
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="card-base card-hover flex items-center gap-4 p-4 group"
            >
              <div className="p-2 rounded-lg bg-foreground/10 text-foreground">
                <Github size={18} />
              </div>
              <div>
                <div className="text-sm text-foreground-subtle">GitHub</div>
                <div className="font-medium group-hover:text-foreground/80 transition-colors">
                  github.com/sashankvarma2000
                </div>
              </div>
            </motion.a>
          </div>

          <motion.div
            variants={staggerItem}
            className="mt-8 text-center"
          >
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-accent-primary text-white font-medium hover:bg-accent-primary/90 transition-colors"
            >
              <Mail size={16} />
              Send me a message
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
