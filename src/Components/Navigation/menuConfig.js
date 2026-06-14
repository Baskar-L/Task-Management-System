import {
  MdDashboard,
  MdPeople,
} from "react-icons/md";

import { FaUniversity } from "react-icons/fa";

import { FaMoneyBillTransfer } from "react-icons/fa6";

export const menuConfig = [
  {
    label: "Home",
    icon: MdDashboard,
    path: "/home",
    roles: ["admin", "manager", "staff"],
  },

  {
    label: "Accounts",
    icon: FaUniversity,
    roles: ["admin", "manager"],

    children: [
      {
        label: "Bank",

        children: [
          {
            label: "Bank List",
            path: "/bank/list",
            roles: ["admin", "manager"],
          },

          {
            label: "Add Bank",
            path: "/bank/add",
            roles: ["admin"],
          },
        ],
      },
    ],
  },

  {
    label: "Members",
    icon: MdPeople,
    roles: ["admin", "staff"],

    children: [
      {
        label: "Member List",
        path: "/members",
        roles: ["admin", "staff"],
      },
    ],
  },

  {
    label: "Expense",
    icon: FaMoneyBillTransfer,
    path: "/expense",
    roles: ["admin"],
  },
];