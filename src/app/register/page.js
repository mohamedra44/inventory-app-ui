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
import { Package2, Loader2, AlertCircle, User, Mail, Lock } from "lucide-react";
import { useSettings } from "../_component/SettingsContext"; // استدعاء الـ Dark Mode

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { darkMode } = useSettings(); // استخدام وضع الدارك مود

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      console.log(formData);

      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://inventory-app-api-beta.vercel.app/inventory/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        Cookies.set("auth-token", data.token, { expires: 1 });
        router.push("/dashboard");
      } else {
        setError(data.message || "Registration failed. Try again.");
      }
    } catch (err) {
      setError("Server error. Please check your connection.");
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
            <div className="bg-primary p-3 rounded-2xl shadow-lg shadow-primary/20">
              <Package2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle
            className={`text-3xl font-bold tracking-tight ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Create Account
          </CardTitle>
          <CardDescription
            className={darkMode ? "text-slate-400" : "text-slate-500"}
          >
            Join SmartStock today and manage your inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="grid gap-4">
            {error && (
              <div className="bg-red-500/10 text-red-500 p-3 rounded-lg text-xs font-bold flex items-center gap-2 border border-red-500/20 animate-in fade-in zoom-in duration-200">
                <AlertCircle size={14} /> {error}
              </div>
            )}

            {/* Name Input */}
            <div className="grid gap-1.5">
              <Label
                htmlFor="name"
                className={darkMode ? "text-slate-300" : "text-slate-700"}
              >
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  name="name"
                  placeholder="John Doe"
                  className={`pl-10 rounded-xl ${darkMode ? "bg-slate-800/50 border-slate-700 text-white" : "border-slate-200"}`}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="grid gap-1.5">
              <Label
                htmlFor="email"
                className={darkMode ? "text-slate-300" : "text-slate-700"}
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  name="email"
                  type="email"
                  placeholder="admin@smartstock.com"
                  className={`pl-10 rounded-xl ${darkMode ? "bg-slate-800/50 border-slate-700 text-white" : "border-slate-200"}`}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-1.5">
                <Label
                  htmlFor="password"
                  className={darkMode ? "text-slate-300" : "text-slate-700"}
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    name="password"
                    type="password"
                    placeholder="********"
                    className={`pl-10 rounded-xl ${darkMode ? "bg-slate-800/50 border-slate-700 text-white" : "border-slate-200"}`}
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label
                  htmlFor="confirmPassword"
                  className={darkMode ? "text-slate-300" : "text-slate-700"}
                >
                  Confirm
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    name="confirmPassword"
                    type="password"
                    placeholder="********"
                    className={`pl-10 rounded-xl ${darkMode ? "bg-slate-800/50 border-slate-700 text-white" : "border-slate-200"}`}
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-[#4a4ad4] text-white font-bold h-12 rounded-xl mt-2 shadow-lg shadow-primary/20"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create Account"
              )}
            </Button>

            <div className="mt-4 text-center text-sm">
              <span className={darkMode ? "text-slate-400" : "text-slate-600"}>
                Already have an account?{" "}
              </span>
              <Link
                href="/login"
                className="text-primary hover:underline font-bold"
              >
                Sign In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
