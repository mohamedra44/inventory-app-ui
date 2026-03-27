"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package2, Lock, Mail, Loader2 } from "lucide-react";
import { useSettings } from "../_component/SettingsContext"; // استدعاء الـ Context

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // استخدام الـ darkMode لتنسيق الصفحة
  const { darkMode } = useSettings();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://inventory-app-api-beta.vercel.app/inventory/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        Cookies.set("auth-token", data.token, {
          expires: 1,
          sameSite: "strict",
        });
        router.push("/dashboard");
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      setError("Connection error. Please check your network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex min-h-screen w-full items-center justify-center px-4 transition-colors duration-500 ${
        darkMode ? "bg-[#0f111a]" : "bg-slate-50"
      }`}
    >
      <Card
        className={`w-full max-w-md border-none shadow-2xl transition-all ${
          darkMode ? "bg-[#1a1d2e] text-white" : "bg-white"
        }`}
      >
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary p-4 rounded-2xl shadow-lg shadow-primary/20">
              <Package2 className="h-10 w-10 text-white" />
            </div>
          </div>
          <CardTitle
            className={`text-4xl font-extrabold tracking-tight ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            SmartStock
          </CardTitle>
          <CardDescription
            className={darkMode ? "text-slate-400" : "text-slate-500"}
          >
            Inventory Management System
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-6">
            {error && (
              <div className="bg-red-500/10 text-red-500 p-3 rounded-lg text-sm font-medium border border-red-500/20 animate-in fade-in zoom-in duration-200 text-center">
                {error}
              </div>
            )}

            <div className="grid gap-2">
              <Label
                htmlFor="email"
                className={`font-semibold ${darkMode ? "text-slate-300" : "text-slate-700"}`}
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@smartstock.com"
                  className={`pl-10 h-12 rounded-xl transition-all ${
                    darkMode
                      ? "bg-slate-800/50 border-slate-700 text-white focus:border-primary"
                      : "border-slate-200 focus:ring-primary focus:border-primary"
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="password"
                className={`font-semibold ${darkMode ? "text-slate-300" : "text-slate-700"}`}
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="******"
                  className={`pl-10 h-12 rounded-xl transition-all ${
                    darkMode
                      ? "bg-slate-800/50 border-slate-700 text-white focus:border-primary"
                      : "border-slate-200 focus:ring-primary focus:border-primary"
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-[#4a4ad4] text-white font-bold h-14 text-lg rounded-xl transition-all shadow-lg shadow-primary/20 disabled:opacity-70"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm">
            <p className={darkMode ? "text-slate-400" : "text-slate-500"}>
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-primary hover:underline font-bold transition-colors"
              >
                Register here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
