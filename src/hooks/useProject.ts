import { useAppDispatch, useAppSelector } from "@/store";
import {
  fetchProjects,
  createProject,
  deleteProject,
  resetError,
  updateProject,
  getProjectById,
} from "@/features/project/projectSlice";
import { Project } from "@/types/auth";

export const useProjects = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector((state) => state.projects);

  const loadProjects = async (): Promise<Project[]> => {
    const result = await dispatch(fetchProjects());

    // console.log(fetchProjects)
    if (fetchProjects.fulfilled.match(result)) {
      return result.payload;
    }
    // console.log(result)
    throw new Error(result.payload ?? "Failed to load projects");
  };

  const ProjectById = async (projectId: string): Promise<Project> => {
    const result = await dispatch(
      getProjectById({
        projectId,
      })
    );

     // console.log(result)

    if (getProjectById.fulfilled.match(result)) {
      return result.payload ;
    }
  
    throw new Error(result.payload ?? "Failed to load project details");
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

  const updateProjects = ({
    projectData,
    projectId,
  }: {
    projectData: Partial<Project>;
    projectId: string;
  }) => {
    dispatch(
      updateProject({
        projectData: projectData,
        projectId: projectId,
      })
    );
  };

 

  return {
    ...project,
    loadProjects,
    addProject,
    removeProject,
    clearError,
    updateProjects,
    ProjectById,
  };
};
