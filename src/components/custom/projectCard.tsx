import React from "react";

interface Project {
  id: number;
  name: string;
  description: string;
}

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold">{project.name}</h3>
      <p>{project.description}</p>
    </div>
  );
};
