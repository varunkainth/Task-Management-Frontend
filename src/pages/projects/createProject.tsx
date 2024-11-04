/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProjects } from "@/hooks/useProject";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const projectSchema = z.object({
  name: z
    .string()
    .min(3, "Project name must be at least 3 characters.")
    .nonempty("Project name is required."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long.")
    .max(500, "Description must not exceed 500 characters.")
    .nonempty("Description is required."),
});

type ProjectFormData = z.infer<typeof projectSchema>;

const ProjectCreate: React.FC = () => {
  const { addProject, loading } = useProjects();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    try {
      await addProject(data);
      toast({
        title: "Success!",
        description: "Your project has been created successfully.",
        variant: "default",
        className: "bg-green-500 text-white",
      });
      reset();
      // Redirect to dashboard after short delay
      setTimeout(() => navigate("/dashboard"), 5000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Create New Project</CardTitle>
            <CardDescription>
              Fill in the details below to create your new project
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Form Section */}
              <div className="space-y-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Project Name Input */}
                  <div className="space-y-2">
                    <Label htmlFor="project-name">
                      Project Name
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="project-name"
                      placeholder="Enter your project name"
                      {...register("name")}
                      className={errors.name ? "border-red-500" : ""}
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Project Description Input */}
                  <div className="space-y-2">
                    <Label htmlFor="project-description">
                      Project Description
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Textarea
                      id="project-description"
                      placeholder="Describe your project in detail..."
                      {...register("description")}
                      className={`min-h-[120px] ${
                        errors.description ? "border-red-500" : ""
                      }`}
                      disabled={isSubmitting}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {isSubmitting ? "Creating..." : "Create Project"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/dashboard")}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>

              {/* Info Section */}
              <div className="hidden md:block">
                <div className="rounded-lg bg-muted p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Creating a New Project
                  </h3>
                  <div className="space-y-4 text-sm">
                    <p>
                      A good project starts with a clear name and description.
                      Here's what you need to know:
                    </p>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>Choose a unique and descriptive project name</li>
                      <li>
                        Provide a detailed description (minimum 10 characters)
                      </li>
                      <li>
                        You can edit your project details later if needed
                      </li>
                      <li>
                        After creation, you'll be redirected to your dashboard
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectCreate;