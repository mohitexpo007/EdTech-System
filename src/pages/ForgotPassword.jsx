import { useState } from "react";
import { useSelector } from "react-redux"


const ForgotPassword=()=>{

  const {loading}=useSelector((state)=>state.auth);

  const [emailSent,setEmailSent]=useState(false);
  const [email,setEmail]=useState("");

  return(
    <div>
      {
        loading ? (
          <div> Loading... </div>
        ):(
          //We are checking according to email is sent or not use emailSent flag which page to render resetPassword page or mail send page

          <div>
            <h1>
              {
                !emailSent ? "Reset your Password" : "Check Your Email"
              }
            </h1>

            <p>
              {
                !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email}`
              }
            </p>

              <form>
                {
                  !emailSent && (
                    <label>
                      <p>Email Address*</p>
                      <input
                        required
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder="Enter Your Email Address"
                      ></input>
                    </label>
                  )
                }


                <button>
                  {
                    !emailSent ? "Reset Password" : "Resend Email"
                  }
                </button>
              </form>
              
              <div>
                <button>
                  Back to login
                </button>
              </div>
          </div>
        )
      }
    </div>
  )
}

export default ForgotPassword;