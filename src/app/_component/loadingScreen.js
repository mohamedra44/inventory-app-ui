"use client";
import { Loader2, Package } from "lucide-react";
import { useSettings } from "../_component/SettingsContext"; 

export default function LoadingScreen({ message = "Loading Inventory..." }) {
  const { darkMode } = useSettings(); // جلب حالة الثيم

  return (
    <div
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-center transition-colors duration-500 ${
        darkMode ? "bg-[#0f111a]" : "bg-[#fcfdff]"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Icon Container */}
        <div
          className={`w-20 h-20 rounded-3xl flex items-center justify-center animate-pulse ${
            darkMode ? "bg-primary/20" : "bg-primary/10"
          }`}
        >
          <Package className="text-primary" size={40} />
        </div>

        {/* Text Section */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-3">
            <Loader2 className="animate-spin text-primary" size={24} />
            <span
              className={`font-bold text-xl tracking-tight ${
                darkMode ? "text-white" : "text-[#1e2238]"
              }`}
            >
              {message}
            </span>
          </div>
          <p className="text-[#a0a5ba] text-sm font-medium animate-bounce">
            Please wait a moment...
          </p>
        </div>

        {/* Progress Bar */}
        <div
          className={`w-48 h-1.5 rounded-full overflow-hidden ${
            darkMode ? "bg-slate-800" : "bg-slate-100"
          }`}
        >
          <div
            className="h-full bg-primary"
            style={{
              animation: "loading 1.5s infinite linear",
              width: "30%",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(400%);
          }
        }
      `}</style>
    </div>
  );
}
