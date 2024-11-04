import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import {ProjectCard} from "@/components/custom/projectCard";
import { useProjects } from "@/hooks/useProject";
import { Project } from "@/types/auth";
import { Plus, Loader2, ArrowRight } from "lucide-react";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { loadProjects, loading } = useProjects();
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch projects only once on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      if (!isInitialized) {
        try {
          const projects = await loadProjects();
          setAllProjects(projects || []);
          setError(null);
        } catch (error) {
          setError("Failed to load projects. Please try again later.");
          console.error("Failed to load projects:", error);
        } finally {
          setIsInitialized(true);
        }
      }
    };

    fetchProjects();
  }, [isInitialized, loadProjects]);

  // Get recent projects (most recent 3)
  const recentProjects = allProjects.slice(0, 4);

  const LoadingState = () => (
    <div className="flex items-center justify-center h-32">
      <Loader2 className="h-6 w-6 animate-spin mr-2" />
      <span className="text-sm">Loading projects...</span>
    </div>
  );

  const EmptyState = () => (
    <div className="border border-dashed rounded-lg p-8 text-center">
      <p className="text-gray-500 mb-4">You haven't created any projects yet.</p>
      <Button onClick={() => navigate('/project/create')} className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Create Your First Project
      </Button>
    </div>
  );

  const ErrorState = () => (
    <div className="border border-red-200 bg-red-50 rounded-lg p-4 text-red-600">
      <p>{error}</p>
      <Button 
        variant="ghost" 
        onClick={() => setIsInitialized(false)} 
        className="mt-2"
      >
        Try Again
      </Button>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Welcome back, {user?.name || 'User'}
          </p>
        </div>
        <Button
          onClick={() => navigate('/project/create')}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {error ? (
        <ErrorState />
      ) : (
        <>
          {/* Projects Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Projects</h2>
              {recentProjects.length > 0 && (
                <Link 
                  to="/AllProjects"
                  className="flex items-center text-sm hover:underline gap-1"
                >
                  View All Projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>

            {loading ? (
              <LoadingState />
            ) : recentProjects.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recentProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Create New Project - Fixed Button
          <div className="fixed bottom-6 right-6">
            <Button
              onClick={() => navigate('/project/create')}
              className="shadow-lg flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Project
            </Button>
          </div> */}
        </>
      )}
    </div>
  );
};

export default Dashboard;