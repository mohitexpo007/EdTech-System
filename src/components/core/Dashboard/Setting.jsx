import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CountryCode from "../../../data/countrycode.json"

import IconBtn from "../../common/IconBtn";
import { updateDisplayPicture, updateProfile } from "../../../services/operations/SettingsApi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

const Setting = () => {

  const { user } = useSelector((state) => state.profile);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //image update
  const [formData, setFormData] = useState(new FormData());
  const { token } = useSelector((state) => state.auth);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("image", file);
    setFormData(data);
  };

  const onChangeHandler = () => {
    dispatch(updateDisplayPicture(formData,token));
  };

  //profile update
  const [profileFormData,setProfileFormData]=useState({
      dateOfBirth:user?.additionalDetails?.dateOfBirth || "",
      gender:user?.additionalDetails?.gender || "",
      contactNumber:user?.additionalDetails?.contactNumber || "",
      about:user?.additionalDetails?.about || "",
      countryCode:user?.additionalDetails?.countryCode || ""
  })
  const handleOnChange = (e) => {
    setProfileFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const onProfileChangeHandler=()=>{
    dispatch(updateProfile(profileFormData,token));
  }

  //password manage
  const [passwordData,setPasswordData]=useState({
    oldPassword:"",
    newPassword:""
  })
  const passwordHandler = (e) => {
    setPasswordData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const {oldPassword,newPassword}=passwordData

  const {dateOfBirth,gender,contactNumber,about,countryCode}=profileFormData;

  return(
    <div className="text-richblack-5 max-w-[1000px] mx-auto pb-10">

      <h1 className="text-2xl font-semibold text-richblack-5 mb-6">Edit Profile</h1>

      {/* section 1 */}
      <section className="mb-6">
        <div className="rounded-md border border-richblack-700 bg-richblack-800 p-7 flex items-center gap-x-7">

          <img
            src={user?.image}
            alt="profile"
            className="w-[90px] h-[90px] rounded-full object-cover"
          />

          <div className="flex flex-col gap-y-4">

            <p className="text-xl font-semibold text-richblack-5">Change Profile Picture</p>

            <div className="flex items-center gap-x-3">

              <label htmlFor="image" className="cursor-pointer rounded-md bg-yellow-50 px-5 py-2 text-sm font-semibold text-richblack-900 hover:bg-yellow-100">
                Change
              </label>

              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              <button onClick={onChangeHandler} className="rounded-md bg-richblack-700 px-5 py-2 text-sm font-semibold text-richblack-100 hover:bg-richblack-600">Upload</button>

            </div>

          </div>

        </div>

      </section>

      {/* section 2 */}
      <section className="mb-6">
        <div className="rounded-md border border-richblack-700 bg-richblack-800 p-7">
          <h2 className="text-xl font-semibold text-richblack-5 mb-7">Profile Information</h2>

          <div className="grid grid-cols-2 gap-x-7 gap-y-7">

            <div>
              <label className="text-base text-richblack-5 mb-2 block">Display Name</label>
              <h2 className="text-lg font-semibold text-richblack-5">{user?.firstName} {user?.lastName}</h2>
              <p className="text-sm text-richblack-400 mt-2">Name entered above will be used for all issued certificates.</p>
            </div>

            <div>
              <label className="text-base text-richblack-5 mb-2 block">Profession</label>
              <select className="w-full rounded-md bg-richblack-700 px-4 py-3 text-base font-semibold text-richblack-5 outline-none border border-richblack-600 focus:bg-yellow-100 focus:text-richblack-900">
                <option>Developer</option>
                <option>Student</option>
                <option>Instructor</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="text-base text-richblack-5 mb-2 block">Date of Birth</label>
              <input
                name="dateOfBirth"
                type="date"
                onChange={handleOnChange}
                value={dateOfBirth}
                className="w-full rounded-md bg-richblack-700 px-4 py-3 text-base font-semibold text-richblack-5 outline-none border border-richblack-600 focus:bg-yellow-100 focus:text-richblack-900"
              />
            </div>

            <div>
              <label className="text-base text-richblack-5 mb-2 block">Gender<span className="text-pink-200">*</span></label>
              <div className="flex items-center gap-x-6 rounded-md bg-richblack-700 px-4 py-3 border border-richblack-600">
                <label className="flex items-center gap-x-2 text-base font-semibold text-richblack-5 cursor-pointer">
                  <input type="radio" name="gender" value="Male" className="accent-yellow-50 w-5 h-5" checked={gender === "Male"} onChange={handleOnChange}/>
                  Male
                </label>

                <label className="flex items-center gap-x-2 text-base font-semibold text-richblack-5 cursor-pointer">
                  <input type="radio" name="gender" value="Female" className="accent-yellow-50 w-5 h-5" checked={gender === "Female"} onChange={handleOnChange}/>
                  Female
                </label>

                <label className="flex items-center gap-x-2 text-base font-semibold text-richblack-5 cursor-pointer">
                  <input type="radio" name="gender" value="Other" className="accent-yellow-50 w-5 h-5" checked={gender === "Other"} onChange={handleOnChange}/>
                  Other
                </label>
              </div>
            </div>

            <div>
              <label className="text-base text-richblack-5 mb-2 block">Phone Number<span className="text-pink-200">*</span></label>
              <div className="flex gap-x-3">
                <select value={countryCode} onChange={handleOnChange} className="w-full h-[48px] rounded-md bg-richblack-800 px-3 text-base font-semibold text-richblack-5 outline-none border border-richblack-700 focus:bg-white focus:text-richblack-900" name="countryCode" id="dropdown">
                  {
                    CountryCode.map((element,index)=>{
                      return(
                        <option key={index} value={element.code}>
                          {element.code} -{element.country}
                        </option>
                      )
                    })
                  }
                </select>

                <input
                  name="contactNumber"
                  type="text"
                  value={contactNumber}
                  className="flex-1 rounded-md bg-richblack-700 px-4 py-3 text-base font-semibold text-richblack-5 placeholder:text-richblack-400 outline-none border border-richblack-600 focus:bg-yellow-100 focus:text-richblack-900"
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <div>
              <label className="text-base text-richblack-5 mb-2 block" >About</label>
              <input
                name="about"
                type="text"
                value={about}
                className="w-full rounded-md bg-richblack-700 px-4 py-3 text-base font-semibold text-richblack-5 placeholder:text-richblack-400 outline-none border border-richblack-600 focus:bg-yellow-100 focus:text-richblack-900"
                onChange={handleOnChange}
              />
            </div>

          </div>
           <div className="flex justify-end gap-x-3 mb-4 mt-10">
              <button className="rounded-md bg-richblack-700 px-5 py-2 text-sm font-semibold text-richblack-100 hover:bg-richblack-600 mt" onClick={()=>navigate(-1)}>Cancel</button>
              <button className="cursor-pointer rounded-md bg-yellow-50 px-5 py-2 text-sm font-semibold text-richblack-900 hover:bg-yellow-100" onClick={onProfileChangeHandler}>Save</button>
            </div>
        </div>
      </section>

      

      {/* section 3 */}
      <section className="mb-6">
        <div className="rounded-md border border-richblack-700 bg-richblack-800 p-6">

          <h2 className="text-xl font-semibold text-richblack-5 mb-8">
            Password
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Current Password */}
            <div>
              <label className="text-base text-richblack-5 mb-2 block">
                Current Password
                <span className="text-pink-200">*</span>
              </label>

              <div className="relative">
                <input
                  name="oldPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={oldPassword}
                  placeholder="Enter Current Password"
                  className="w-full rounded-md bg-richblack-700 px-4 py-4 pr-12 text-base font-semibold text-richblack-5 placeholder:text-richblack-400 outline-none border border-richblack-600 focus:border-yellow-50"
                  onChange={passwordHandler}
                />

                <span
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-[10] cursor-pointer"
                >
                  {showCurrentPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
              </div>
            </div>

            {/* Change Password */}
            <div>
              <label className="text-base text-richblack-5 mb-2 block">
                Change Password
                <span className="text-pink-200">*</span>
              </label>

              <div className="relative">
                <input
                  name="newPassword"
                  value={newPassword}
                  type={showChangePassword ? "text" : "password"}
                  placeholder="Enter New Password"
                  className="w-full rounded-md bg-richblack-700 px-4 py-4 pr-12 text-base font-semibold text-richblack-5 placeholder:text-richblack-400 outline-none border border-richblack-600 focus:border-yellow-50"
                  onChange={passwordHandler}
                />

                <span
                  onClick={() => setShowChangePassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-[10] cursor-pointer"
                >
                  {showChangePassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

          </div>
        )
      }

export default Setting;