import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import {
  Eraser,
  FileText,
  Hash,
  HomeIcon as House,
  SquarePen,
  Scissors,
  Users,
  Image,
  Code,
  LogOut,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const navItems = [
  {
    to: "/ai",
    label: "Dashboard",
    Icon: House,
  },
  {
    to: "/ai/write-article",
    label: "Write Article",
    Icon: SquarePen,
  },
  {
    to: "/ai/blog-titles",
    label: "Blog Titles",
    Icon: Hash,
  },
  {
    to: "/ai/generate-images",
    label: "Generate Images",
    Icon: Image,
  },
  {
    to: "/ai/remove-background",
    label: "Remove Background",
    Icon: Eraser,
  },
  {
    to: "/ai/remove-object",
    label: "Remove Object",
    Icon: Scissors,
  },
  {
    to: "/ai/review-resume",
    label: "Review Resume",
    Icon: FileText,
  },
  {
    to: "/ai/review-code",
    label: "Review Code",
    Icon: Code,
  },
  {
    to: "/ai/community",
    label: "Community",
    Icon: Users,
  },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { signOut, openUserProfile } = useClerk();

  return (
    <div
      className={`w-64 bg-gradient-to-b from-slate-50 to-white border-r border-slate-200/60 flex flex-col justify-between shadow-sm max-sm:fixed top-0 bottom-0 z-20 ${
        sidebar ? "translate-x-0" : "max-sm:-translate-x-full"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="flex flex-col h-full">
        {/* Logo Header */}
        <div className="px-6 border-b border-slate-100 flex items-center justify-center py-4 relative">
          <img
            src={assets.logo}
            className="w-32 cursor-pointer"
            alt="Logo"
            onClick={() => navigate("/")}
          />
          <X
            className="w-6 h-6 text-gray-600 sm:hidden absolute right-4 cursor-pointer"
            onClick={() => setSidebar(false)}
          />
        </div>

        {/* User Profile */}
        <div className="px-6 py-6 border-b border-slate-100">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <img
                src={user?.imageUrl || "/placeholder.svg"}
                className="w-16 h-16 rounded-full ring-4 ring-blue-50 shadow-md object-cover"
                alt="user-avatar"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold text-slate-800 truncate max-w-[200px]">
                {user?.fullName}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-4 overflow-y-auto">
          <div className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/ai"}
                onClick={() => setSidebar(false)}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-4 py-[9px] rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 active:bg-slate-100"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.Icon
                      className={`w-5 h-5 transition-transform duration-200 ${
                        isActive
                          ? "text-white"
                          : "text-slate-400 group-hover:text-slate-600 group-hover:scale-110"
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full opacity-80"></div>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Footer Section */}
        <div className="px-4 py-4 border-t border-slate-100 space-y-2">
          <button
            onClick={() => openUserProfile()}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
              <span className="text-sm font-semibold text-slate-600">
                {user?.firstName?.charAt(0)}
              </span>
            </div>
            <span className="truncate">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>{" "}
              Plan
            </span>
          </button>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-slate-50 rounded-xl transition-all duration-200"
          >
            <LogOut className="w-5 h-5 text-slate-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
