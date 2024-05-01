import { BrowserRouter as Router, Routes, Route, useRoutes } from 'react-router-dom';
// import { LogoutHandler } from 'src/services/logoutHandler';
// import LoginScreen from 'src/components/auth/login';
// import RegisterScreen from 'src/components/auth/register';
// import Particle from 'src/components/common/particles';
// import ErrorPath from 'src/components/common/nopath';

//dashboard
import CssBaseline from "@mui/material/CssBaseline";
import { MatxTheme } from "./components/dashboard/components";
// ALL CONTEXTS
import { AuthProvider } from "./components/dashboard/contexts/JWTAuthContext";
import SettingsProvider from "./components/dashboard/contexts/SettingsContext";
// ROUTES
import routes from "./routes";
// FAKE SERVER
import "./fake-db";

const App = () => {
  const content = useRoutes(routes);
  
  return (
    <>
    {/* dashboard */}
    <SettingsProvider>
          <AuthProvider>
            <MatxTheme>
              <CssBaseline />
              {content}
            </MatxTheme>
          </AuthProvider>
    </SettingsProvider>
    </>
  );

};

export default App