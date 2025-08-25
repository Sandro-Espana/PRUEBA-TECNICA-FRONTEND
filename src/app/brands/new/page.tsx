"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useState } from "react"
import BrandForm from "@/components/brands/BrandForm"
import { CreateBrandRequest } from "@/shared/types/brand"
import { useBrands } from "@/shared/context/BrandsContext"
import { BrandsProvider } from "@/shared/context/BrandsContext"

 function NewBrandContent() {
  const router = useRouter()
  const { addBrand, loading, error } = useBrands()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: CreateBrandRequest) => {
    setIsSubmitting(true)
    try {
      setSubmitError(null)
      await addBrand(data)
      setSuccessMessage('Marca creada exitosamente')
      setTimeout(() => {
        setSuccessMessage(null)
        router.push("/")
      }, 5000)
    } catch (err: unknown) {
      if (typeof err === 'object' && err && 'response' in err && (err as any).response?.data?.detail) {
        setSubmitError((err as any).response.data.detail)
      } else if (typeof err === 'object' && err && 'message' in err) {
        setSubmitError((err as any).message)
      } else {
        setSubmitError('Error al crear la marca')
      }
      console.error('Error creating brand:', err)
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    router.push("/")
  }

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8"
      >
        {/* Título TRADEMARK */}
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          TRADEMARK
        </h1>

        {/* Mostrar error del contexto si existe */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Mostrar error del submit si existe */}
        {submitError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{submitError}</p>
          </div>
        )}

        <BrandForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isEditing={false}
          isLoading={loading || isSubmitting}
          submitError={submitError}
        />

        {/* Mostrar mensaje de éxito si existe, en la parte inferior */}
        {successMessage && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-lg font-semibold text-center">{successMessage}</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default function NewBrandPage() {
  return (
    <BrandsProvider>
      <NewBrandContent />
    </BrandsProvider>
  )
}