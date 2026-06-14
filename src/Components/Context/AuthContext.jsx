import React, {
  createContext,
  useEffect,
  useState,
} from "react";

import { jwtDecode } from "jwt-decode";

export const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(null);

  useEffect(() => {

    const token =
      sessionStorage.getItem("token");

    if (!token) return;

    try {

      const decoded =
        jwtDecode(token);

      setUser(decoded);

    } catch (error) {

      console.log(error);

      sessionStorage.removeItem(
        "token"
      );

      sessionStorage.removeItem(
        "activeRole"
      );

      sessionStorage.removeItem(
        "roles"
      );
    }

  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};