import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { studentEndpoints } from "../apis";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";


const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API}=studentEndpoints

//step 1=>script attach krna
function loadSript(src){
  return new Promise((resolve)=>{
    const script=document.createElement("script")
    script.src=src;

    //promise ya to resolve hoga
    script.onload=()=>{
      resolve(true);
    }
    //ya fir reject hoga
    script.onerror=()=>{
      resolve(false);
    }
    document.body.appendChild(script)
  })
}

//step2=>course buy krna
export async function buyCourse(token,courses,userDetails,navigate,dispatch){
  const toastId=toast.loading("Loading...");
  try{
    //laod script
    const res=await loadSript("https://checkout.razorpay.com/v1/checkout.js");

    if(!res){
      toast.error("Razorpay SDK failed to load")
      return;
    }

    //initiate the order
    const orderResponse=await apiConnector("POST",COURSE_PAYMENT_API,{courses},{Authorization: `Bearer ${token}`})

    console.log("PRINTING ORDER RESPONSE",orderResponse);

    if(!orderResponse.data.success){
      throw new Error(orderResponse.data.message);
    }

    console.log("RAZORPAY",process.env.REACT_APP_RAZORPAY_KEY);

    //options and object create krna hai
    const options={
      key: process.env.REACT_APP_RAZORPAY_KEY,
      currency : orderResponse.data.message.currency,
      amount:`${orderResponse.data.message.amount}`,
      order_id: orderResponse.data.message.id,
      name:"StudyNotion",
      description:"ThankYou for purchasing the course",
      prefill:{
        name:`${userDetails.firstName}`,
        email:userDetails.email
      },

      //after successful payment this handler function is called which sends payment successful ka mail and payment ko verify krne wali api call krega
      handler:function(response){
        //send successful mail
        sendPaymentSuccessEmail(response,orderResponse.data.message.amount,token);
        //verifyPayment
        verifyPayment({...response,courses},token,navigate,dispatch)
      }
    }

    const paymentObject=new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed",function(response){
      toast.error("oops, payment failed")
    })
  }
  catch(error){
    console.log("PAYMENT API ERROR...",error);
    toast.error("Could not make Payment");
  }
  toast.dismiss(toastId)
}

async function sendPaymentSuccessEmail(response,amount,token){
  try {
    await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
      orderId: response.razorpay_order_id,
      paymentId: response.razorpay_payment_id,
      amount,
    },{
      Authorization: `Bearer ${token}`
    })
  }
  catch(error){
    console.log("PAYMENT SUCCESS EMAIL ERROR...",error)
  }
}

async function verifyPayment(bodyData,token,navigate,dispatch){
  const toastId=toast.loading("Verifying Payment....");

  dispatch(setPaymentLoading(true));
  try{
    const response=await apiConnector("POST",COURSE_VERIFY_API,bodyData,{
      Authorization: `Bearer ${token}`
    })

    if(!response.data.success){
      throw new Error(response.data.message);
    }

    toast.success("payment Successful, you are added to the course");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart())
  }
  catch(error){
    console.log("PAYMENT VERIFY ERROR...",error);
    toast.error("Could not verify payment")
  }

  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
}