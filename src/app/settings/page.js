"use client";
import { useState } from "react";
import Sidebar from "../_component/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Store, Moon, Sun, Save, RotateCcw } from "lucide-react";
import { useSettings } from "../_component/SettingsContext";

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);

  const { darkMode, setDarkMode, lowStockLimit, updateLowStockLimit } =
    useSettings();

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div
      className={`flex min-h-screen transition-colors duration-500 ${
        darkMode ? "bg-[#0f111a] text-slate-100" : "bg-[#fcfdff] text-[#1e2238]"
      }`}
    >
      <Sidebar />

      <main className="flex-1 p-4 md:p-10 max-xl:mt-12 xl:ml-64 transition-all duration-300">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1
              className={`text-3xl font-black ${darkMode ? "text-white" : "text-[#1e2238]"}`}
            >
              System Settings
            </h1>
            <p className="text-[#a0a5ba] text-sm mt-1">
              Configure your workspace and notification preferences
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-primary hover:bg-[#4a4ad4] rounded-xl px-8 font-bold shadow-lg shadow-primary/20"
            >
              {isSaving ? (
                "Saving..."
              ) : (
                <>
                  <Save size={16} className="mr-2" /> Save Changes
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 1. Store Profile */}
          <Card
            className={`border-none shadow-sm rounded-3xl overflow-hidden ${darkMode ? "bg-[#1a1d2e]" : "bg-white"}`}
          >
            <CardHeader
              className={`${darkMode ? "bg-slate-800/50" : "bg-[#fbfdff]"} py-5 border-b ${darkMode ? "border-slate-700" : "border-slate-50"}`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Store size={20} className="text-primary" />
                </div>
                <CardTitle className="text-base font-bold text-inherit">
                  Store Details
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-[#b3b8ca] uppercase tracking-widest">
                  Store Name
                </label>
                <input
                  type="text"
                  disabled={true}
                  defaultValue="Abo Rabie Tech"
                  className={`w-full p-3.5 rounded-2xl border text-sm outline-none transition-all ${
                    darkMode
                      ? "bg-slate-800 border-slate-700 focus:border-primary"
                      : "bg-[#fbfdff] border-slate-200 focus:border-primary"
                  }`}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-[#b3b8ca] uppercase tracking-widest">
                    Currency
                  </label>
                  <select
                    className={`w-full p-3.5 rounded-2xl border text-sm outline-none ${
                      darkMode
                        ? "bg-slate-800 border-slate-700"
                        : "bg-[#fbfdff] border-slate-200"
                    }`}
                  >
                    <option>EGP (Egyptian Pound)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-[#b3b8ca] uppercase tracking-widest">
                    Stock Limit
                  </label>
                  <input
                    type="number"
                    value={Number(lowStockLimit)} // مربوط بالـ Context
                    onChange={(e) =>
                      updateLowStockLimit(Number(e.target.value))
                    } // تحديث لحظي للـ Context والـ LocalStorage
                    className={`w-full p-3.5 rounded-2xl border text-sm outline-none transition-all ${
                      darkMode
                        ? "bg-slate-800 border-slate-700 focus:border-primary"
                        : "bg-[#fbfdff] border-slate-200 focus:border-primary"
                    }`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2. Appearance & Theme */}
          <Card
            className={`border-none shadow-sm rounded-3xl overflow-hidden ${darkMode ? "bg-[#1a1d2e]" : "bg-white"}`}
          >
            <CardHeader
              className={`${darkMode ? "bg-slate-800/50" : "bg-[#fbfdff]"} py-5 border-b ${darkMode ? "border-slate-700" : "border-slate-50"}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${darkMode ? "bg-yellow-400/10" : "bg-blue-400/10"}`}
                >
                  {darkMode ? (
                    <Moon size={20} className="text-yellow-400" />
                  ) : (
                    <Sun size={20} className="text-blue-500" />
                  )}
                </div>
                <CardTitle className="text-base font-bold text-inherit">
                  Appearance
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="flex items-center justify-between p-4 rounded-2xl border border-dashed border-slate-200">
                <div>
                  <p className="text-sm font-bold">Dark Mode Interface</p>
                  <p className="text-xs text-[#a0a5ba] mt-0.5">
                    Reduce eye strain in low light
                  </p>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)} // تحديث لحظي للـ Context والـ LocalStorage
                  className={`w-14 h-7 rounded-full p-1 transition-all duration-300 relative ${darkMode ? "bg-primary" : "bg-slate-200"}`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${darkMode ? "translate-x-7" : "translate-x-0"}`}
                  />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
