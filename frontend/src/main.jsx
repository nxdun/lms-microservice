import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// LOGIn
import { LogoutHandler } from "src/services/logoutHandler";
import LoginScreen from "src/components/auth/login";
import LoginLanding from "src/components/auth";
import RegisterScreen from "src/components/auth/register";
import ErrorPath from "src/components/common/nopath";
import BrowseScreen from "src/components/browsecourses/browsescreen";
import CourseSPA from "src/components/browsecourses/courseSPA";

//Payment
import PaymentPage from "src/components/payment/Payment";
import SuccessPage from "src/components/payment/Success";
import CancelPage from "src/components/payment/Cancel";

//Landing Page
import LandingPage from "src/components/LandingPage.jsx";
// Other Scenes
import {
  Dashboard,
  Team,
  Invoices,
  Contacts,
  Form,
  FAQ,
  Calendar,
  Course,
  ManageCourse,
} from "src/components/admindashboard/scenes";



//Staff Portal
import { StaffLogin, NotFound, StaffRegister, ForgetPWD } from "src/components/auth/staffPortal";


const apiUrl = 'http://localhost:3001';//API URL for paymeent gateway


const user = localStorage.getItem("token");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={<LandingPage />} />

        {/*Authentication Routes */}
        <Route path="/login" element={<LoginLanding />}>
          <Route path="learner" element={<LoginScreen />} />
          {/* <Route path="lecturer" element={< />} />
          <Route path="admin" element={< />} /> */}
        </Route>
        
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/logout" element={<LogoutHandler />} />

        {/*Dashboard Routes */}
        <Route path="/admin" element={<App />}>
        {user && <Route path="dashboard/*" element={<Dashboard />} />}
          {user && <Route path="team" element={<Team />} />}
          {user && <Route path="contacts" element={<Contacts />} />}
          { user && <Route path="invoices" element={<Invoices />} />}
          {user && <Route path="form" element={<Form />} />}
          {user && <Route path="calendar" element={<Calendar />} />}
          {user && <Route path="faq" element={<FAQ />} />}
          {user && <Route path="course" element={<Course />} />}
          {user && <Route path="managecourse" element={<ManageCourse />} />}

          <Route path="/admin" element={<Navigate replace to="/" />} />

        </Route>

        {/*Learner Routes */}
        <Route path="/browse" element={<BrowseScreen />} />
        <Route path="/browse/view/:id" element={<CourseSPA />} />


        {/*Staff Routes */}
        <Route path="/stafflogin" element={<StaffLogin />} />
        <Route path="/staffregister" element={<StaffRegister />} />
        <Route path="/staffforgot" element={<ForgetPWD />} />
        <Route path="/staff/*" element={<NotFound />} />



        {/*Payment Routes */}
        <Route path="/payment" element={<PaymentPage apiUrl={apiUrl} />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />

        {/*Error Route */}
        <Route path="/*" element={<ErrorPath />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
