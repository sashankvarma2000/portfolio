"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BlogPost } from "@/data/blog-posts";
import { fadeInUp } from "@/lib/animations";
import ReactMarkdown from "react-markdown";

export default function BlogPostContent({ post }: { post: BlogPost }) {
  return (
    <div className="pt-24 pb-20">
      <article className="section-container max-w-3xl">
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors text-sm mb-8"
          >
            <ArrowLeft size={14} />
            Back to blog
          </Link>

          <div className="flex items-center gap-3 mb-4">
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

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-foreground-muted mb-8">
            {post.description}
          </p>

          <div className="border-t border-border pt-8">
            <div className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground-muted prose-strong:text-foreground prose-code:text-accent-primary prose-code:bg-background-tertiary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-background-tertiary prose-pre:border prose-pre:border-border prose-a:text-accent-primary prose-a:no-underline hover:prose-a:underline prose-li:text-foreground-muted prose-th:text-foreground prose-td:text-foreground-muted prose-table:border-collapse prose-th:border prose-th:border-border prose-th:p-2 prose-td:border prose-td:border-border prose-td:p-2">
              <ReactMarkdown
                components={{
                  code({ className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const isInline = !match;
                    return isInline ? (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    ) : (
                      <pre className="overflow-x-auto">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    );
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-accent-primary hover:text-accent-primary/80 transition-colors"
            >
              <ArrowLeft size={14} />
              Back to all posts
            </Link>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
