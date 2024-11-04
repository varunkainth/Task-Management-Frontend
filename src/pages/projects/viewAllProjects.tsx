/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProjectCard } from "@/components/custom/projectCard";
import { useProjects } from "@/hooks/useProject";
import { Project } from "@/types/auth";
import { Filter, Loader2, X } from "lucide-react";

const AllProjects: React.FC = () => {
  const { loadProjects, projects, loading } = useProjects();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 6;

  // Load projects only once on component mount
  useEffect(() => {
    if (!isInitialized) {
      loadProjects();
      setIsInitialized(true);
    }
  }, [isInitialized, loadProjects]);

  // Memoized search filter function
  const filterProjects = useCallback(() => {
    const filtered = projects.filter(project =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
    setFilteredProjects(filtered);
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchTerm, projects]);

  // Handle search filtering
  useEffect(() => {
    filterProjects();
  }, [filterProjects]);

  // Pagination calculations
  const indexOfLastProject = currentPage * itemsPerPage;
  const indexOfFirstProject = indexOfLastProject - itemsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Projects</h1>

      {/* Search and Filter Section */}
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex gap-2">
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search projects..."
            className="flex-grow"
          />
          <Button 
            variant="outline"
            onClick={toggleFilters}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Filter Panel - You can customize this based on your needs */}
        {showFilters && (
          <div className="p-4 border rounded-md">
            {/* Add your filter options here */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Filters</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleFilters}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {/* Example filter options - customize as needed */}
            <div className="space-y-4">
              {/* Add your filter components here */}
              <p className="text-sm text-gray-500">Add your filter options here</p>
            </div>
          </div>
        )}
      </div>

      {/* Projects Display */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <>
          {currentProjects.length === 0 ? (
            <div className="text-center py-8">
              <p>No projects found. Try adjusting your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              
              {Array.from({ length: totalPages }, (_, index) => (
                <Button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  variant={currentPage === index + 1 ? "default" : "outline"}
                >
                  {index + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllProjects;