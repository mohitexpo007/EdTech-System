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
    className={`group relative flex items-center justify-center gap-x-2 overflow-hidden rounded-xl border border-[#ff6b00]/40 bg-[#ff6b00] px-5 py-3 text-[16px] font-semibold text-black shadow-[0_8px_30px_rgba(255,107,0,0.12)] transition-all duration-300 ${
      !disabled &&
      "hover:-translate-y-0.5 hover:bg-[#ff7417] hover:shadow-[0_12px_35px_rgba(255,107,0,0.2)] active:translate-y-0"
    } ${customClasses || ""}`}
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