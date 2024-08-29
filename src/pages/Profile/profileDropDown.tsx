import { useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const ProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = () => setIsOpen(!isOpen);
  const {user} = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button
          className="flex items-center space-x-2 text-gray-300 hover:text-white focus:outline-none"
          onClick={handleToggle}
        >
          {user? <img src={user.profilePic} alt={`${user.name} Profile Pic`}  className="w-8 h-8 rounded-full"/>: <FaUserCircle className="w-8 h-8" />}
          <span>{user?.name  ||  'User'}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-gray-800 text-white">
        <DropdownMenuItem>
          <Link to="/profile" className="flex items-center space-x-2">
            <FaUserCircle />
            <span>View Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/settings" className="flex items-center space-x-2">
            <FaUserCircle />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button className="flex items-center space-x-2 text-red-500">
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
