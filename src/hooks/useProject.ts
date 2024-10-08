import { useAppDispatch, useAppSelector } from "@/store";
import {
  fetchProjects,
  createProject,
  deleteProject,
  resetError,
} from "@/features/project/projectSlice";
import { Project } from "@/types/auth";

export const useProjects = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector((state) => state.projects);

  const loadProjects = () => {
    dispatch(fetchProjects());
  };

  const addProject = (projectData: Partial<Project>) => {
    dispatch(createProject(projectData));
  };

  const removeProject = (projectId: string) => {
    dispatch(deleteProject(projectId));
  };

  const clearError = () => {
    dispatch(resetError());
  };

  return {
    ...project,
    loadProjects,
    addProject,
    removeProject,
    clearError,
  };
};
