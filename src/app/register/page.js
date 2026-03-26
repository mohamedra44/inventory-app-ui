"use client"; // مهم جداً عشان التفاعل والـ onClick
import Link from "next/link";
import { useState } from "react";
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
import { Package2 } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    // هنا هنربط مع الباكيند اللي عملناه (Axios)
    if (password === confirmPassword) {
      setMessage(false);
      console.log("register in with:", {
        name,
        email,
        password,
        confirmPassword,
      });
    } else {
      setMessage(true);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md border-none shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary p-3 rounded-2xl">
              <Package2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">
            Create Account
          </CardTitle>
          <CardDescription className="text-slate-500">
            Join SmartStock to manage your inventory easily
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleLogin}>
            <div className="grid gap-2 text-left">
              <Label htmlFor="username" className="text-slate-700">
                Full Name
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter Full Name"
                className="border-slate-200 focus:border-primary mb-2"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required={true}
              />
            </div>
            <div className="grid gap-2 text-left">
              <Label htmlFor="email" className="text-slate-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@smartstock.com"
                className="border-slate-200 focus:border-primary mb-2"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required={true}
              />
            </div>
            <div className="grid gap-2 text-left">
              <Label htmlFor="password" className="text-slate-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                className="border-slate-200 focus:border-primary mb-2"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required={true}
              />
            </div>
            <div className="grid gap-2 text-left">
              <Label htmlFor="password" className="text-slate-700">
                Confirm Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                className="border-slate-200 focus:border-primary "
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                required={true}
              />
              {message === true ? (
                <p className="text-red-600">
                  Confirm Password should equal password!
                </p>
              ) : null}
            </div>
            <Button className="w-full bg-primary hover:bg-[#4a4ad4] text-white font-semibold py-6 text-lg mt-2">
              Sign Up
            </Button>
            <div className="mt-4 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary hover:underline font-medium"
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
