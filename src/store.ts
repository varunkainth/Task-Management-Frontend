import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import userReducer from "@/features/user/userSlice";
import projectReducer from "@/features/project/projectSlice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    projects: projectReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
