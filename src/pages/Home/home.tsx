import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";

interface UserProfile {
  name: string;
  email: string;
  phoneNumber: string;
  profilePic: string;
}

const HomePage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { logoutUser } = useAuth();

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      setUserProfile(JSON.parse(userFromStorage));
    }
  }, []);

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading user profile...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Homepage</h1>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">User Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src={userProfile.profilePic} alt={userProfile.name} />
            <AvatarFallback>{userProfile.name}</AvatarFallback>
          </Avatar>
          <div className="space-y-2 text-center">
            <p>
              <span className="font-semibold">Name:</span> {userProfile.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {userProfile.email}
            </p>
            <p>
              <span className="font-semibold">Phone Number:</span>{" "}
              {userProfile.phoneNumber}
            </p>
          </div>
        </CardContent>
        <Button
          variant="default"
          className="w-full"
          onClick={() => logoutUser()}
        >
          Logout
        </Button>
      </Card>
    </div>
  );
};

export default HomePage;
