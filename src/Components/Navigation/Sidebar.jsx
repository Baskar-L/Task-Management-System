import React from "react";

import { FaXmark } from "react-icons/fa6";

import { menuConfig } from "./menuConfig";

import MenuItem from "./MenuItem";

import { useContext } from "react";
import { RoleContext } from "../Context/RoleContext";

const Sidebar = ({
  setSidebarOpen,
}) => {
  const { activeRole } =
    useContext(RoleContext);
  return (
    <div
      className="
      w-64
      h-screen
      bg-white
      shadow-sm
      p-5
    "
    >
      <div
        className="
        flex
        justify-between
        items-center
        mb-10
      "
      >
        <h1
          className="
          text-2xl
          font-bold
          text-[#254593]
        "
        >
          Reusable Components
        </h1>

        <button
          className="
          md:hidden
          text-2xl
          text-[#254593]
        "
          onClick={() =>
            setSidebarOpen(false)
          }
        >
          <FaXmark />
        </button>
      </div>

      <div className="space-y-2">
        {
          menuConfig
            .filter(
              (item) =>
                !item.roles ||
                item.roles.includes(activeRole)
            )
            .map((item) => (
              <MenuItem
                key={item.label}
                item={item}
              />
            ))
        }
      </div>
    </div>
  );
};

export default Sidebar;