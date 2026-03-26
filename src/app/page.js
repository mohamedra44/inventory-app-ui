import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package, ShieldCheck, Zap } from "lucide-react";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-[#fcfdff] flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-8 bg-primary/10 p-5 rounded-3xl">
        <Package size={60} className="text-primary" />
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold text-[#1e2238] mb-4 tracking-tight">
        Welcome to <span className="text-primary">Inventory Master</span>
      </h1>
      <p className="text-[#a0a5ba] text-lg max-w-md mb-10 leading-relaxed">
        The smartest way to manage your products, track stock, and grow your
        business in one place.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        <Link href="/dashboard" className="flex-1">
          <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-[#4a4ad4] text-lg font-bold">
            Get Started
          </Button>
        </Link>
        <Link href="/login" className="flex-1">
          <Button
            variant="outline"
            className="w-full h-14 rounded-2xl border-slate-200 text-lg font-bold"
          >
            Login
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl w-full">
        <FeatureCard
          icon={<ShieldCheck className="text-green-500" />}
          title="Secure"
          desc="Your data is encrypted and safe."
        />
        <FeatureCard
          icon={<Zap className="text-yellow-500" />}
          title="Fast"
          desc="Real-time updates across devices."
        />
        <FeatureCard
          icon={<Package className="text-blue-500" />}
          title="Smart"
          desc="Low stock alerts & analytics."
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-50 flex flex-col items-center">
      <div className="mb-3">{icon}</div>
      <h3 className="font-bold text-[#1e2238]">{title}</h3>
      <p className="text-sm text-[#a0a5ba]">{desc}</p>
    </div>
  );
}
