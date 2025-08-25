"use client"

import Link from "next/link"
import { motion } from "framer-motion"

interface HeroProps {
  togglePanel: () => void
}

export default function Hero({ togglePanel }: HeroProps) {
  return (
    <section className="flex flex-col items-center justify-center text-center py-16 px-4 sm:px-6 lg:px-8 
                        bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-200 shadow-inner rounded-2xl
                        border border-blue-200/50">
      
      {/* Título con animación */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6"
      >
        Gestión Global de <span className="text-blue-700">Marcas Registradas</span>
      </motion.h2>

      {/* Texto descriptivo */}
      <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto mb-6">
        Protege tu propiedad intelectual, monitorea falsificaciones y elimina usos no autorizados 
        en redes sociales, marketplaces y motores de búsqueda.
      </p>

      {/* Botones en fila */}
      <div className="flex justify-center gap-4 mt-6">
        {/* Botón para ir al panel (listar registros) */}
        <Link
          href="/brands"
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
                     text-white rounded-lg font-semibold shadow-lg hover:shadow-xl 
                     transition-all duration-300 flex items-center justify-center"
        >
          Ir al Panel
        </Link>

        {/* Botón para crear una nueva marca */}
        <Link
          href="/brands/new"
          className="px-8 py-3 border-2 border-blue-600 text-blue-700 bg-white/90 backdrop-blur-sm rounded-lg 
                     hover:bg-blue-600 hover:text-white hover:border-blue-600 active:bg-blue-700 
                     transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-xl 
                     hover:shadow-blue-500/30 transform hover:-translate-y-1 active:translate-y-0"
        >
          Registrar Nueva Marca
        </Link>
      </div>
    </section>
  )
}
