import React, {
  useState,
  useContext,
} from "react";

import axios from "axios";
import { jwtDecode } from "jwt-decode";

import {
  useNavigate,
} from "react-router-dom";

import {
  BACKENDURL,
} from "../../App";

import {
  RoleContext,
} from "../../Components/Context/RoleContext";

const Login = () => {

  const navigate =
    useNavigate();

  const {
    switchRole,
  } = useContext(RoleContext);

  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  const login = async (
    e
  ) => {

    e.preventDefault();



    try {

      const res =
        await axios.post(
          `${BACKENDURL}/auth/login`,
          form
        );



      const roles =
        res.data.user.roles || [];

      sessionStorage.setItem(
        "token",
        res.data.token
      );


      window.dispatchEvent(
        new Event(
          "loginSuccess"
        )
      );

      console.log(
        jwtDecode(
          res.data.token
        )
      );

      sessionStorage.setItem(
        "roles",
        JSON.stringify(roles)
      );

      if (roles.length > 0) {

        const defaultRole =
          roles[0];

        switchRole(
          defaultRole
        );

        sessionStorage.setItem(
          "activeRole",
          defaultRole
        );

        if (
          defaultRole === "admin"
        ) {

          navigate("/home");

        } else if (
          defaultRole === "manager"
        ) {

          navigate("/bank/list");

        } else if (
          defaultRole === "staff"
        ) {

          navigate("/members");

        }

      }

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={login}
        className="bg-white p-8 rounded-lg shadow w-[400px]"
      >

        <h2 className="text-2xl font-bold mb-5">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-3 rounded"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-3 rounded"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password:
                e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="bg-[#254593] text-white w-full p-3 rounded"
        >
          Login
        </button>

      </form>

    </div>

  );

};

export default Login;