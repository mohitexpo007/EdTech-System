import { useSelector } from "react-redux"

import authStairsBackground from "../../../assets/Images/auth-stairs-background.png"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="auth-template grid min-h-[calc(100vh-3.5rem)] place-items-center">
      <img className="auth-template__background" src={authStairsBackground} alt="" aria-hidden="true" />
      {loading ? (
        <div className="spinner" />
      ) : (
        <div className="auth-template__shell mx-auto flex w-11/12 max-w-maxContent py-12">
          <div className="auth-template__form mx-auto w-11/12 max-w-[450px] md:mx-0">
            <div className="auth-template__eyebrow">Welcome back</div>
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
              {title}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-richblack-100">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-blue-100">
                {description2}
              </span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
        </div>
      )}
    </div>
  )
}

export default Template