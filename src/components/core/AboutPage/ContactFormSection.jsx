import ContactUsForm from "../../common/ContactPage/ContactUsForm";
import Footer from "../../common/Footer";

const ContactFormSection=()=>{
  return(
    <div className="w-full max-w-[900px] mx-auto px-4 py-16 sm:py-20">
      <h1 className="text-center text-3xl sm:text-4xl font-semibold leading-[44px] text-richblack-5">
        Get in Touch
      </h1>
      <p className="text-center mt-3 text-base sm:text-lg text-richblack-400">
        We’d love to here for you, Please fill out this form.
      </p>
      <div className="mt-14 sm:mt-16">
        <ContactUsForm/>
      </div>
    </div>
  )
}

export default ContactFormSection;