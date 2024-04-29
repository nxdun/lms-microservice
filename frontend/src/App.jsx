import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LogoutHandler } from 'src/services/logoutHandler';
import LoginScreen from 'src/components/auth/login';
import RegisterScreen from 'src/components/auth/register';
import Particle from 'src/components/common/particles';
import ErrorPath from 'src/components/common/nopath';
import BrowseScreen from 'src/components/browsecourses/browsescreen';
import Dashboard from 'src/components/admindashboard/admindashboard';


const App = () => {
  return (
    <>
    <Particle /> {/* particles background. */}
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/logout" element={<LogoutHandler />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/*" element={<ErrorPath />} />
        <Route path="/browse" element={<BrowseScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </>
  );

};

export default App;
