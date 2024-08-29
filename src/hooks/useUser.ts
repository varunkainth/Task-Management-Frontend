import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  deleteUser,
  getAllUsers,
  getUserDetails,
  updateProfilePic,
  updateUserDetails,
  updateUserPassword,
} from "@/features/user/userSlice";
import { user, UserData } from "@/types/auth";

const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  // console.log(user);

  const getUserDetail = useCallback(
    (userId: UserData) => {
      dispatch(getUserDetails(userId));
    },
    [dispatch]
  );

  const getAllUsersData = useCallback(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const updateUserDetail = useCallback(
    (credential: user) => {
      dispatch(updateUserDetails(credential));
    },
    [dispatch]
  );

  const updatePassword = useCallback(
    (passwordData: { oldPassword: string; newPassword: string }) => {
      dispatch(updateUserPassword(passwordData));
    },
    [dispatch]
  );

  const updateUserProfilePic = useCallback(
    (formData: FormData) => {
      dispatch(updateProfilePic(formData));
    },
    [dispatch]
  );

  const deleteuser = useCallback(() => {
    dispatch(deleteUser());
  }, [dispatch]);

  return {
    ...user,
    getUserDetail,
    getAllUsersData,
    updateUserDetail,
    updatePassword,
    updateUserProfilePic,
    deleteuser,
  };
};

export default useUser;