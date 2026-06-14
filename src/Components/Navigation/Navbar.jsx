import React, { useState, useEffect } from "react";

import {
  FaUserCircle,
  FaBars,
} from "react-icons/fa";

import { useContext } from "react";

import {RoleContext,} from "../Context/RoleContext";

import {useNavigate,} from "react-router-dom";

import Modal from "../Helpers/Modal";
import { SuccessMessage } from "../Helpers/Toast";



import useAuth from "../../Hooks/useAuth";

const Navbar = ({
  setSidebarOpen,
}) => {

  const navigate =
    useNavigate();




  const { user } = useAuth();

  const {
    activeRole,
    switchRole,
  } = useContext(RoleContext);

  const userRoles =
    user?.roles || [];

  const [openMenu,
    setOpenMenu] =
    useState(false);

  const [logoutModal,
    setLogoutModal] =
    useState(false);

  const [toast, setToast] =
    useState({
      type: "",
      message: "",
      id: null,
    });


  const showToast = (
    type,
    message
  ) => {

    setToast({
      type,
      message,
      id: Date.now(),
    });

  };
  /* LOGOUT */

  const handleLogout = () => {

    setLogoutModal(false);

    sessionStorage.removeItem(
      "token"
    );

    sessionStorage.removeItem(
      "roles"
    );

    sessionStorage.removeItem(
      "activeRole"
    );

    showToast(
      "success",
      "Logout Successfully"
    );

    setTimeout(() => {

      navigate("/login");

    }, 1200);

  };

  return (

    <>

      {/* NAVBAR */}

      <div
        className="
    w-full
    h-full
    px-4
    flex items-center
    justify-between
    
  "
      >

        {/* MOBILE MENU */}

        <button
          onClick={() =>
            setSidebarOpen(true)
          }
          className="
            md:hidden
            text-2xl
            text-[#254593]
          "
        >

          <FaBars />

        </button>

        {/* RIGHT */}

        <div className="relative ml-auto">

          <button
            onClick={() =>
              setOpenMenu(!openMenu)
            }
            className="
              text-3xl
              text-[#254593]
            "
          >

            <FaUserCircle />

          </button>

          {/* DROPDOWN */}

          {openMenu && (

            <div
              className="
                absolute right-0 mt-3
                w-48
                bg-white
                rounded-xl
                shadow-xl
                border
                z-20
              "
            >

              <div
                className="
    p-4 border-b
    text-[#254593]
  "
              >

                <p className="font-semibold">
                  Roles
                </p>

                <div className="mt-2 space-y-1">

                  {userRoles.map((role) => (

                    <button
                      key={role}
                      onClick={() => {

                        switchRole(role);

                        setOpenMenu(false);

                        if (role === "admin") {

                          navigate("/home");

                        } else if (role === "manager") {

                          navigate("/bank/list");

                        } else if (role === "staff") {

                          navigate("/members");

                        }

                      }}
                      className={`
        w-full
        text-left
        px-2
        py-2
        rounded-lg
        capitalize
        hover:bg-gray-100

        ${activeRole === role
                          ? "bg-blue-50 font-semibold text-[#254593]"
                          : ""
                        }
      `}
                    >

                      {role}

                    </button>

                  ))}

                </div>
              </div>

              <button
                onClick={() => {

                  setOpenMenu(false);

                  setLogoutModal(true);

                }}
                className="
                  w-full text-left
                  px-4 py-3
                  hover:bg-gray-100
                  text-red-500
                  transition
                "
              >

                Logout

              </button>

            </div>

          )}

        </div>

      </div>

      {/* LOGOUT MODAL */}

      <Modal
        isOpen={logoutModal}
        onClose={() =>
          setLogoutModal(false)
        }
        title="Confirm Logout"
        size="sm"
      >

        <div>

          <p className="text-gray-600">

            Are you sure want to logout?

          </p>

          <div
            className="
              flex justify-end
              gap-3 mt-5
            "
          >

            <button
              onClick={() =>
                setLogoutModal(false)
              }
              className="
                px-4 py-2
                rounded-lg border
              "
            >

              No

            </button>

            <button
              onClick={handleLogout}
              className="primary-btn"
            >

              Yes

            </button>

          </div>

        </div>

      </Modal>


      {/* TOAST */}

      {toast.type === "success" && (

        <SuccessMessage
          key={toast.id}
          Message={toast.message}
        />

      )}

    </>

  );
};

export default Navbar;