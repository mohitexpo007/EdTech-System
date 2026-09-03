import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import IconBtn from "../../common/IconBtn"
import {VscEdit} from "react-icons/vsc"


const MyProfile=()=>{


  const {user}=useSelector((state)=>state.profile)
  const navigate=useNavigate();

  return(
    <div className="text-richblack-5">

      <h1 className="text-3xl font-medium mb-8">
        My Profile
      </h1>
      
      {/* section 1 */}
      <div className="flex items-center justify-between rounded-md border border-richblack-700 bg-richblack-800 p-6 mb-6">
        <div className="flex items-center gap-x-4">
          <img src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[78px] rounded-full object-cover"/>
          <div>
            <p className="text-lg font-semibold"> {user?.firstName+" "+user?.lastName} </p>
            <p className="text-sm text-richblack-300"> {user?.email} </p>
          </div>
        </div>
        <IconBtn 
          text="Edit"
          onclick={()=>{
            navigate("/dashboard/settings")
          }}>
            {/* add the icon */}
            <VscEdit/>
          </IconBtn>
      </div>

      {/* section 2 */}
      <div className="rounded-md border border-richblack-700 bg-richblack-800 p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-semibold">
            Personal Details
          </h2>

          <IconBtn 
            text="Edit"
            onclick={()=>{
              navigate("/dashboard/settings")
            }}>
              {/* add the icon */}
              <VscEdit/>
          </IconBtn>
        </div>

        <div className="grid grid-cols-2 gap-x-20 gap-y-6">
          <div>
            <p className="text-sm text-richblack-400 mb-1">
              First Name
            </p>
            <p className="text-sm text-richblack-5">
              {user?.firstName}
            </p>
          </div>

          <div>
            <p className="text-sm text-richblack-400 mb-1">
              Last Name
            </p>
            <p className="text-sm text-richblack-5">
              {user?.lastName}
            </p>
          </div>

          <div>
            <p className="text-sm text-richblack-400 mb-1">
              Email
            </p>
            <p className="text-sm text-richblack-5">
              {user?.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-richblack-400 mb-1">
              Phone Number
            </p>
            <p className="text-sm text-richblack-5">
              {user?.contactNumber ? user?.contactNumber : "Add Phone Number"}
            </p>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default MyProfile