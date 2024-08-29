import React, { useState } from 'react';
import { Camera, Edit2, Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useAuth from '@/hooks/useAuth';
import useUser from '@/hooks/useUser';

interface SocialMediaLink {
  type: string;
  url: string;
}

interface ProfileData {
  name: string;
  userId: string;
  email: string;
  phoneNumber: string;
  socialLinks: SocialMediaLink[];
  gender: string;
  dob: Date;
}

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { user } = useAuth();
  const { updateUserDetail } = useUser();

  const [profile, setProfile] = useState<ProfileData>({
    name: user?.name || "John Wick",
    userId: user?.id || 'johndoe123',
    email: user?.email || 'john.doe@example.com',
    phoneNumber: user?.phoneNumber || '+1 (555) 123-4567',
    socialLinks: [
      { type: 'Github', url: user?.social?.type == "github" ? user?.social?.url || 'github.com/johndoe' : 'github.com/johndoe' },
      { type: 'Twitter', url: 'twitter.com/johndoe' },
      { type: 'Linkedin', url: 'linkedin.com/in/johndoe' },
      { type: 'Instagram', url: 'instagram.com/johndoe' }
    ],
    gender: user?.gender||"other",
    dob: new Date('2024-03-11')
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialLinkChange = (index: number, value: string) => {
    setProfile(prev => {
      const newLinks = [...prev.socialLinks];
      newLinks[index].url = value;
      return { ...prev, socialLinks: newLinks };
    });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = async () => {
    await updateUserDetail({
      name: profile.name,
      phoneNumber: profile.phoneNumber,
      email: profile.email,
      gender: profile.gender,
      dateOfBirth: profile.dob,
      social: profile.socialLinks,
    });
    console.log("success");
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
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-white capitalize">Name</label>
                {isEditing ? (
                  <Input
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-blue-800">{profile.name}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-white capitalize">Email</label>
                {isEditing ? (
                  <Input
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-blue-800">{profile.email}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-white capitalize">Phone Number</label>
                {isEditing ? (
                  <Input
                    name="phoneNumber"
                    value={profile.phoneNumber}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-blue-800">{profile.phoneNumber}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-white capitalize">Gender</label>
                {isEditing ? (
                  <Input
                    name="gender"
                    value={profile.gender}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-blue-800">{profile.gender}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-white capitalize">Date of Birth</label>
                {isEditing ? (
                  <Input
                    name="dob"
                    type="date"
                    value={profile.dob.toISOString().split('T')[0]}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-blue-800">{profile.dob.toDateString()}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-white capitalize">Social Links</label>
                {profile.socialLinks.map((link, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {isEditing ? (
                      <Input
                        value={link.url}
                        onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                        className="mt-1 flex-1"
                      />
                    ) : (
                      <p className="text-blue-800">{`${link.type}: ${link.url}`}</p>
                    )}
                  </div>
                ))}
              </div>
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
            {isEditing && (
              <Button onClick={saveChanges} className="mr-2 mb-2 w-full sm:w-auto">Save Changes</Button>
            )}
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
