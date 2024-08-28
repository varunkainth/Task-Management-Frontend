import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { FaBell, FaUserCircle } from "react-icons/fa";
import ProfileDropdown from "@/pages/Profile/profile";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleToggle = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md sticky top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Project Name with Home Route */}
        <Link to="/" className="text-lg font-bold" onClick={handleClose}>
          Task Manager
        </Link>

        {/* Navbar Items for larger screens */}
        <div className="hidden md:flex space-x-4">
          <Button
            variant="outline"
            className="hover:bg-gray-700"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" className="hover:bg-gray-700">
                <FaBell />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem>Notification 1</DropdownMenuItem>
              <DropdownMenuItem>Notification 2</DropdownMenuItem>
              {/* Add more notifications as needed */}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <ProfileDropdown/>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={handleToggle}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 text-white mt-2 flex flex-col space-y-2 p-4">
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
            onClick={handleClose}
          >
            Dashboard
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" className="w-full text-left px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
                <FaBell />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              <DropdownMenuItem onClick={handleClose}>Notification 1</DropdownMenuItem>
              <DropdownMenuItem onClick={handleClose}>Notification 2</DropdownMenuItem>
              {/* Add more notifications as needed */}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" className="w-full text-left px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
                <FaUserCircle />
              </Button>
            </DropdownMenuTrigger>
            <ProfileDropdown/>
          </DropdownMenu>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
