
import React, { useState } from "react";

import Sidebar from "../../Components/Navigation/Sidebar";
import Navbar from "../../Components/Navigation/Navbar";

const MainLayout = ({ children }) => {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (

    <div className="bg-gray-100 min-h-screen">

      {/* MOBILE OVERLAY */}

      {sidebarOpen && (

        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="
            fixed inset-0
            bg-black/40
            z-40
            md:hidden
          "
        />

      )}

      {/* SIDEBAR */}

      <aside
        className={`
          fixed
          top-0
          left-0
          h-screen
          w-64
          bg-white
          z-40
          transition-transform
          duration-300

          ${sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }

          md:translate-x-0
        `}
      >

        <Sidebar
          setSidebarOpen={setSidebarOpen}
        />

      </aside>

      {/* RIGHT SIDE */}

      <div className="md:ml-64">

        {/* NAVBAR */}

        <header
          className="
            fixed
            top-0
            right-0
            left-0
            md:left-64
            h-[72px]
            bg-white
            shadow-sm
            z-30
          "
        >

          <Navbar
            setSidebarOpen={setSidebarOpen}
          />

        </header>

        {/* PAGE CONTENT */}

        <main
          className="
            pt-[90px]
            p-3
            sm:p-4
            md:p-5
          "
        >

          {children}

        </main>

      </div>

    </div>

  );
};

export default MainLayout;



