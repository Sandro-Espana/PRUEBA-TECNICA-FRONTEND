"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function SearchBar({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string
  setSearchTerm: (val: string) => void
}) {
  return (
    <div className="relative group">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 group-hover:text-white h-5 w-5 transition-colors duration-200 drop-shadow-sm" />

      <Input
        placeholder="Buscar marcas por nombre, número de registro, país, plataformas o autoridad..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="
          pl-12 pr-4 py-4 
          bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-700/20 
          backdrop-blur-sm
          border-2 border-blue-400/50 
          rounded-xl
          text-white placeholder:text-white/60
          focus:border-white/70 focus:ring-4 focus:ring-white/20
          hover:border-white/60
          transition-all duration-300
          shadow-lg hover:shadow-xl
          drop-shadow-sm
        "
      />

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  )
}
