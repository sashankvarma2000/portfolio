import Hero from "@/components/sections/hero";
import ExperienceTimeline from "@/components/sections/experience-timeline";
import ProjectsShowcase from "@/components/sections/projects-showcase";
import SkillsVisualization from "@/components/sections/skills-visualization";
import BlogPreview from "@/components/sections/blog-preview";
import Education from "@/components/sections/education";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <ExperienceTimeline />
      <ProjectsShowcase />
      <SkillsVisualization />
      <BlogPreview />
      <Education />
      <Contact />
    </>
  );
}
