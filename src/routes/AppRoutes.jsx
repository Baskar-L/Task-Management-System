import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";

import Dashboard from "../Pages/tasks/Dashboard";
import CreateTask from "../Pages/tasks/CreateTask";
import EditTask from "../Pages/tasks/EditTask";
import TaskDetails from "../Pages/tasks/TaskDetails";

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