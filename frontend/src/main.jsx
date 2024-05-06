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
  Bar,
  Line,
  Pie,
  FAQ,
  Geography,
  Calendar,
  Stream,
} from "src/components/admindashboard/scenes";

const apiUrl = 'http://localhost:3001';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/*" element={<ErrorPath />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />

      </Routes>
    </Router>
  </React.StrictMode>
);


//  {/*Dashboard Routes */}
//  <Route path="/" element={<App />}>
//  <Route path="/dashboard" element={<Dashboard />} />
//  <Route path="/team" element={<Team />} />
//  <Route path="/contacts" element={<Contacts />} />
//  <Route path="/invoices" element={<Invoices />} />
//  <Route path="/form" element={<Form />} />
//  <Route path="/calendar" element={<Calendar />} />
//  <Route path="/bar" element={<Bar />} />
//  <Route path="/pie" element={<Pie />} />
//  <Route path="/stream" element={<Stream />} />
//  <Route path="/line" element={<Line />} />
//  <Route path="/faq" element={<FAQ />} />
//  <Route path="/geography" element={<Geography />} />
// </Route>
// {/*Login Routes */}
// 
// <Route path="/logout" element={<LogoutHandler />} />
// 
// <Route path="/browse" element={<BrowseScreen />} />
// <Route path="/browse/view/:id" element={<CourseSPA />} />
//

// {/*Payment Routes */}
// <Route path="/payment" element={<PaymentPage apiUrl={apiUrl} />} />
// <Route path="/success" element={<SuccessPage />} />
// <Route path="/cancel" element={<CancelPage />} />
// {/* Landing Page Route */}
