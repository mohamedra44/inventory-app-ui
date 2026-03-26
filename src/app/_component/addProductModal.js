"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AddProductModal({ isOpen, onClose }) {
  const labelStyle = "block text-sm font-semibold text-[#1e2238] mb-1.5";
  const inputStyle =
    "w-full p-3 rounded-xl border border-slate-200 focus:border-primary outline-none transition-all text-sm";

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

  const [obj, setObj] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
  });

  const handlerInput = (e) => {
    setObj({ ...obj, [e.target.name]: e.target.value });
  };

  const handlerForm = (e) => {
    e.preventDefault();
    console.log(obj);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#1e2238]/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-50">
          <h2 className="text-xl font-bold text-[#1e2238]">Add New Product</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form className="p-6 space-y-4" onSubmit={handlerForm}>
          {inputModuleOne.map((module) => {
            return (
              <div key={module.name}>
                <label className={labelStyle}>{module.label}</label>
                <input
                  type={module.type}
                  className={inputStyle}
                  placeholder={module.placeholder}
                  name={module.name}
                  value={obj[module.name]}
                  onChange={handlerInput}
                />
              </div>
            );
          })}

          <div className="grid grid-cols-2 gap-4">
            {inputModuleTwo.map((module) => {
              return (
                <div key={module.name}>
                  <label className={labelStyle}>{module.label}</label>
                  <input
                    type={module.type}
                    className={inputStyle}
                    placeholder={module.placeholder}
                    name={module.name}
                    value={obj[module.name]}
                    onChange={handlerInput}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={onClose}
              className="flex-1 h-12 rounded-xl font-semibold"
            >
              Cancel
            </Button>
            <Button
              className="flex-1 h-12 bg-primary rounded-xl font-semibold text-white"
              type="submit"
            >
              Save Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
