import { useSelector } from "react-redux"
import {Outlet} from "react-router-dom"
import Sidebar from "../components/core/Dashboard/Sidebar"

const Dashboard=()=>{
  
  const {loading: authLoading}=useSelector((state)=>state.auth);
  const {loading: profileLoading}=useSelector((state)=>state.profile);

  if(profileLoading || authLoading){
    return(
      <div className="mt-10">
        Loading....
      </div>
    )
  }

  return(
    <div className="relative flex min-h-[calc(100vh-3.5rem)] bg-richblack-900">
      <Sidebar/>
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="w-full py-10 px-6">
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;