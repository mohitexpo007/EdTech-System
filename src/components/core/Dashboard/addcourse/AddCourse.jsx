import RenderSteps from "./RenderSteps"

export default function AddCourse(){
  return(
    <>
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-medium text-richblack-5 mb-8">Add Course</h1>

            <div className="mb-8">
              <RenderSteps/>
            </div>
          </div>

          <div className="lg:col-span-1 mr-16">
            <div className="rounded-md border border-richblack-700 bg-richblack-800 p-6 text-richblack-5">
              <p className="text-lg font-semibold mb-5">⚡ Course Upload Tips</p>
              <ul className="space-y-4 text-sm text-richblack-200">
                <li>• Set the Course Price option or make it free</li>
                <li>• Standard size for the course thumbnail is 1024x576.</li>
                <li>• Video section controls the course overview video.</li>
                <li>• Course Builder is where you create & organize a course.</li>
                <li>• Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                <li>• Information from the Additional Data section shows up on the course single page.</li>
                <li>• Make Announcements to notify any important</li>
                <li>• Notes to all enrolled students at once.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}