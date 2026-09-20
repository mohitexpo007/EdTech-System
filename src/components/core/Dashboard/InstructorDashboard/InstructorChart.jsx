import { useEffect, useState } from "react"
import { Chart, registerables } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { FaArrowTrendUp, FaBookOpen, FaCalendar, FaChartSimple, FaIndianRupeeSign, FaUsers } from "react-icons/fa6"
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI"
import { useSelector } from "react-redux"

Chart.register(...registerables)

export default function InstructorChart() {
  const [courses, setCourses] = useState([])
  const [currChart, setCurrChart] = useState("students")

  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await fetchInstructorCourses(token)

        console.log("Instructor courses result:", result)

        if (Array.isArray(result)) {
          setCourses(result)
        }
      } catch (error) {
        console.log("Error fetching instructor courses:", error)
        setCourses([])
      }
    }

    if (token) {
      fetchCourses()
    }
  }, [token])

  const chartColors = ["#ff6b1a", "#f13b83", "#8b3dff", "#168cff", "#12c6d6", "#58c86b", "#ffd12f"]

  const totalStudents = courses.reduce(
    (total, course) =>
      total + (course?.studentsEnrolled?.length || 0),
    0
  )

  const totalRevenue = courses.reduce(
    (total, course) =>
      total +
      (course?.studentsEnrolled?.length || 0) *
        (Number(course?.price) || 0),
    0
  )

  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map(
          (course) => course?.studentsEnrolled?.length || 0
        ),
        backgroundColor: courses.map((_, index) => chartColors[index % chartColors.length]),
        borderWidth: 1,
      },
    ],
  }

  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map(
          (course) =>
            (course?.studentsEnrolled?.length || 0) *
            (Number(course?.price) || 0)
        ),
        backgroundColor: courses.map((_, index) => chartColors[index % chartColors.length]),
        borderWidth: 1,
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    cutout: "58%",
    layout: { padding: 8 },
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#c3cad5",
          padding: 12,
          boxWidth: 10,
          usePointStyle: true,
        },
      },
    },
  }

  return (
    <div className="instructor-dashboard-chart flex min-h-[calc(100vh-3.5rem)] flex-1 flex-col gap-6 p-6 text-richblack-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-orange-300"><FaChartSimple /> Analytics</div>
          <h1 className="text-3xl font-semibold">Visualize Your Impact</h1>
          <p className="mt-2 text-sm text-richblack-300">Track your students, revenue and course performance all in one place.</p>
        </div>
        <button type="button" className="instructor-dashboard-chart__filter flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-richblack-200"><FaCalendar /> All Time <span>⌄</span></button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="instructor-dashboard-chart__metric instructor-dashboard-chart__metric--orange"><span className="instructor-dashboard-chart__metric-icon"><FaUsers /></span><div><p>Total Students</p><strong>{totalStudents}</strong><small><FaArrowTrendUp /> 12% <em>vs last month</em></small></div></div>
        <div className="instructor-dashboard-chart__metric instructor-dashboard-chart__metric--gold"><span className="instructor-dashboard-chart__metric-icon"><FaIndianRupeeSign /></span><div><p>Total Revenue</p><strong>₹{totalRevenue.toLocaleString("en-IN")}</strong><small><FaArrowTrendUp /> 18% <em>vs last month</em></small></div></div>
        <div className="instructor-dashboard-chart__metric instructor-dashboard-chart__metric--blue"><span className="instructor-dashboard-chart__metric-icon"><FaBookOpen /></span><div><p>Total Courses</p><strong>{courses.length}</strong><small>Published &amp; Active</small></div></div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="instructor-dashboard-chart__tabs flex rounded-xl p-1">
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-200 ${
            currChart === "students"
              ? "instructor-dashboard-chart__tab--active text-white"
              : "text-richblack-300"
          }`}
        >
          <FaUsers className="mr-2 inline" /> Students
        </button>
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-200 ${
            currChart === "income"
              ? "instructor-dashboard-chart__tab--active text-white"
              : "text-richblack-300"
          }`}
        >
          <FaChartSimple className="mr-2 inline" /> Income
        </button>
        </div>
        <button type="button" className="instructor-dashboard-chart__report rounded-xl px-4 py-3 text-sm font-semibold text-orange-300">View Detailed Report <span className="ml-2">→</span></button>
      </div>

      <div className="instructor-dashboard-chart__distribution flex-1 rounded-2xl p-5 md:p-6">
        <div className="flex items-start justify-between gap-4"><div><h2 className="text-xl font-semibold">{currChart === "students" ? "Students Distribution" : "Income Distribution"}</h2><p className="mt-1 text-sm text-richblack-300">See how your courses are performing across the platform.</p></div><span className="rounded-full bg-white/5 px-4 py-2 text-xs text-richblack-300">{currChart === "students" ? `Total ${totalStudents} students` : `Total ₹${totalRevenue.toLocaleString("en-IN")}`}</span></div>
      <div className="relative mx-auto mt-4 h-[390px] w-full">
        {courses.length > 0 ? (
          <Doughnut
            data={
              currChart === "students"
                ? chartDataStudents
                : chartIncomeData
            }
            options={options}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-richblack-300">
            No course data available
          </div>
        )}
      </div>
      </div>
    </div>
  )
}