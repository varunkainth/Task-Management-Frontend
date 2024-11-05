/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { useProjects } from "@/hooks/useProject";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface FormData {
  name: string;
  description: string;
}

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    ProjectById,
    currentProject,
    loading: hookLoading,
    updateProjects,
    removeProject,
  } = useProjects();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
  });

  // Fetch project on mount and when id changes
  useEffect(() => {
    if (!id) return;

    try {
      const currentPRoject = ProjectById(id);
      console.log(currentPRoject);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch project details",
        variant: "destructive",
      });
      navigate("/AllProjects");
    }
  }, []);

  // Update form data when project changes
  useEffect(() => {
    if (currentProject) {
      setFormData({
        name: currentProject.name || "",
        description: currentProject.description || "",
      });
    }
  }, [currentProject]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Project name is required",
        variant: "destructive",
      });
      return;
    }

    if (!currentProject || !id) return;

    try {
      setIsSaving(true);

      updateProjects({
        projectId: id,
        projectData: {
          ...currentProject,
          ...formData,
          name: formData.name.trim(),
          description: formData.description.trim(),
        },
      });

      setIsEditing(false);
      toast({
        title: "Success",
        description: "Project updated successfully",
      });

      // Refresh project data
      await ProjectById(id);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      setIsDeleting(true);

      removeProject(id);

      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
      navigate("/AllProjects");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const renderEditForm = () => (
    <div className="max-w-3xl mx-auto space-y-4">
      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Project Name</label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Project Name"
            className="text-lg"
            maxLength={100}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Project Description</label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Project Description"
            className="min-h-[200px] resize-none"
            maxLength={500}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsEditing(false)}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving || !formData.name.trim()}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );

  const renderProjectDetails = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold truncate">
          {currentProject?.name || "Untitled Project"}
        </h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsEditing(true)}
            disabled={isDeleting}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="bg-muted/50 rounded-lg p-6">
        <p className="text-muted-foreground whitespace-pre-wrap">
          {currentProject?.description || "No description available"}
        </p>
      </div>

      <div className="border-t pt-4 text-sm text-muted-foreground">
        <p>
          Created:{" "}
          {new Date(currentProject?.createdAt || "").toLocaleDateString()}
        </p>
        {currentProject?.updatedAt && (
          <p>
            Last updated:{" "}
            {new Date(currentProject.updatedAt).toLocaleDateString()}
          </p>
        )}
        <p>CreateBy: {currentProject?.createdBy?.name}</p>
      </div>
    </div>
  );

  return (
    <main className="container py-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/AllProjects")}
          className="mb-4"
        >
          ← Back to Projects
        </Button>
      </div>

      {hookLoading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : !currentProject ? (
        <div className="text-center text-muted-foreground p-4">
          <p>Project not found</p>
          <Button
            variant="outline"
            onClick={() => navigate("/AllProjects")}
            className="mt-4"
          >
            Return to Projects
          </Button>
        </div>
      ) : isEditing ? (
        renderEditForm()
      ) : (
        renderProjectDetails()
      )}
    </main>
  );
};

export default ProjectDetails;
