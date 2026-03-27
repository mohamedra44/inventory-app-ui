"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Sidebar from "../_component/sidebar";
import AddProductModal from "../_component/addProductModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Package,
  AlertTriangle,
  CircleDollarSign,
  Search,
} from "lucide-react";
import { jwtDecode } from "jwt-decode";
import LoadingScreen from "../_component/loadingScreen";
import DataTable from "../_component/dataTable";
import { useSettings } from "../_component/SettingsContext";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // 2. استخدام بيانات الـ Settings
  const { darkMode, lowStockLimit } = useSettings();

  const fetchProducts = useCallback(async () => {
    setIsLoadingData(true);
    try {
      const token = Cookies.get("auth-token");
      if (!token) return;

      const response = await fetch(
        "https://inventory-app-api-beta.vercel.app/inventory/show",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  useEffect(() => {
    const initializeDashboard = async () => {
      const token = Cookies.get("auth-token");
      if (!token) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsAuthenticating(false);
        router.push("/login");
        return;
      }

      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name || "User");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsAuthenticating(false);
        fetchProducts();
      } catch (error) {
        Cookies.remove("auth-token");
        router.push("/login");
      }
    };
    initializeDashboard();
  }, [fetchProducts, router]);

  

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // 3. تحديث الإحصائيات بناءً على الـ lowStockLimit الديناميكي
  const stats = [
    {
      title: "TOTAL PRODUCTS",
      value: products.length,
      icon: <Package className="text-[#6c6cf0]" size={20} />,
      bg: darkMode ? "bg-[#6c6cf0]/10" : "bg-[#f1f1ff]",
    },
    {
      title: "LOW STOCK",
      // هنا بنستخدم الرقم اللي جاي من الإعدادات
      value: products.filter((p) => p.quantity < lowStockLimit).length,
      icon: <AlertTriangle className="text-[#ff7676]" size={20} />,
      bg: darkMode ? "bg-[#ff7676]/10" : "bg-[#fff2f2]",
    },
    {
      title: "TOTAL VALUE",
      value: `${products.reduce((acc, p) => acc + Number(p.price) * Number(p.quantity), 0).toLocaleString()} EGP`,
      icon: <CircleDollarSign className="text-[#5cd65c]" size={20} />,
      bg: darkMode ? "bg-[#5cd65c]/10" : "bg-[#effcef]",
    },
  ];

  if (isAuthenticating) return <LoadingScreen message="Checking......." />;

  return (
    <div
      className={`flex min-h-screen transition-colors duration-500 ${
        darkMode ? "bg-[#0f111a] text-slate-100" : "bg-[#fcfdff] text-[#1e2238]"
      }`}
    >
      <Sidebar />

      <main className="flex-1 p-4 md:p-8 xl:p-10 xl:ml-64 w-full transition-all duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pt-12 xl:pt-0">
          <div>
            <h1
              className={`text-2xl font-bold ${darkMode ? "text-white" : "text-[#1e2238]"}`}
            >
              Dashboard Overview
            </h1>
            <p className="text-[#a0a5ba] text-sm mt-1">
              Welcome back, {userName}!
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div
              className={`flex items-center gap-2.5 p-1.5 pr-4 rounded-full shadow-sm border ${
                darkMode
                  ? "bg-[#1a1d2e] border-slate-700"
                  : "bg-white border-slate-50"
              }`}
            >
              <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span
                className={`text-sm font-semibold ${darkMode ? "text-slate-200" : "text-[#1e2238]"}`}
              >
                {userName}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className={`border-none shadow-sm rounded-2xl hover:shadow-md transition-all ${
                darkMode ? "bg-[#1a1d2e]" : "bg-white"
              }`}
            >
              <CardHeader className="flex flex-row items-start justify-between pb-2 pt-6 px-6">
                <CardTitle className="text-[11px] font-bold text-[#b3b8ca] uppercase tracking-[1px]">
                  {stat.title}
                </CardTitle>
                <div
                  className={`${stat.bg} w-10 h-10 rounded-xl flex items-center justify-center`}
                >
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div
                  className={`text-3xl font-black ${darkMode ? "text-white" : "text-[#1e2238]"}`}
                >
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Inventory Table Section */}
        <Card
          className={`border-none shadow-sm rounded-2xl overflow-hidden ${
            darkMode ? "bg-[#1a1d2e]" : "bg-white"
          }`}
        >
          <CardHeader
            className={`flex flex-col md:flex-row items-center justify-between py-2 px-6 border-b gap-4 ${
              darkMode ? "border-slate-700" : "border-slate-50"
            }`}
          >
            <div className="w-full">
              <CardTitle
                className={`text-lg font-bold ${darkMode ? "text-white" : "text-[#1e2238]"}`}
              >
                Inventory List
              </CardTitle>
              <p className="text-xs text-[#b3b8ca] font-medium">
                Real-time stock management
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 w-full">
              <div className="relative w-full sm:max-w-75">
                <Search
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b3b8ca]"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none transition-all text-sm ${
                    darkMode
                      ? "bg-slate-800 border-slate-700 text-white focus:border-primary"
                      : "bg-[#fbfdff] border-slate-100 focus:border-primary/40 text-[#1e2238]"
                  }`}
                />
              </div>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary hover:bg-[#4a4ad4] gap-2 h-11 px-6 rounded-xl text-sm font-bold w-full sm:w-auto shadow-lg shadow-primary/20"
              >
                <Plus size={18} /> Add Product
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {isLoadingData ? (
              <div className="py-20 text-center text-sm font-bold text-slate-500 animate-pulse">
                Updating Inventory...
              </div>
            ) : (
              // بنمرر الـ darkMode للـ DataTable لو محتاج كلاسات داخلية
              <DataTable filteredProducts={filteredProducts} />
            )}
          </CardContent>
        </Card>
      </main>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fetchProducts={fetchProducts}
      />
    </div>
  );
}
