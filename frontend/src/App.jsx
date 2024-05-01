import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LogoutHandler } from "src/services/logoutHandler";
import LoginScreen from "src/components/auth/login";
import RegisterScreen from "src/components/auth/register";
import ErrorPath from "src/components/common/nopath";
import BrowseScreen from "src/components/browsecourses/browsescreen";
import Dashboard from "src/components/admindashboard/admindashboard";
import CourseSPA from "src/components/browsecourses/courseSPA";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/logout" element={<LogoutHandler />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/browse" element={<BrowseScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/browse/view/:id" element={<CourseSPA />} />
          <Route path="/*" element={<ErrorPath />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
