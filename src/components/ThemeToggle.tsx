"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    } else {
      setTheme("light")
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  if (!mounted) return null

  return (
    <button
      onClick={toggleTheme}
      aria-label="Cambiar tema"
      className="w-16 h-9 rounded-full p-1 relative flex items-center transition-colors duration-300 bg-neutral-200 dark:bg-neutral-700"
    >
      {/* Íconos de fondo */}
      <div className="absolute left-1 w-6 h-6">
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="6" fill="#60A5FA" />
        </svg>
      </div>
      <div className="absolute right-1 w-6 h-6">
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="6" fill="#F97316" />
        </svg>
      </div>

      {/* Círculo deslizante animado */}
      <motion.div
        initial={false}
        animate={{ x: theme === "dark" ? 28 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-7 h-7 bg-white rounded-full shadow-md z-10"
      />
    </button>
  )
}
