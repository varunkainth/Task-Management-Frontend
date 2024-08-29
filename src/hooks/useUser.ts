import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {RootState,AppDispatch} from "@/store"
import { user } from "@/types/auth";
import { updateUserDetails } from "@/features/user/userSlice";


const useUser = ()=>{
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((state:RootState)=>state.user)
    console.log(user)

    const updateUser = useCallback(
        (credential:user) =>dispatch(updateUserDetails(credential))
    )
}