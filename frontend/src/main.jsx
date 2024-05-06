import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

// LOGIn
import { LogoutHandler } from "src/services/logoutHandler";
import LoginScreen from "src/components/auth/login";
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
  ManageCourse
} from "src/components/admindashboard/scenes";

const apiUrl = 'http://localhost:3001';//API URL for paymeent gateway

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>

        {/* Landing Page Route */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginScreen />} />


         {/*Dashboard Routes */}
        <Route path="/admin" element={<App />}>
        <Route path="dashboard/*" element={<Dashboard />} />
        {/* <Route path="*" element={<Dashboard />} /> */}
        <Route path="team" element={<Team />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="form" element={<Form />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="faq" element={<FAQ />} />
          <Route path="course" element={<Course />} />
          <Route path="managecourse" element={<ManageCourse />} />
        </Route>


        {/*Login Routes */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/logout" element={<LogoutHandler />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/browse" element={<BrowseScreen />} />
        <Route path="/browse/view/:id" element={<CourseSPA />} />


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




