import IconBtn from "./IconBtn"

const ConfirmationModal=({modalData})=>{
  return(
    <div className="fixed inset-0 z-[1000] grid place-items-center bg-black bg-opacity-50">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-700 bg-richblack-800 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <p className="text-xl font-semibold text-richblack-5">
          {modalData.text1}
        </p>
        <p className="mt-2 text-sm text-richblack-300">
          {modalData.text2}
        </p>
        <div className="mt-6 flex items-center justify-end gap-x-4">
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
            />

          <button className="rounded-md bg-richblack-700 px-5 py-3 text-sm font-semibold text-richblack-5 hover:bg-richblack-600" onClick={modalData?.btn2Handler}>
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal