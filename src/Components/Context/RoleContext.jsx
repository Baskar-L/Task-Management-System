import React, {
  createContext,
  useState,
  useEffect,
} from "react";

export const RoleContext =
  createContext();

export const RoleProvider = ({
  children,
}) => {

  const [activeRole, setActiveRole] =
    useState("");

  useEffect(() => {

  const activeRole =
    sessionStorage.getItem(
      "activeRole"
    );

  if (activeRole) {

    setActiveRole(
      activeRole
    );

  }

}, []);
const switchRole = (role) => {

  setActiveRole(role);

  sessionStorage.setItem(
    "activeRole",
    role
  );

};

  return (
    <RoleContext.Provider
      value={{
        activeRole,
        switchRole,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};