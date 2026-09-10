import React, {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../services/authService";

import {
  saveAuth,
  getStoredToken,
  getStoredUser,
  clearAuth,
} from "../utils/storage";

export const AuthContext =
  createContext(null);

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] = useState(
    getStoredUser()
  );

  const [token, setToken] = useState(
    getStoredToken()
  );

  const [loading, setLoading] =
    useState(true);

  // Restore logged-in user
  useEffect(() => {
    const restoreSession = async () => {
      const storedToken =
        getStoredToken();

      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const response =
          await getCurrentUser();

        // authService returns response.data
        setUser(response.data.user);
      } catch (error) {
        console.error(
          "Session restore failed:",
          error
        );

        clearAuth();
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  // Register
  const register = async (
    name,
    email,
    password
  ) => {
    const response =
      await registerUser({
        name,
        email,
        password,
      });

    console.log(
      "Register API response:",
      response
    );

    // IMPORTANT:
    // registerUser() returns response.data
    const { user, token } =
      response.data;

    saveAuth(token, user);

    setUser(user);
    setToken(token);

    return response;
  };

  // Login
  const login = async (
    email,
    password
  ) => {
    const response =
      await loginUser({
        email,
        password,
      });

    console.log(
      "Login API response:",
      response
    );

    // IMPORTANT:
    // loginUser() returns response.data
    const { user, token } =
      response.data;

    saveAuth(token, user);

    setUser(user);
    setToken(token);

    return response;
  };

  // Logout
  const logout = () => {
    clearAuth();

    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};