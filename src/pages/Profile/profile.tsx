import React, { useState } from 'react';
import { Camera, Edit2, Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useAuth from '@/hooks/useAuth';

interface ProfileData {
  name: string;
  userId: string;
  email: string;
  phoneNumber: string;
  github: string;
  twitter: string;
  linkedin: string;
  instagram: string;
}

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const {user} = useAuth();
  const [profile, setProfile] = useState<ProfileData>({
    name: user?.name || "John Wick",
    userId: user?.id||'johndoe123',
    email: user?.email||'john.doe@example.com',
    phoneNumber: user?.phoneNumber||'+1 (555) 123-4567',
    github: user?.social?.url||'github.com/johndoe',
    twitter: 'twitter.com/johndoe',
    linkedin: 'linkedin.com/in/johndoe',
    instagram: 'instagram.com/johndoe'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = () => {
    // Here you would typically send the updated profile to a backend
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-start">
            <div className="flex flex-col items-center mb-6 md:w-1/3 md:mr-6">
              <Avatar className="w-32 h-32 mb-4">
                <AvatarImage src={user?.profilePic} alt="Profile" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="w-full md:w-auto">
                <Camera className="mr-2 h-4 w-4" /> Change Photo
              </Button>
            </div>

            <div className="space-y-4 md:w-2/3">
              {Object.entries(profile).map(([key, value]) => (
                <div key={key} className="flex flex-col space-y-1">
                  <label className="text-sm font-medium text-white capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  {isEditing ? (
                    <Input
                      name={key}
                      value={value}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-blue-800">{value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6 space-x-4 flex-wrap">
            <Button variant="outline" size="icon" className="mb-2">
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="mb-2">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="mb-2">
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="mb-2">
              <Instagram className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-6 flex justify-end flex-wrap">
            {isEditing ? (
              <Button onClick={saveChanges} className="mr-2 mb-2 w-full sm:w-auto">Save Changes</Button>
            ) : null}
            <Button 
              variant="outline" 
              onClick={toggleEdit} 
              className="w-full sm:w-auto"
            >
              {isEditing ? 'Cancel' : <><Edit2 className="mr-2 h-4 w-4" /> Edit Profile</>}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;