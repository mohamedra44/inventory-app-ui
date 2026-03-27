"use client";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSettings } from "../_component/SettingsContext";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { darkMode } = useSettings();
  const router = useRouter();

  const menuItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      href: "/dashboard",
    },
    { icon: <Package size={20} />, label: "Inventory", href: "/inventory" },
    { icon: <Settings size={20} />, label: "Settings", href: "/settings" },
  ];

  const handleLogout = () => {
    Cookies.remove("auth-token");
    router.push("/");
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`xl:hidden fixed top-4 left-4 z-50 p-2 rounded-lg shadow-md border transition-colors ${
          darkMode
            ? "bg-slate-800 border-slate-700 text-slate-200"
            : "bg-white border-slate-100 text-slate-600"
        }`}
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 xl:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`
        fixed left-0 top-0 h-screen border-r flex flex-col p-4 z-50 transition-all duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        xl:translate-x-0 lg:w-64 w-72
        ${darkMode ? "bg-[#1a1d2e] border-slate-800" : "bg-white border-slate-100"}
      `}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg shadow-lg shadow-primary/20">
              <Package className="text-white" size={24} />
            </div>
            <span
              className={`text-xl font-bold ${darkMode ? "text-white" : "text-slate-800"}`}
            >
              SmartStock
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className={`lg:hidden ${darkMode ? "text-slate-400" : "text-slate-600"}`}
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${
                  isActive
                    ? darkMode
                      ? "bg-primary/20 text-primary"
                      : "bg-indigo-50 text-primary"
                    : darkMode
                      ? "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                      : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="ghost"
          className={`gap-2 rounded-xl font-bold transition-colors ${
            darkMode
              ? "text-red-400 hover:text-red-300 hover:bg-red-950/30"
              : "text-red-500 hover:text-red-600 hover:bg-red-50"
          }`}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </Button>
      </div>
    </>
  );
}
