"use client"; // ضيف دي عشان نستخدم الـ Hook
import { Package, Edit2, Trash2 } from "lucide-react";
import { useSettings } from "../_component/SettingsContext"; 

export default function DataTable({ filteredProducts }) {
  const { darkMode, lowStockLimit } = useSettings(); // جلب الإعدادات

  const thStyle = `py-4 px-8 text-[11px] font-bold uppercase tracking-wider ${
    darkMode ? "text-slate-400" : "text-[#b3b8ca]"
  }`;

  const thLabel = ["Product Name", "Category", "Stock", "Price", "Actions"];

  return (
    <div className="overflow-x-auto custom-scrollbar">
      <table className="w-full text-left border-collapse min-w-175">
        <thead>
          <tr
            className={`border-b ${darkMode ? "bg-slate-800/50 border-slate-700" : "bg-[#fbfdff] border-slate-50"}`}
          >
            {thLabel.map((label) => (
              <th key={label} className={thStyle}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          className={`divide-y ${darkMode ? "divide-slate-700" : "divide-slate-50"}`}
        >
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-20 text-center">
                <div
                  className={`flex flex-col items-center opacity-40 ${darkMode ? "text-slate-400" : ""}`}
                >
                  <Package size={48} className="mb-3" />
                  <p className="font-bold text-lg">Your inventory is empty</p>
                </div>
              </td>
            </tr>
          ) : (
            filteredProducts.map((product) => (
              <tr
                key={product.id}
                className={`transition-colors group ${darkMode ? "hover:bg-slate-800/40" : "hover:bg-slate-50/50"}`}
              >
                <td
                  className={`py-4 px-8 text-sm font-bold ${darkMode ? "text-slate-200" : "text-[#1e2238]"}`}
                >
                  {product.name}
                </td>
                <td className="py-4 px-6 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      darkMode
                        ? "bg-slate-700 text-slate-300"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {product.category}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm font-bold">
                  {/* الربط بالـ lowStockLimit من الإعدادات */}
                  <span
                    className={
                      Number(product.quantity) < lowStockLimit
                        ? "text-red-500 font-black animate-pulse"
                        : darkMode
                          ? "text-slate-300"
                          : "text-[#1e2238]"
                    }
                  >
                    {product.quantity}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm font-black text-primary">
                  {Number(product.price).toLocaleString()} EGP
                </td>
                <td className="py-4 px-8 text-right space-x-4">
                  <button className="text-[#a0a5ba] hover:text-primary transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button className="text-red-300 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
