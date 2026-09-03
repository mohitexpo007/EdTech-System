import {sidebarLinks} from "../../../data/dashboard-links"
import {logout} from "../../../services/operations/authAPI"
import { useSelector } from "react-redux"
import SidebarLink from "./SidebarLink"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useState } from "react"
import ConfirmationModal from "../../common/ConfirmationModal"
import { VscSignOut } from "react-icons/vsc"

const Sidebar=()=>{
  const {user,loading:profileLoading}=useSelector((state)=>state.profile)
  const {loading:authLoading}=useSelector((state)=>state.auth);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [confirmationModal,setConfirmationModal]=useState(null);

  if(profileLoading || authLoading){
    return(
      <div className="mt-10 text-richblack-200">
        Loading...
      </div>
    )
  }

  return( 
    <div className="h-full">
      <div className="flex min-w-[222px] flex-col border-r border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10">
        
        <div className="flex flex-col">
          {
            sidebarLinks.map((link)=>{
              if(link.type && user?.accountType !== link.type) return null
              return(
                <SidebarLink key={link.id} link={link} iconName={link.icon}/>
              )
            })
          }
        </div>

        <div className="mx-auto mt-6 mb-6 h-[1px] w-11/12 bg-richblack-600"></div>

        <div>
          <SidebarLink
          link={{name:"Settings",path:"/dashboard/settings"}}
          iconName="VscSettingsGear"
          />
        </div>

        <button className="mt-1 px-8 py-2 text-left text-sm font-medium text-richblack-200 transition-all duration-200 hover:bg-richblack-700 hover:text-richblack-5" onClick={()=>{ setConfirmationModal({
            text1:"Are You Sure ?",
            text2:"You will be logged out of your Account",
            btn1Text:"Logout",
            btn2Text:"Cancel",
            btn1Handler:()=>dispatch(logout(navigate)),
            btn2Handler:()=>setConfirmationModal(null)
          })
            
          }}>
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg"/>
              <span>Logout</span>
            </div>
          </button>

      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}

    </div>
  )
}

export default Sidebar