/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Assuming you're using Shadcn's Button component
import useAuth  from "@/hooks/useAuth"; // Your custom useAuth hook for user data
import { ProjectCard } from "@/components/custom/projectCard"; // Assuming you have a ProjectCard component

const Dashboard: React.FC = () => {
  const { user } = useAuth(); 


  const navigate = useNavigate()

  const Redirect = ()=>{
    navigate("/project/create")
  }
  
  // Example projects data
  const allProjects = [
    { id: 1, name: "Project 1", description: "Description 1" },
    { id: 2, name: "Project 2", description: "Description 2" },
    { id: 3, name: "Project 3", description: "Description 3" },
    { id: 4, name: "Project 4", description: "Description 4" },
  ];

  // For trending projects, you can customize it based on real data
  const trendingProjects = [
    { id: 1, name: "Trending Project 1", description: "Trending description 1" },
    { id: 2, name: "Trending Project 2", description: "Trending description 2" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      {/* Section for displaying user's projects */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Your Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {allProjects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="mt-4">
          <Link to="/projects">
            <Button>View All Projects</Button>
          </Link>
        </div>
      </section>

      {/* Section for trending projects */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Trending Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {trendingProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Create new project button */}
      <Button
        className="fixed bottom-4 right-4"
        onClick={Redirect}
      >
        Create New Project
      </Button>
    </div>
  );
};

export default Dashboard;
