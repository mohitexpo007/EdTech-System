import "./App.css";
import {Route,Routes} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "../src/components/common/Navbar"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Error from "./pages/Error"
import Setting from "./components/core/Dashboard/Setting";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import AddCourse from "./components/core/Dashboard/addcourse/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses"
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import ViewCourse from "./pages/ViewCourse";
import InstructorChart from "./components/core/Dashboard/InstructorDashboard/InstructorChart";
import Contact from "./pages/Contact";
import OpenRoute from "./components/core/Auth/OpenRoute"

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route path="/contact" element={<Contact />} />

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/update-password/:id" element={<UpdatePassword/>}/>
        <Route path="/verify-email" element={<VerifyEmail/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/category/:catalogName" element={<Catalog/>}/>
        <Route path="/courses/:courseId" element={<CourseDetails/>}/>

        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
          }>

          <Route path="my-profile" element={<MyProfile/>}/>
          <Route path="settings" element={<Setting/>}/>
          <Route path="enrolled-courses" element={<EnrolledCourses/>}/>
          <Route path="cart" element={<Cart/>}/>
          <Route path="add-course" element={<AddCourse/>}/>

          <Route path="my-courses" element={<MyCourses/>}/>
          <Route path="edit-course/:courseId" element={<EditCourse/>}/>
          <Route path="instructor" element={<InstructorChart/>}/>
        </Route>

        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
        <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
        </Route>


        <Route path="*" element={<Error/>}/>

      </Routes>
    </div>
  );
}

export default App;