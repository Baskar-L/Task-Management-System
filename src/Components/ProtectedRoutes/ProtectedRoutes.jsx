import React from "react";

import {
  Navigate,
} from "react-router-dom";

import {
  jwtDecode,
} from "jwt-decode";

const ProtectedRoutes = ({
  children,
  allowedRoles = [],
}) => {

  const token =
    sessionStorage.getItem(
      "token"
    );

  if (!token) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }

  try {

    const decoded =
      jwtDecode(token);

    /* TOKEN EXPIRY CHECK */

    if (
      decoded.exp * 1000 <
      Date.now()
    ) {

      sessionStorage.clear();

      return (
        <Navigate
          to="/login"
          replace
        />
      );

    }

    /* ROLE CHECK */

    const roles =
      decoded.roles || [];

    if (
      allowedRoles.length > 0
    ) {

      const isAllowed =
        allowedRoles.some(
          (role) =>
            roles.includes(role)
        );

      if (!isAllowed) {

        return (
          <Navigate
            to="/unauthorized"
            replace
          />
        );

      }

    }

    return children;

  } catch (error) {

    console.log(
      "Protected Route Error:",
      error
    );

    sessionStorage.clear();

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }

};

export default ProtectedRoutes;