import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { SignIn, useUser } from "@clerk/clerk-react";
import { Menu } from "lucide-react";

const Layout = () => {
  const { user } = useUser();
  const [sidebar, setSidebar] = useState(false);

  return user ? (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

      <div className="flex-1 bg-[#F4F7FB] overflow-y-auto relative">
        {/* Mobile menu button - now outside the sidebar */}
        <button
          className="sm:hidden absolute top-4 right-4 z-10 p-2 rounded-md bg-white shadow-md text-gray-600"
          onClick={() => setSidebar(true)}
        >
          <Menu className="w-6 h-6" />
        </button>

        <Outlet />
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default Layout;
