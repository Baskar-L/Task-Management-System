import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/tasks/Dashboard";
import CreateTask from "../pages/tasks/CreateTask";
import EditTask from "../pages/tasks/EditTask";
import TaskDetails from "../pages/tasks/TaskDetails";

import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>

      <Route
        path="/"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route element={<ProtectedRoute />}>

        <Route element={<MainLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/tasks/create"
            element={<CreateTask />}
          />

          <Route
            path="/tasks/:id"
            element={<TaskDetails />}
          />

          <Route
            path="/tasks/:id/edit"
            element={<EditTask />}
          />

        </Route>

      </Route>

      <Route
        path="*"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />

    </Routes>
  );
};

export default AppRoutes;