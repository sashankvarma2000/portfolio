"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";
import { blogPosts } from "@/data/blog-posts";

export default function BlogPreview() {
  return (
    <section id="blog" className="py-20">
      <div className="section-container">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-end justify-between"
        >
          <div>
            <h2 className="section-title">Writing</h2>
            <p className="section-subtitle">
              Technical deep-dives on ML engineering and GenAI
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 text-accent-primary hover:text-accent-primary/80 transition-colors text-sm font-medium"
          >
            View all posts
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.slug}
              variants={staggerItem}
              className="card-base card-hover p-6 flex flex-col group"
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${post.categoryColor}`}
                >
                  {post.category}
                </span>
                <span className="text-xs text-foreground-subtle flex items-center gap-1">
                  <Clock size={10} />
                  {post.readingTime}
                </span>
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-accent-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-foreground-muted flex-1 line-clamp-3 mb-4">
                {post.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground-subtle flex items-center gap-1">
                  <Calendar size={10} />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs text-accent-primary flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Read more
                  <ArrowRight size={10} />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 text-center md:hidden"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-accent-primary hover:text-accent-primary/80 transition-colors text-sm font-medium"
          >
            View all posts
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
