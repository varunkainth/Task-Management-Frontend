import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"; // Assuming Shadcn's Button component is in this path
import { Input } from "@/components/ui/input"; // Assuming Shadcn's Input component is in this path
import { Label } from "@/components/ui/label";
import { useProjects } from "@/hooks/useProject";

const projectSchema = z.object({
  name: z.string().nonempty("Project name is required."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long.")
    .nonempty("Description is required."),
});

type ProjectFormData = z.infer<typeof projectSchema>;

const ProjectCreate: React.FC = () => {
  const { addProject, loading, error, projects } = useProjects();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = async (data: ProjectFormData) => {
    // Handle form submission logic here
    console.log("Project Created:", data);
    addProject(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-white mb-6">Create New Project</h1>

      <div className="flex flex-col md:flex-row max-w-4xl w-full bg-gray-800 rounded-lg shadow-lg p-6">
        {/* Image Section */}
        <div className="md:w-1/2 flex items-center justify-center mb-4 md:mb-0">
          <img
            src="https://img.freepik.com/free-vector/people-holding-creative-ideas-icons_53876-66176.jpg"
            alt="Project Creation"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Input for Project Name */}
            <div className="mb-4">
              <Label htmlFor="project-name" className="text-white">
                Project Name
              </Label>
              <Input
                id="project-name"
                type="text"
                placeholder="Enter your project name"
                className={`mt-1 ${errors.name ? "border-red-500" : ""}`}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Input for Project Description */}
            <div className="mb-4">
              <Label htmlFor="project-description" className="text-white">
                Project Description
              </Label>
              <Input
                id="project-description"
                type="text"
                placeholder="Enter project description (at least 10 characters)"
                className={`mt-1 ${errors.description ? "border-red-500" : ""}`}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Create Button */}
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
            >
              Create Project
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectCreate;
