"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // عشان نحول المستخدم بعد اللوجين
import Cookies from "js-cookie"; // المكتبة اللي اتفقنا عليها
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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // الربط مع الباكيند (تأكد من رابط السيرفر بتاعك)
      const response = await fetch(
        "https://inventory-app-api-beta.vercel.app/inventory/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // 1. تخزين التوكن في الكوكيز (عشان الـ Middleware يشوفه)
        Cookies.set("auth-token", data.token, {
          expires: 1,
          sameSite: "strict",
        });

        // 2. توجيه المستخدم للوحة التحكم
        router.push("/dashboard");
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      setError("Connection error. Please check your server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md border-none shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary p-4 rounded-2xl shadow-lg shadow-indigo-200">
              <Package2 className="h-10 w-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-4xl font-extrabold tracking-tight text-slate-900">
            SmartStock
          </CardTitle>
          <CardDescription className="text-slate-500 font-medium">
            Inventory Management System
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-6">
            {/* عرض رسالة الخطأ إن وجدت */}
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm font-medium border border-red-100 animate-in fade-in zoom-in duration-200">
                {error}
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="email" className="text-slate-700 font-semibold">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@smartstock.com"
                  className="pl-10 border-slate-200 focus:ring-primary focus:border-primary py-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="password"
                className="text-slate-700 font-semibold"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="******"
                  className="pl-10 border-slate-200 focus:ring-primary focus:border-primary py-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-[#4a4ad4] text-white font-bold py-7 text-lg rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-200 disabled:opacity-70"
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

          <div className="mt-8 text-center text-sm text-slate-500">
            <p>
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-primary hover:underline font-bold"
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
