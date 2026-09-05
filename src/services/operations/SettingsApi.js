import { toast } from "react-hot-toast"

import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { settingsEndpoints } from "../apis"
import { logout } from "./authAPI"
import { useDispatch } from "react-redux"

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints


export function updateDisplayPicture(formData,token){
  return async (dispatch)=>{
    try{ 
    const response=await apiConnector("PUT",UPDATE_DISPLAY_PICTURE_API,formData,
      {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
    );

    console.log( "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",response);

    if(!response.data.success){
      throw new Error(response.data.message)
    }

    toast.success("Display Picture Updated Successfully");
    dispatch(setUser(response.data.user))
    }
    catch(error){
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
      toast.error("Could Not Update Display Picture")
    }
  }
}

export function updateProfile(profileFormData,token){
  return async (dispatch,getState)=>{
    try{
      const response=await apiConnector("PUT",UPDATE_PROFILE_API,profileFormData,
        {
          Authorization: `Bearer ${token}`,
        }
      )

      if(!response.data.success){
        throw new Error(response.data.message)
      }

      const { user } = getState().profile;
      dispatch(setUser({...user,additionalDetails:response.data.profileDetails}))
      toast.success("Profile Updated Successfully");
    }
    catch(error){
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
      toast.error("Could Not Update Profile")
    }
  }
}
