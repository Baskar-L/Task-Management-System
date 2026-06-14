
import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


import { RoleProvider, } from "./Components/Context/RoleContext";
import { AuthProvider, } from "./Components/Context/AuthContext";
import { ToastProvider, } from "./Components/Context/ToastContext";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import MainLayout from "./Components/Layout/MainLayout";
import Modal from "./Components/Helpers/Modal";
import AuthSessionManager from "./Components/Helpers/AuthSessionManager";
import ScrollToTop from "./Components/Helpers/ScrollToTop";
import Unauthorized from "./Pages/Auth/Unauthorized";
import SessionExpired from "./Components/Helpers/SessionExpired";


import Login from "./Pages/Auth/Login";
import Home from "./Pages/Home/Home";
import BankList from "./Pages/Bank/BankList";
import AddBank from "./Pages/Bank/AddBank";
import MemberList from "./Pages/Members/MemberList";
import Expense from "./Pages/Expense/Expense";


export const BACKENDURL = import.meta.env.VITE_BACKEND_API_URL;

function App() {
  const [sessionExpired, setSessionExpired] = React.useState(false);
  const [blocked, setBlocked] = React.useState(false);
  
  const handleSessionTimeout =
    () => {

      setSessionExpired(true);

      setTimeout(() => {

        sessionStorage.clear();

        window.location.href =
          "/login";

      }, 3000);

    };



  React.useEffect(() => {

    const handleTokenExpired = () => {
      setSessionExpired(true);

      setTimeout(() => {

        sessionStorage.removeItem("token");

        window.location.href = "/";

      }, 3000);
    };

    window.addEventListener("tokenExpired", handleTokenExpired);

    return () => {
      window.removeEventListener("tokenExpired", handleTokenExpired);
    };

  }, []);




  return (

    <AuthProvider>

      <RoleProvider>

        <ToastProvider>





          <AuthSessionManager
            onSessionExpired={
              handleSessionTimeout
            }
          />

          <SessionExpired
            isOpen={sessionExpired}
          />


          <ScrollToTop />

          <Routes>

            <Route
              path="/"
              element={<Navigate to="/login" />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/home"
              element={
                <ProtectedRoutes
                  allowedRoles={[
                    "admin",
                    "manager",
                    "staff",
                  ]}
                >
                  <MainLayout>
                    <Home />
                  </MainLayout>
                </ProtectedRoutes>
              }
            />

            <Route
              path="/bank/list"
              element={
                <ProtectedRoutes
                  allowedRoles={[
                    "admin",
                    "manager",
                  ]}
                >
                  <MainLayout>
                    <BankList />
                  </MainLayout>
                </ProtectedRoutes>
              }
            />

            <Route
              path="/bank/add"
              element={
                <ProtectedRoutes
                  allowedRoles={[
                    "admin",
                  ]}
                >
                  <MainLayout>
                    <AddBank />
                  </MainLayout>
                </ProtectedRoutes>
              }
            />

            <Route
              path="/members"
              element={
                <ProtectedRoutes
                  allowedRoles={[
                    "admin",
                    "staff",
                  ]}
                >
                  <MainLayout>
                    <MemberList />
                  </MainLayout>
                </ProtectedRoutes>
              }
            />

            <Route
              path="/expense"
              element={
                <ProtectedRoutes
                  allowedRoles={[
                    "admin",
                  ]}
                >
                  <MainLayout>
                    <Expense />
                  </MainLayout>
                </ProtectedRoutes>
              }
            />



            <Route
              path="/unauthorized"
              element={
                <Unauthorized />
              }
            />

          </Routes>


        </ToastProvider>

      </RoleProvider>

    </AuthProvider>
  );
}

export default App;