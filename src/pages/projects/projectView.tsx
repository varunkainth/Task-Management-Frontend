import React, { useEffect, useState } from "react";
import { Trash2, Calendar, Users } from "lucide-react";
import { Project } from "@/types/auth";
import { useParams } from "react-router-dom";
import { useProjects } from "@/hooks/useProject";

interface ProjectCardProps {
  project?: Project;
}

const defaultProject: Project = {
  id: "",
  name: "",
  description: "",
  createdBy: "",
  members: [],
  invites: [],
  tasks: [],
};

const formatDate = (date?: Date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const ProjectDetails: React.FC<ProjectCardProps> = ({
  project = defaultProject,
}) => {
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState<Project>(project);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { removeProject, ProjectById, updateProjects } = useProjects();
  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        const project =  ProjectById(id); // Await the asynchronous function
        setEditedProject(project || defaultProject); // Assign the result or a default project
      }
    };

    fetchProject();
  }, [id, ProjectById]);

  const handleDelete = () => {
    if (id) {
      removeProject(id);
      setIsModalOpen(false);
    }
  };

  const handleUpdate = () => {
    if (id) {
      updateProjects({ projectData: editedProject, projectId: id });
      setIsEditing(false);
    }
  };

  const renderEditMode = () => (
    <div className="space-y-4">
      <input
        value={editedProject.name || ""}
        onChange={(e) =>
          setEditedProject({ ...editedProject, name: e.target.value })
        }
        className="w-full px-3 py-2 border rounded-md text-lg font-semibold"
        placeholder="Project Name"
      />
      <textarea
        value={editedProject.description || ""}
        onChange={(e) =>
          setEditedProject({ ...editedProject, description: e.target.value })
        }
        className="w-full px-3 py-2 border rounded-md min-h-[100px]"
        placeholder="Project Description"
      />
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => setIsEditing(false)}
          className="px-4 py-2 border rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderViewMode = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {editedProject.name || "Untitled Project"}
        </h2>
        <div className="space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <p className="text-gray-600">
        {editedProject.description || "No description available"}
      </p>
      <div className="border-t pt-4 space-y-2">
        <div className="flex items-center text-sm text-gray-500">
          <Users className="h-4 w-4 mr-2" />
          <span>Created by: {editedProject.createdBy || "Unknown"}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Created: {formatDate(editedProject.createdAt)}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Users className="h-4 w-4 mr-2" />
          <span>Members: {editedProject.members?.length || 0}</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer p-4"
      >
        <div className="mb-3">
          <h3 className="font-semibold truncate">
            {project.name || "Untitled Project"}
          </h3>
        </div>
        <div>
          <p className="text-gray-600 line-clamp-2">
            {project.description || "No description available"}
          </p>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-2" />
            <span>{project.members?.length || 0} members</span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-[500px] w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {isEditing ? "Edit Project" : "Project Details"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            {isEditing ? renderEditMode() : renderViewMode()}
          </div>
        </div>
      )}
    </>
  );
};

export { ProjectDetails };
