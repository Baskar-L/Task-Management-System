import React, { useState } from "react";
import { useContext } from "react";
import { RoleContext } from "../Context/RoleContext";
import { NavLink, useLocation } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";

const MenuItem = ({
  item,
  level = 0,
}) => {

  const roleContext = useContext(RoleContext);

  const activeRole =
    roleContext?.activeRole ||
    sessionStorage.getItem("role");

  if (
    item.roles &&
    !item.roles.includes(activeRole)
  ) {
    return null;
  }
  const location = useLocation();

  const hasChildren =
    item.children &&
    item.children.length > 0;

  const isChildActive = (children) => {
    return children.some((child) => {
      if (child.path) {
        return location.pathname.startsWith(
          child.path
        );
      }

      if (child.children) {
        return isChildActive(child.children);
      }

      return false;
    });
  };

  const [open, setOpen] = useState(
    hasChildren && isChildActive(item.children)
  );

  if (!hasChildren) {
    return (
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          `
          flex items-center
          gap-3
          p-3
          rounded-xl
          transition

          ${isActive
            ? "bg-[#254593] text-white"
            : "text-[#254593] hover:bg-slate-100"
          }
        `
        }
        style={{
          paddingLeft: `${level * 20 + 12}px`,
        }}
      >
        {item.label}
      </NavLink>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          items-center
          justify-between
          w-full
          p-3
          rounded-xl
          text-[#254593]
          hover:bg-slate-100
        "
        style={{
          paddingLeft: `${level * 20 + 12}px`,
        }}
      >
        <span>{item.label}</span>

        <MdKeyboardArrowDown
          className={`transition ${open ? "rotate-180" : ""
            }`}
        />
      </button>

      {open && (
        <div className="space-y-1">
          {item.children
            .filter(
              (child) =>
                !child.roles ||
                child.roles.includes(activeRole)
            )
            .map((child) => (
              <MenuItem
                key={child.label}
                item={child}
                level={level + 1}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default MenuItem;