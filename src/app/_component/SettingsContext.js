"use client";
import { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [lowStockLimit, setLowStockLimit] = useState(5);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedLimit = localStorage.getItem("lowStockLimit");

    setTimeout(() => {
      if (savedTheme === "dark") setDarkMode(true);
      if (savedLimit) setLowStockLimit(Number(savedLimit));
    }, 0);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const updateLowStockLimit = (limit) => {
    setLowStockLimit(limit);
    localStorage.setItem("lowStockLimit", limit);
  };

  return (
    <SettingsContext.Provider
      value={{ darkMode, setDarkMode, lowStockLimit, updateLowStockLimit }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
