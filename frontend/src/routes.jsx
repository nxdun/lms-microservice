import { lazy } from "react";
import { Navigate } from "react-router-dom";

import AuthGuard from "./components/dashboard/auth/AuthGuard";
import { authRoles } from "./components/dashboard/auth/authRoles";

import Loadable from "./components/dashboard/components/Loadable";
import MatxLayout from "./components/dashboard/components/MatxLayout/MatxLayout";

// SESSION PAGES
const NotFound = Loadable(lazy(() => import("./components/dashboard/views/sessions/NotFound")));
const JwtLogin = Loadable(lazy(() => import("./components/dashboard/views/sessions/JwtLogin")));
const JwtRegister = Loadable(lazy(() => import("./components/dashboard/views/sessions/JwtRegister")));
const ForgotPassword = Loadable(lazy(() => import("./components/dashboard/views/sessions/ForgotPassword")));

// DASHBOARD PAGE
const Analytics = Loadable(lazy(() => import("./components/dashboard/views/dashboard/Analytics")));

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      // dashboard route
      { path: "/dashboard/default", element: <Analytics />, auth: authRoles.admin },
      
    ]
  },

  // session pages route
  { path: "/session/404", element: <NotFound /> },
  { path: "/session/signin", element: <JwtLogin /> },
  { path: "/session/signup", element: <JwtRegister /> },
  { path: "/session/forgot-password", element: <ForgotPassword /> },

  { path: "/", element: <Navigate to="dashboard/default" /> },
  { path: "*", element: <NotFound /> }
];

export default routes;
