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

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/update-password/:id" element={<UpdatePassword/>}/>
        <Route path="/verify-email" element={<VerifyEmail/>}/>
        <Route path="/about" element={<About/>}/>

        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
          }>

          <Route path="my-profile" element={<MyProfile/>}/>
          <Route path="settings" element={<Setting/>}/>
        </Route>

        <Route path="*" element={<Error/>}/>

      </Routes>
    </div>
  );
}

export default App;