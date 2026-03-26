"use client";
import { useState } from "react";
import Sidebar from "../_component/sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";

export default function InventoryPage() {
  // الحالة اللي شايلة بيانات المنتجات
  const [products, setProducts] = useState([]);

  return (
    <div className="flex bg-[#fcfdff] min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 md:p-10 xl:ml-64">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1e2238]">
            Inventory Management
          </h1>
          <p className="text-[#a0a5ba] text-sm">
            Update prices and manage stock levels
          </p>
        </div>

        {/* Table Section */}
        <Card className="border border-slate-100 shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-200">
                <thead>
                  <tr className="bg-[#fbfdff] border-b border-slate-50">
                    <th className="py-4 px-6 text-[11px] font-semibold text-[#b3b8ca] uppercase tracking-wider">
                      Name
                    </th>
                    <th className="py-4 px-6 text-[11px] font-semibold text-[#b3b8ca] uppercase tracking-wider">
                      Category
                    </th>
                    <th className="py-4 px-6 text-[11px] font-semibold text-[#b3b8ca] uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="py-4 px-6 text-[11px] font-semibold text-[#b3b8ca] uppercase tracking-wider">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-[#1e2238]">
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-24 text-center bg-white">
                        <div className="flex flex-col items-center">
                          <div className="bg-[#f8f9fc] p-6 rounded-full mb-5">
                            <Package size={40} className="text-[#d0d5e2]" />
                          </div>
                          <p className="text-[#1e2238] font-bold text-lg mb-1">
                            No products yet
                          </p>
                          <p className="text-[#a0a5ba] text-sm">
                            Add products to see them here
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr
                        key={product.id}
                        className="hover:bg-slate-50/50 transition-colors group"
                      >
                        <td className="py-4 px-6 text-sm font-medium">
                          {product.name}
                        </td>
                        <td className="py-4 px-6 text-sm text-[#a0a5ba] font-medium">
                          {product.category}
                        </td>
                        <td className="py-4 px-6 text-sm font-bold">
                          {product.quantity}
                        </td>
                        <td className="py-4 px-6 text-sm font-bold">
                          {product.price.toLocaleString()} EGP
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
