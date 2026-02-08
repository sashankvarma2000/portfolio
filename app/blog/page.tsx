"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";
import { blogPosts } from "@/data/blog-posts";

export default function BlogPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="section-container">
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors text-sm mb-8"
          >
            <ArrowLeft size={14} />
            Back to home
          </Link>
          <h1 className="section-title">Blog</h1>
          <p className="section-subtitle">
            Technical deep-dives on ML engineering, GenAI, and production
            systems
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-12 space-y-6"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.slug}
              variants={staggerItem}
              className="card-base card-hover p-6 group"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${post.categoryColor}`}
                      >
                        {post.category}
                      </span>
                      <span className="text-xs text-foreground-subtle flex items-center gap-1">
                        <Calendar size={10} />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="text-xs text-foreground-subtle flex items-center gap-1">
                        <Clock size={10} />
                        {post.readingTime}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-accent-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-foreground-muted">{post.description}</p>
                    <span className="inline-flex items-center gap-1 text-sm text-accent-primary mt-4 group-hover:gap-2 transition-all">
                      Read article
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
