"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package, ShieldCheck, Zap } from "lucide-react";
import { useSettings } from "./_component/SettingsContext"; // استدعاء الإعدادات

export default function WelcomePage() {
  const { darkMode } = useSettings();

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 text-center transition-colors duration-500 ${
        darkMode ? "bg-[#0f111a]" : "bg-[#fcfdff]"
      }`}
    >
      {/* Icon Container */}
      <div
        className={`mb-8 p-5 rounded-3xl transition-colors ${
          darkMode ? "bg-primary/20" : "bg-primary/10"
        }`}
      >
        <Package size={60} className="text-primary" />
      </div>

      {/* Hero Section */}
      <h1
        className={`text-4xl md:text-6xl font-extrabold mb-4 tracking-tight transition-colors ${
          darkMode ? "text-white" : "text-[#1e2238]"
        }`}
      >
        Welcome to <span className="text-primary">SmartStock</span>
      </h1>

      <p
        className={`text-lg max-w-md mb-10 leading-relaxed transition-colors ${
          darkMode ? "text-slate-400" : "text-[#a0a5ba]"
        }`}
      >
        The smartest way to manage your products, track stock, and grow your
        business in one place.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        <Link href="/dashboard" className="flex-1">
          <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-[#4a4ad4] text-lg font-bold shadow-lg shadow-primary/20 text-white">
            Get Started
          </Button>
        </Link>
        <Link href="/login" className="flex-1">
          <Button
            variant="outline"
            className={`w-full h-14 rounded-2xl text-lg font-bold transition-all ${
              darkMode
                ? "border-slate-700 text-slate-200 hover:bg-slate-800"
                : "border-slate-200 text-[#1e2238] hover:bg-slate-50"
            }`}
          >
            Login
          </Button>
        </Link>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl w-full">
        <FeatureCard
          darkMode={darkMode}
          icon={<ShieldCheck className="text-green-500" size={28} />}
          title="Secure"
          desc="Your data is encrypted and safe."
        />
        <FeatureCard
          darkMode={darkMode}
          icon={<Zap className="text-yellow-500" size={28} />}
          title="Fast"
          desc="Real-time updates across devices."
        />
        <FeatureCard
          darkMode={darkMode}
          icon={<Package className="text-blue-500" size={28} />}
          title="Smart"
          desc="Low stock alerts & analytics."
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc, darkMode }) {
  return (
    <div
      className={`p-8 rounded-2xl shadow-sm border transition-all duration-300 flex flex-col items-center ${
        darkMode
          ? "bg-[#1a1d2e] border-slate-800 hover:border-primary/40"
          : "bg-white border-slate-50 hover:shadow-md"
      }`}
    >
      <div
        className={`mb-4 p-3 rounded-xl ${darkMode ? "bg-slate-800" : "bg-slate-50"}`}
      >
        {icon}
      </div>
      <h3
        className={`font-bold mb-2 ${darkMode ? "text-white" : "text-[#1e2238]"}`}
      >
        {title}
      </h3>
      <p
        className={`text-sm leading-relaxed ${darkMode ? "text-slate-400" : "text-[#a0a5ba]"}`}
      >
        {desc}
      </p>
    </div>
  );
}
