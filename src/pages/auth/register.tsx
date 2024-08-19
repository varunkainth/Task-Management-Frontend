/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, ChangeEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider, githubAuthProvider } from "@/firebaseConfig";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RegisterCredentials } from "@/types/auth";
import { validateUser } from "@/utils/validation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import useAuth  from "@/hooks/useAuth";

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterCredentials>({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
    dob: null,
  });
  const [errors, setErrors] = useState<{
    [key in keyof RegisterCredentials]?: string;
  }>({});
  const [searchParams] = useSearchParams();
  const { registerUser, signupWithGoogle, signupWithGithub } = useAuth();

  const { error }: { error: any } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setFormData((prev) => ({ ...prev, email: emailParam }));
    }
  }, [searchParams]);

  useEffect(() => {
    if (error) {
      alert(error.message || "An unknown error occurred.");
      // Clear form data
      setFormData({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        gender: "",
        dob: null,
      });
      setErrors({});
    }
  }, [error]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      return newData;
    });
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({ ...prev, dob: date }));
  };

  const validateForm = () => {
    const { error } = validateUser(formData);

    if (error) {
      const newErrors: { [key in keyof RegisterCredentials]?: string } = {};
      error.details.forEach((detail: any) => {
        const key = detail.context?.key as keyof RegisterCredentials;
        if (key) {
          newErrors[key] = detail.message;
        }
      });
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleRegister = () => {
    if (validateForm()) {
      registerUser(formData);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const idToken = await result.user.getIdToken();
      signupWithGoogle(idToken);
    } catch (err) {
      console.error("Google Sign-Up Error: ", err);
    }
  };

  const handleGitHubSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, githubAuthProvider);
      const idToken = await result.user.getIdToken();
      signupWithGithub(idToken);
    } catch (err) {
      console.error("GitHub Sign-Up Error: ", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-semibold text-center text-white">
          Register
        </h2>
        <div className="space-y-4">
          <div>
            <Label className="text-white">Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <Label className="text-white">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <Label className="text-white">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <Label className="text-white">Phone Number</Label>
            <Input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="mt-1"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>
          <div>
            <Label className="text-white">Gender</Label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="mt-1 bg-gray-700 text-white p-2 rounded-lg w-full"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>
          <div>
            <Label className="text-white">Date of Birth</Label>
            <DatePicker
              selected={formData.dob}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              maxDate={new Date()}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              className="mt-1 w-full ml-5 p-2 rounded-lg bg-gray-700 text-white"
              placeholderText="Select your date of birth"
            />

            {errors.dob && (
              <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
            )}
          </div>
          <Button
            type="button"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
            onClick={handleRegister}
          >
            Register
          </Button>
          <div className="text-center mt-4 text-white">
            <span>Already have an account?</span>
            <Link to="/login" className="text-blue-400 hover:underline ml-1">
              Login
            </Link>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2"
              onClick={handleGoogleSignUp}
            >
              <FcGoogle />
              Sign up with Google
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2"
              onClick={handleGitHubSignUp}
            >
              <FaGithub />
              Sign up with GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
