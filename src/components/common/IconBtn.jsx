const IconBtn=({
  text,
  onclick,
  children,
  disabled,
  outline=false,
  customClasses,
  type
})=>{
  return(
    <button
    disabled={disabled}
    onClick={onclick}
    type={type}
    className={`flex items-center justify-center gap-x-2 rounded-md bg-yellow-50 px-5 py-3 text-[16px] font-semibold text-richblack-900 shadow-[0_3px_0_0_#b88600] hover:scale-[0.98] transition-all duration-200 ${customClasses || ""}`}
    >
      {
        children ? (
          <>
            {children}
            <span>
              {text}
            </span>
          </>
        ) : (text)
      }
    </button>
  )
}

export default IconBtn;