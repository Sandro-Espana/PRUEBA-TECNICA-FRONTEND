"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { ReactNode } from "react"

interface ActionButtonProps {
  onClick: () => void
  label: string
  className?: string
  icon?: ReactNode // 👈 Nuevo: permitir cambiar el ícono
  variant?: "primary" | "secondary" | "danger" // 👈 Opcional: estilos por intención
}

export default function ActionButton({
  onClick,
  label,
  className = "",
  icon = <ChevronRight className="h-5 w-5" />, // por defecto
  variant = "primary",
}: ActionButtonProps) {
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl 
                  transition-all duration-300 flex items-center gap-2 
                  ${variantClasses[variant]} ${className}`}
    >
      {label}
      {icon}
    </motion.button>
  )
}
