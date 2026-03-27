"use client";

import { useState, useEffect, useCallback } from "react";
import Sidebar from "../_component/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Package, RefreshCw, AlertTriangle } from "lucide-react";
import Cookies from "js-cookie";
import LoadingScreen from "../_component/loadingScreen";
import { useRouter } from "next/navigation";
import { useSettings } from "../_component/SettingsContext";

export default function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const router = useRouter();

  // 2. استخدام البيانات العالمية
  const { darkMode, lowStockLimit } = useSettings();

  const fetchInventory = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = Cookies.get("auth-token");
      const response = await fetch(
        "https://inventory-app-api-beta.vercel.app/inventory/show",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await response.json();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const initializeDashboard = async () => {
      const token = Cookies.get("auth-token");
      if (!token) {
        setIsAuthenticating(false);
        router.push("/login");
        return;
      }
      setIsAuthenticating(false);
      fetchInventory();
    };
    initializeDashboard();
  }, [fetchInventory, router]);

  if (isAuthenticating) return <LoadingScreen />;

  return (
    <div
      className={`flex min-h-screen transition-colors duration-500 ${
        darkMode ? "bg-[#0f111a] text-slate-100" : "bg-[#fcfdff] text-[#1e2238]"
      }`}
    >
      <Sidebar />
      <main className="flex-1 p-4 md:p-10 xl:ml-64 max-xl:mt-12 transition-all duration-300 min-w-0">
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1
              className={`text-2xl font-bold ${darkMode ? "text-white" : "text-[#1e2238]"}`}
            >
              Inventory Management
            </h1>
            <p className="text-[#a0a5ba] text-sm">
              Update prices and manage stock levels
            </p>
          </div>
          <button
            onClick={fetchInventory}
            className={`p-2 rounded-lg transition-colors ${darkMode ? "hover:bg-slate-800 text-slate-500" : "hover:bg-slate-100 text-slate-400"}`}
            title="Refresh Data"
          >
            <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} />
          </button>
        </div>

        {/* Table Section */}
        <Card
          className={`border-none shadow-sm rounded-xl overflow-hidden relative w-full max-w-full ${
            darkMode
              ? "bg-[#1a1d2e] border-slate-800"
              : "bg-white border-slate-100"
          }`}
        >
          {isLoading && (
            <div
              className={`absolute inset-0 z-20 flex flex-col items-center justify-center backdrop-blur-[2px] ${
                darkMode ? "bg-[#1a1d2e]/70" : "bg-white/70"
              }`}
            >
              <div className="w-10 h-10 border-4 border-slate-200 border-t-primary rounded-full animate-spin mb-3"></div>
              <p className="text-sm font-bold text-slate-500 tracking-wide">
                Syncing Inventory...
              </p>
            </div>
          )}

          <CardContent className="p-0">
            <div className="overflow-x-auto w-full custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-200">
                <thead>
                  <tr
                    className={`${darkMode ? "bg-slate-800/50 border-slate-700" : "bg-[#fbfdff] border-slate-50"} border-b`}
                  >
                    <th className="py-5 px-6 text-[11px] font-bold text-[#b3b8ca] uppercase tracking-[1px]">
                      Product Name
                    </th>
                    <th className="py-5 px-6 text-[11px] font-bold text-[#b3b8ca] uppercase tracking-[1px]">
                      Category
                    </th>
                    <th className="py-5 px-6 text-[11px] font-bold text-[#b3b8ca] uppercase tracking-[1px]">
                      Quantity
                    </th>
                    <th className="py-5 px-6 text-[11px] font-bold text-[#b3b8ca] uppercase tracking-[1px]">
                      Price
                    </th>
                    <th className="py-5 px-6 text-[11px] font-bold text-[#b3b8ca] uppercase tracking-[1px]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y ${darkMode ? "divide-slate-700" : "divide-slate-50"}`}
                >
                  {products.length === 0 && !isLoading ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="py-24 text-center italic text-slate-400"
                      >
                        No products found.
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr
                        key={product.id}
                        className={`${darkMode ? "hover:bg-slate-800/40" : "hover:bg-slate-50/50"} transition-all group`}
                      >
                        <td className="py-4 px-6 text-sm font-bold">
                          {product.name}
                        </td>
                        <td className="py-4 px-6 text-sm">
                          <span
                            className={`${darkMode ? "bg-slate-700 text-slate-300" : "bg-slate-100 text-slate-500"} px-3 py-1 rounded-md text-[10px] font-black uppercase`}
                          >
                            {product.category}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm font-bold">
                          {/* 3. الربط بـ lowStockLimit من الـ Context */}
                          <span
                            className={
                              product.quantity < lowStockLimit
                                ? "text-red-500 flex items-center gap-1"
                                : ""
                            }
                          >
                            {product.quantity}
                            {product.quantity < lowStockLimit &&
                              product.quantity > 0 && (
                                <AlertTriangle
                                  size={14}
                                  className="animate-bounce"
                                />
                              )}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm font-black text-primary">
                          {Number(product.price).toLocaleString()}{" "}
                          <span className="text-[10px]">EGP</span>
                        </td>
                        <td className="py-4 px-6 text-sm">
                          {product.quantity > 0 ? (
                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md w-fit">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                              IN STOCK
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md w-fit">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                              OUT OF STOCK
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
