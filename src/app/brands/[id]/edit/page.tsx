"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useBrands } from "@/shared/context/BrandsContext"
import BrandForm from "@/components/brands/BrandForm"
import type { Brand, CreateBrandRequest } from "@/shared/types/brand"
import { BrandsProvider } from "@/shared/context/BrandsContext"

function EditBrandPageContent() {
  const params = useParams()
  const router = useRouter()
  const { getBrandById, updateBrand, loading, error } = useBrands()
  const [brand, setBrand] = useState<Brand | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const brandId = params.id as string

  useEffect(() => {
    const fetchBrand = async () => {
      if (brandId) {
        try {
          const brandData = await getBrandById(brandId)
          setBrand(brandData)
        } catch (err) {
          console.error("Error fetching brand:", err)
          setSubmitError("Error al cargar la marca")
        }
      }
    }

    fetchBrand()
  }, [brandId, getBrandById])

  const handleSubmit = async (data: CreateBrandRequest) => {
    if (!brand) return

    setIsLoading(true)
    setSubmitError(null)

    try {
      // Solo actualizar los campos permitidos para edición
      const updateData = {
        status: data.status,
        monitored_platforms: data.monitored_platforms,
        last_monitoring_date: data.last_monitoring_date,
        evidence_link: data.evidence_link,
        can_enforce: data.can_enforce,
        authority_collaboration: data.authority_collaboration
      }

      await updateBrand(brand.id, updateData)
      setIsSuccess(true)
      
      // NO resetear isLoading aquí para mantener el botón bloqueado
      // Redirigir automáticamente al panel después de 2 segundos
      setTimeout(() => {
        router.push("/brands")
      }, 2000)
    } catch (err) {
      console.error("Error updating brand:", err)
      setSubmitError("Error al actualizar la marca")
      // Solo resetear isLoading en caso de error
      setIsLoading(false)
    }
    // Removido el finally que reseteaba isLoading
  }

  const handleCancel = () => {
    router.push("/brands")
  }

  const handleBackToPanel = () => {
    router.push("/brands")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando marca...</p>
        </div>
      </div>
    )
  }

  if (error || !brand) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            {submitError || "Error al cargar la marca"}
          </p>
          <button
            onClick={() => router.push("/brands")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Volver al Panel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Mensaje de éxito */}
      {isSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-medium">¡Marca actualizada exitosamente!</span>
          </div>
          <p className="text-sm mt-1">Los cambios han sido guardados correctamente.</p>
          <p className="text-xs mt-2 text-green-600">Serás redirigido al panel en unos segundos...</p>
          <button
            onClick={handleBackToPanel}
            className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Volver al Panel Ahora
          </button>
        </div>
      )}

      <BrandForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        initialData={brand}
        isEditing={true}
        isLoading={isLoading}
        submitError={submitError}
      />
    </div>
  )
}

export default function EditBrandPage() {
  return (
    <BrandsProvider>
      <EditBrandPageContent />
    </BrandsProvider>
  )
}
