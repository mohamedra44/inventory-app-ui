"use client";
import { useState } from "react";
import Sidebar from "../_component/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Lock, Bell, Store, Globe, Moon, Sun } from "lucide-react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`flex min-h-screen ${darkMode ? "bg-[#16192c] text-white" : "bg-[#fcfdff]"}`}
    >
      <Sidebar />
      <main className="flex-1 p-4 md:p-10 max-xl:mt-8 xl:ml-64 transition-all duration-300">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1e2238]">Settings</h1>
          <p className="text-[#a0a5ba] text-sm">
            Fine-tune your inventory system
          </p>
        </div>

        <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 1. Store Profile - إعدادات المتجر */}
          <Card className="border-slate-100 shadow-sm rounded-2xl">
            <CardHeader className="border-b border-slate-50 bg-[#fbfdff] py-4">
              <div className="flex items-center gap-2">
                <Store size={18} className="text-primary" />
                <CardTitle className="text-sm font-bold">
                  Store Details
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#b3b8ca] uppercase">
                  Store Name
                </label>
                <input
                  type="text"
                  defaultValue="Abo Rabie Tech"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#b3b8ca] uppercase">
                    Currency
                  </label>
                  <select className="w-full p-2.5 rounded-xl border border-slate-200 text-sm outline-none">
                    <option>EGP (Egyptian Pound)</option>
                    <option>USD (US Dollar)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#b3b8ca] uppercase">
                    Low Stock Limit
                  </label>
                  <input
                    type="number"
                    defaultValue="5"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm outline-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2. Notifications - التنبيهات */}
          <Card className="border-slate-100 shadow-sm rounded-2xl">
            <CardHeader className="border-b border-slate-50 bg-[#fbfdff] py-4">
              <div className="flex items-center gap-2">
                <Bell size={18} className="text-orange-400" />
                <CardTitle className="text-sm font-bold">
                  Notifications
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#1e2238]">
                    Email Alerts
                  </p>
                  <p className="text-xs text-[#a0a5ba]">
                    Notify me when stock is low
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 accent-primary"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#1e2238]">
                    Weekly Reports
                  </p>
                  <p className="text-xs text-[#a0a5ba]">
                    Send sales summary every Sunday
                  </p>
                </div>
                <input type="checkbox" className="w-4 h-4 accent-primary" />
              </div>
            </CardContent>
          </Card>

          {/* 3. Appearance - المظهر */}
          <Card className="border-slate-100 shadow-sm rounded-2xl">
            <CardHeader className="border-b border-slate-50 bg-[#fbfdff] py-4">
              <div className="flex items-center gap-2">
                {darkMode ? (
                  <Moon size={18} />
                ) : (
                  <Sun size={18} className="text-yellow-500" />
                )}
                <CardTitle className="text-sm font-bold">Appearance</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 flex items-center justify-between">
              <p className="text-sm font-semibold">Dark Mode</p>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${darkMode ? "bg-primary" : "bg-slate-200"}`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transition-transform ${darkMode ? "translate-x-6" : "translate-x-0"}`}
                />
              </button>
            </CardContent>
          </Card>

          {/* 4. Security - الأمان */}
          <Card className="border-slate-100 shadow-sm rounded-2xl">
            <CardHeader className="border-b border-slate-50 bg-[#fbfdff] py-4">
              <div className="flex items-center gap-2">
                <Lock size={18} className="text-red-400" />
                <CardTitle className="text-sm font-bold">Security</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-xs text-[#a0a5ba] mb-4">
                Last password change: 2 months ago
              </p>
              <Button
                variant="outline"
                className="w-full rounded-xl border-slate-200 text-red-500 hover:bg-red-50 font-bold"
              >
                Change Password
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex justify-end gap-3 max-w-4xl">
          <Button variant="outline" className="rounded-xl px-6 font-bold">
            Discard
          </Button>
          <Button className="bg-primary hover:bg-[#4a4ad4] rounded-xl px-10 font-bold">
            Save All Settings
          </Button>
        </div>
      </main>
    </div>
  );
}
