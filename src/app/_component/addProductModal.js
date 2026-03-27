"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Cookies from "js-cookie";
import { useSettings } from "../_component/SettingsContext"; 

export default function AddProductModal({ isOpen, onClose, fetchProducts }) {
  const { darkMode } = useSettings();

  // 2. تعديل الـ Styles لتناسب الـ Dark Mode
  const labelStyle = `block text-sm font-semibold mb-1.5 ${
    darkMode ? "text-slate-300" : "text-[#1e2238]"
  }`;

  const inputStyle = `w-full p-3 rounded-xl border outline-none transition-all text-sm ${
    darkMode
      ? "bg-slate-800 border-slate-700 text-white focus:border-primary"
      : "bg-white border-slate-200 focus:border-primary text-slate-900"
  }`;

  const inputModuleOne = [
    {
      label: "Product Name",
      type: "text",
      placeholder: "Enter product name",
      name: "name",
    },
    {
      label: "Category",
      type: "text",
      placeholder: "Enter category name",
      name: "category",
    },
  ];

  const inputModuleTwo = [
    {
      label: "Quantity",
      type: "number",
      placeholder: "0",
      name: "quantity",
    },
    {
      label: "Price (EGP)",
      type: "number",
      placeholder: "0.00",
      name: "price",
    },
  ];

  const [loading, setLoading] = useState(false);
  const [obj, setObj] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
  });

  const handlerInput = (e) => {
    setObj({ ...obj, [e.target.name]: e.target.value });
  };

  const handlerForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = Cookies.get("auth-token");
      const response = await fetch(
        "https://inventory-app-api-beta.vercel.app/inventory/add",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        },
      );

      if (!response.ok) throw new Error("Failed to add product");

      // تحديث البيانات في الـ Dashboard بعد الإضافة
      if (fetchProducts) fetchProducts();

      // تصغير الفورم وقفل المودال
      setObj({ name: "", category: "", quantity: "", price: "" });
      onClose();
    } catch (error) {
      alert(error.message || "Error adding product");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay مع Blur خفيف */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`rounded-2xl shadow-2xl w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-200 ${
          darkMode ? "bg-[#1a1d2e] border border-slate-800" : "bg-white"
        }`}
      >
        <div
          className={`flex items-center justify-between p-6 border-b ${
            darkMode ? "border-slate-800" : "border-slate-50"
          }`}
        >
          <h2
            className={`text-xl font-bold ${darkMode ? "text-white" : "text-[#1e2238]"}`}
          >
            Add New Product
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form className="p-6 space-y-4" onSubmit={handlerForm}>
          {inputModuleOne.map((module) => (
            <div key={module.name}>
              <label className={labelStyle}>{module.label}</label>
              <input
                type={module.type}
                className={inputStyle}
                placeholder={module.placeholder}
                name={module.name}
                value={obj[module.name]}
                onChange={handlerInput}
                required
              />
            </div>
          ))}

          <div className="grid grid-cols-2 gap-4">
            {inputModuleTwo.map((module) => (
              <div key={module.name}>
                <label className={labelStyle}>{module.label}</label>
                <input
                  type={module.type}
                  className={inputStyle}
                  placeholder={module.placeholder}
                  name={module.name}
                  value={obj[module.name]}
                  onChange={handlerInput}
                  required
                />
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={onClose}
              className={`flex-1 h-12 rounded-xl font-semibold ${
                darkMode
                  ? "border-slate-700 text-slate-300 hover:bg-slate-800"
                  : ""
              }`}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 h-12 bg-primary hover:bg-primary/90 rounded-xl font-semibold text-white transition-all active:scale-95"
              type="submit"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
