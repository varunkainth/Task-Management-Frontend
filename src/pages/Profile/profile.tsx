import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { FaEdit } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import useAuth from '@/hooks/useAuth';

interface User {
  name: string;
  email: string;
  phoneNumber: string;
  profilePic: string;
  github: string;
  linkedin: string;
  twitter: string;
}

interface ProfilePageProps {
  user?: User; // User prop is optional
}

const ProfilePage: React.FC<ProfilePageProps> = ({  }) => {
    const {user} = useAuth();
  const [editing, setEditing] = useState(false);
  const [formValues, setFormValues] = useState<User>({
    name: user?.name || '',
    email: user?.email || '',
    phoneNumber: user?.id || '',
    profilePic: user?.profilePic || '',
    github: user?.role || '',
    linkedin: user?.linkedin || '',
    twitter: user?.twitter || '',
  });

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add functionality to handle form submission
    setEditing(false);
  };

  if (!user) {
    return <div className="text-white">Loading...</div>; // Handle the case where user data is not available
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
      <header className="flex items-center gap-6 mb-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.profilePic} alt="Profile Picture" />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold text-white">{user.name}</h1>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </header>
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Contact Information</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-300">
            <MdEmail className="text-xl" />
            {editing ? (
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                className="bg-gray-700 text-gray-300 border border-gray-600 rounded-md p-2"
              />
            ) : (
              <span>{user.email}</span>
            )}
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <MdPhone className="text-xl" />
            {editing ? (
              <input
                type="text"
                name="phoneNumber"
                value={formValues.phoneNumber}
                onChange={handleInputChange}
                className="bg-gray-700 text-gray-300 border border-gray-600 rounded-md p-2"
              />
            ) : (
              <span>{user.id}</span>
            )}
          </div>
        </div>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Social Links</h2>
        <div className="flex gap-4">
          <a href={user.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-100">
            <FaGithub className="text-2xl" />
          </a>
          <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-100">
            <FaLinkedin className="text-2xl" />
          </a>
          <a href={user.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-100">
            <FaTwitter className="text-2xl" />
          </a>
        </div>
      </section>
      <Button onClick={handleEditToggle} className="mt-4" variant="outline">
        <FaEdit className="mr-2" />
        {editing ? 'Save Changes' : 'Edit Profile'}
      </Button>
      {editing && (
        <form onSubmit={handleSubmit} className="mt-4">
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Save
          </Button>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
