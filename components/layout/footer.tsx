import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/data/site-config";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-20">
      <div className="section-container">
        <div className="flex items-center justify-center gap-6">
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
          <Link
            href={`mailto:${siteConfig.email}`}
            className="text-foreground-muted hover:text-foreground transition-colors"
          >
            <Mail size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
