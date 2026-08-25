"use client";

import { useState } from "react";
import SectionFrame from "@/components/ui/SectionFrame";
import VideoCard from "@/components/ui/VideoCard";
import ProjectModal from "@/components/ui/ProjectModal";
import { WORK_PROJECTS, type WorkProject } from "@/lib/data/projects";

export default function WorkGallery() {
  const [active, setActive] = useState<WorkProject | null>(null);

  return (
    <SectionFrame
      id="work"
      frame="02"
      total="09"
      eyebrow="CHAPTER 02 — SELECTED WORK"
      title="Selected Work"
      kicker="short-form edits, curated like an exhibition — not a feed."
    >
      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-flow-dense md:grid-cols-4 md:auto-rows-[210px] md:gap-5">
        {WORK_PROJECTS.map((project, i) => (
          <VideoCard
            key={project.id}
            project={project}
            index={i}
            onOpen={setActive}
          />
        ))}
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </SectionFrame>
  );
}
