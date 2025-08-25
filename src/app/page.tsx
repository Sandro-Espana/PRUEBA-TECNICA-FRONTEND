"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Hero from "@/components/home/Hero"
import BrandsPanel from "@/components/brands/BrandsPanel"
import { BrandsProvider } from "@/shared/context/BrandsContext"
// import { useBrands } from "@/shared/context/BrandsContext"

export default function HomePage() {
  const [showPanel, setShowPanel] = useState(false)
  // const { brands, deleteBrand } = useBrands()

  const handleDeleteBrand = (id: string) => {
    // deleteBrand(id)
    console.log('Delete brand:', id)
  }

  const togglePanel = () => {
    setShowPanel(prev => !prev)
  }

  return (
    <BrandsProvider>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 relative overflow-hidden">
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Hero togglePanel={togglePanel} />
          </motion.div>

          {/* Brands Panel with Animation */}
          <AnimatePresence mode="wait">
            {showPanel && (
              <motion.div
                key="panel"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                transition={{ 
                  duration: 0.5,
                  ease: "easeOut"
                }}
              >
                {/* <BrandsPanel brands={[]} onDelete={handleDeleteBrand} /> */}
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Panel de Marcas</h2>
                  <p className="text-gray-600">Funcionalidad temporalmente deshabilitada</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <Footer />

        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-30 blur-xl"></div>
          <div className="absolute bottom-40 right-20 w-24 h-24 bg-indigo-200 rounded-full opacity-30 blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-100 rounded-full opacity-40 blur-lg"></div>
        </div>
      </div>
    </BrandsProvider>
  )
}