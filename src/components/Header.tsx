'use client'

import ThemeToggle from "@/components/ThemeToggle"
import { FaGithub, FaLinkedin } from "react-icons/fa"

export default function Header() {
  return (
    <header className="flex justify-between items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
      <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
        Hecho por <span className="font-semibold text-blue-600 dark:text-blue-400">Ricardo Natera</span>
      </div>

      <div className="flex items-center gap-4">
        <a
          href="https://github.com/RicardoNatera/simulador-torneos"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          aria-label="GitHub"
        >
          <FaGithub className="w-5 h-5" />
        </a>

        <a
          href="https://www.linkedin.com/in/natera-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="w-5 h-5" />
        </a>

        <ThemeToggle />
      </div>
    </header>
  )
}
