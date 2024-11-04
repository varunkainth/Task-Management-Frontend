import { Project } from "@/types/auth";
import React from "react";
import {useNavigate} from "react-router-dom"




interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {

  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate(`/projects/${project.id}`)
    }

  return (
    <div className="border p-4 rounded-lg shadow-sm" onClick={handleNavigate}>
      <h3 className="font-semibold">{project.name}</h3>
      <p>{project.description}</p>
    </div>
  );
};
