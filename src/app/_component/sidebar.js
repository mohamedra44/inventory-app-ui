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

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      href: "/dashboard",
    },
    { icon: <Package size={20} />, label: "Inventory", href: "/inventory" },
    { icon: <Settings size={20} />, label: "Settings", href: "/settings" },
  ];

  return (
    <>
      {/* زرار المنيو للموبايل */}
      <button
        onClick={() => setIsOpen(true)}
        className="xl:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-slate-100"
      >
        <Menu size={24} className="text-slate-600" />{" "}
      </button>

      {/* الـ Overlay عند فتح المنيو في الموبايل */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* الـ Sidebar الرئيسي */}
      <div
        className={`
        fixed left-0 top-0 h-screen bg-white border-r border-slate-100 flex flex-col p-4 z-50 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        xl:translate-x-0 lg:w-64 w-72
      `}
      >
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <Package className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-slate-800">SmartStock</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${
                pathname === item.href
                  ? "bg-indigo-50 text-primary"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <button className="flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium mt-auto">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </>
  );
}
