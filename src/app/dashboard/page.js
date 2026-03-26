"use client";
import { useState } from "react";
import Sidebar from "../_component/sidebar";
import AddProductModal from "../_component/addProductModal"; // استيراد المودال الجديد
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Package,
  AlertTriangle,
  CircleDollarSign,
  Search,
} from "lucide-react";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // مصفوفة البيانات (هنا الجدول بيتولد أوتوماتيك بناءً عليها)
  const [products, setProducts] = useState([]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const stats = [
    {
      title: "TOTAL PRODUCTS",
      value: products.length,
      icon: <Package className="text-[#6c6cf0]" size={20} />,
      bg: "bg-[#f1f1ff]",
    },
    {
      title: "LOW STOCK",
      value: products.filter((p) => p.quantity < 5).length,
      icon: <AlertTriangle className="text-[#ff7676]" size={20} />,
      bg: "bg-[#fff2f2]",
    },
    {
      title: "TOTAL VALUE",
      value: `${products.reduce((acc, p) => acc + p.price * p.quantity, 0)} EGP`,
      icon: <CircleDollarSign className="text-[#5cd65c]" size={20} />,
      bg: "bg-[#effcef]",
    },
  ];

  return (
    <div className="flex bg-[#fcfdff] min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 xl:p-10 xl:ml-64 w-full transition-all duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pt-12 xl:pt-0">
          <div>
            <h1 className="text-2xl font-semibold text-[#1e2238]">Dashboard</h1>
            <p className="text-[#a0a5ba] text-sm mt-1">Inventory overview</p>
          </div>
          <div className="flex items-center gap-2.5 bg-white p-1.5 pr-4 rounded-full shadow-sm">
            <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
              M
            </div>
            <span className="text-sm font-medium text-[#1e2238]">Mohamed</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className="border border-slate-100 shadow-sm rounded-xl"
            >
              <CardHeader className="flex flex-row items-start justify-between pb-1.5 pt-6 px-6">
                <CardTitle className="text-[10px] md:text-xs font-semibold text-[#b3b8ca] uppercase tracking-wider">
                  {stat.title}
                </CardTitle>
                <div
                  className={`${stat.bg} w-10 h-10 rounded-full flex items-center justify-center`}
                >
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-0">
                <div className="text-3xl md:text-[42px] font-bold text-[#1e2238] leading-tight">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Table Section */}
        <Card className="border border-slate-100 shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="flex flex-col md:flex-row items-center justify-between py-6 px-6 border-b border-slate-50 gap-4">
            <div>
              <CardTitle className="text-lg font-semibold text-[#1e2238]">
                Products
              </CardTitle>
              <p className="text-sm text-[#b3b8ca] mt-0.5">
                Manage your inventory
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <Search
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b3b8ca]"
                  size={17}
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-100 focus:outline-none focus:ring-1 focus:ring-primary/20 bg-[#fbfdff] text-sm"
                />
              </div>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary hover:bg-[#4a4ad4] gap-2 h-11 px-5 rounded-xl text-sm font-medium w-full sm:w-auto"
              >
                <Plus size={18} /> Add Product
              </Button>
            </div>
          </CardHeader>

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
                    <th className="py-4 text-[11px] font-semibold text-[#b3b8ca] uppercase tracking-wider text-right px-8">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-24 text-center bg-white">
                        <div className="flex flex-col items-center">
                          <div className="bg-[#f8f9fc] p-6 rounded-full mb-5">
                            <Package size={40} className="text-[#d0d5e2]" />
                          </div>
                          <p className="text-[#1e2238] font-bold text-lg mb-1">
                            No products yet
                          </p>
                          <p className="text-[#a0a5ba] text-sm font-medium">
                            Click &quot;Add Product&quot; to get started
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="py-4 px-6 text-sm font-medium text-[#1e2238]">
                          {product.name}
                        </td>
                        <td className="py-4 px-6 text-sm text-[#a0a5ba]">
                          {product.category}
                        </td>
                        <td className="py-4 px-6 text-sm text-[#1e2238] font-medium">
                          {product.quantity}
                        </td>
                        <td className="py-4 px-6 text-sm text-[#1e2238] font-medium">
                          {product.price} EGP
                        </td>
                        <td className="py-4 text-right space-x-2 px-8">
                          <button className="text-primary text-xs font-bold hover:underline">
                            Edit
                          </button>
                          <button className="text-red-500 text-xs font-bold hover:underline">
                            Delete
                          </button>
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

      {/* استدعاء المودال المنفصل */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
