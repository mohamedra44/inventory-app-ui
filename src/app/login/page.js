"use client";
import { useState } from "react";
import Link from "next/link";
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
import { Package2, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    // هنا هنربط مع الباكيند اللي عملناه (Axios)
    console.log("Logging in with:", { email, password });
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
                  required={true}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password text-slate-700 font-semibold">
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
                  required={true}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-[#4a4ad4] text-white font-bold py-7 text-lg rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-200"
            >
              Sign In
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
