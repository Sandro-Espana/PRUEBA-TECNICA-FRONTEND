"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Save, X, Calendar, Globe, Shield, Monitor, Link as LinkIcon } from "lucide-react"
import Link from "next/link"
import { CreateBrandRequest } from "@/shared/types/brand"

interface BrandFormProps {
  onSubmit: (data: CreateBrandRequest) => void
  onCancel: () => void
  initialData?: Partial<CreateBrandRequest>
  isEditing?: boolean
  isLoading?: boolean
  submitError?: string | null
}

export default function BrandForm({ onSubmit, onCancel, initialData, isEditing = false, isLoading = false, submitError }: BrandFormProps) {
  const [formData, setFormData] = useState<CreateBrandRequest>({
    name: initialData?.name || "",
    registration_number: initialData?.registration_number || "",
    country: initialData?.country || "",
    registration_date: initialData?.registration_date || "",
    status: initialData?.status || "pending",
    monitored_platforms: initialData?.monitored_platforms || "",
    can_enforce: initialData?.can_enforce ?? true,
    authority_collaboration: initialData?.authority_collaboration || "",
    last_monitoring_date: initialData?.last_monitoring_date || "",
    evidence_link: initialData?.evidence_link || ""
  })

  const [errors, setErrors] = useState<Partial<CreateBrandRequest>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateBrandRequest> = {}

    if (!isEditing) {
      // Validación completa para nuevas marcas
      if (!formData.name.trim()) {
        newErrors.name = "El nombre de la marca es requerido"
      }

      if (!formData.registration_number.trim()) {
        newErrors.registration_number = "El número de registro es requerido"
      }

      if (!formData.country.trim()) {
        newErrors.country = "El país es requerido"
      }

      if (!formData.registration_date) {
        newErrors.registration_date = "La fecha de registro es requerida"
      }
    }

    // Validación para campos editables (tanto en creación como en edición)
    if (!formData.monitored_platforms.trim()) {
      newErrors.monitored_platforms = "Las plataformas monitoreadas son requeridas"
    }

    if (!formData.authority_collaboration.trim()) {
      newErrors.authority_collaboration = "La autoridad de colaboración es requerida"
    }

    if (!formData.last_monitoring_date) {
      newErrors.last_monitoring_date = "La fecha del último monitoreo es requerida"
    }

    if (!formData.evidence_link.trim()) {
      newErrors.evidence_link = "El enlace de evidencia es requerido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleInputChange = (field: keyof CreateBrandRequest, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0]
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Header del Formulario */}
      <div className="bg-white rounded-t-xl shadow-lg border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isEditing ? "Editar Marca" : "Registrar Nueva Marca"}
              </h1>
              <p className="text-gray-600 mt-1">
                {isEditing 
                  ? "Modifica la información de la marca seleccionada"
                  : "Completa la información para registrar una nueva marca"
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="bg-white rounded-b-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombre de la Marca - Solo lectura en edición */}
          <div className="md:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de la Marca {!isEditing && "*"}
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              disabled={isEditing}
              style={{ color: 'black' }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.name ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
              } ${isEditing ? "bg-gray-100 cursor-not-allowed" : ""}`}
              placeholder="Ej: TechCorp Solutions"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Número de Registro - Solo lectura en edición */}
          <div>
            <label htmlFor="registration_number" className="block text-sm font-medium text-gray-700 mb-2">
              Número de Registro {!isEditing && "*"}
            </label>
            <input
              type="text"
              id="registration_number"
              value={formData.registration_number}
              onChange={(e) => handleInputChange("registration_number", e.target.value)}
              disabled={isEditing}
              style={{ color: 'black' }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.registration_number ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
              } ${isEditing ? "bg-gray-100 cursor-not-allowed" : ""}`}
              placeholder="Ej: 0234567"
            />
            {errors.registration_number && (
              <p className="mt-1 text-sm text-red-600">{errors.registration_number}</p>
            )}
          </div>

          {/* País - Solo lectura en edición */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
              País {!isEditing && "*"}
            </label>
            <input
              type="text"
              id="country"
              value={formData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              disabled={isEditing}
              style={{ color: 'black' }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.country ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
              } ${isEditing ? "bg-gray-100 cursor-not-allowed" : ""}`}
              placeholder="Ej: Colombia"
            />
            {errors.country && (
              <p className="mt-1 text-sm text-red-600">{errors.country}</p>
            )}
          </div>

          {/* Fecha de Registro - Solo lectura en edición */}
          <div>
            <label htmlFor="registration_date" className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Registro {!isEditing && "*"}
            </label>
            <input
              type="date"
              id="registration_date"
              value={formData.registration_date}
              onChange={(e) => handleInputChange("registration_date", e.target.value)}
              max={getCurrentDate()}
              disabled={isEditing}
              style={{ color: 'black' }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.registration_date ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
              } ${isEditing ? "bg-gray-100 cursor-not-allowed" : ""}`}
            />
            {errors.registration_date && (
              <p className="mt-1 text-sm text-red-600">{errors.registration_date}</p>
            )}
          </div>

          {/* Estado - EDITABLE */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Estado {isEditing && "*"}
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => handleInputChange("status", e.target.value as any)}
              style={{ color: 'black' }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors hover:border-gray-400"
            >
              <option value="">Selecciona un estado</option>
              <option value="pending">Pendiente de Revisión</option>
              <option value="active">Activa</option>
              <option value="inactive">Inactiva</option>
            </select>
            {!isEditing && (
              <p className="mt-1 text-sm text-gray-500">
                El estado inicial será "Pendiente de Revisión" para nuevas marcas
              </p>
            )}
          </div>

          {/* Plataformas Monitoreadas - EDITABLE */}
          <div className="md:col-span-2">
            <label htmlFor="monitored_platforms" className="block text-sm font-medium text-gray-700 mb-2">
              Plataformas Monitoreadas {isEditing && "*"}
            </label>
            <input
              type="text"
              id="monitored_platforms"
              value={formData.monitored_platforms}
              onChange={(e) => handleInputChange("monitored_platforms", e.target.value)}
              style={{ color: 'black' }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.monitored_platforms ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
              }`}
              placeholder="Ej: Netflix, Amazon, YouTube"
            />
            {errors.monitored_platforms && (
              <p className="mt-1 text-sm text-red-600">{errors.monitored_platforms}</p>
            )}
          </div>

          {/* Puede Hacer Cumplir - EDITABLE */}
          <div>
            <label htmlFor="can_enforce" className="block text-sm font-medium text-gray-700 mb-2">
              Capacidad de Cumplimiento Legal {isEditing && "*"}
            </label>
            <p className="text-sm text-gray-500 mb-3">
              ¿La marca tiene capacidad legal para hacer cumplir sus derechos de propiedad intelectual?
            </p>
            <div className="flex items-center space-x-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="can_enforce"
                  value="true"
                  checked={formData.can_enforce === true}
                  onChange={() => handleInputChange("can_enforce", true)}
                  className="mr-3 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span className="text-sm font-medium text-gray-700">Sí</span>
                
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="can_enforce"
                  value="false"
                  checked={formData.can_enforce === false}
                  onChange={() => handleInputChange("can_enforce", false)}
                  className="mr-3 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span className="text-sm font-medium text-gray-700">No</span>
              </label>
            </div>
          </div>

          {/* Autoridad de Colaboración - EDITABLE */}
          <div>
            <label htmlFor="authority_collaboration" className="block text-sm font-medium text-gray-700 mb-2">
              Autoridad de Colaboración {isEditing && "*"}
            </label>
            <input
              type="text"
              id="authority_collaboration"
              value={formData.authority_collaboration}
              onChange={(e) => handleInputChange("authority_collaboration", e.target.value)}
              style={{ color: 'black' }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.authority_collaboration ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
              }`}
              placeholder="Ej: SIC, DIAN, etc."
            />
            {errors.authority_collaboration && (
              <p className="mt-1 text-sm text-red-600">{errors.authority_collaboration}</p>
            )}
          </div>

          {/* Fecha del Último Monitoreo - EDITABLE */}
          <div>
            <label htmlFor="last_monitoring_date" className="block text-sm font-medium text-gray-700 mb-2">
              Fecha del Último Monitoreo {isEditing && "*"}
            </label>
            <input
              type="date"
              id="last_monitoring_date"
              value={formData.last_monitoring_date}
              onChange={(e) => handleInputChange("last_monitoring_date", e.target.value)}
              max={getCurrentDate()}
              style={{ color: 'black' }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.last_monitoring_date ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
              }`}
            />
            {errors.last_monitoring_date && (
              <p className="mt-1 text-sm text-red-600">{errors.last_monitoring_date}</p>
            )}
          </div>

          {/* Enlace de Evidencia - EDITABLE */}
          <div className="md:col-span-2">
            <label htmlFor="evidence_link" className="block text-sm font-medium text-gray-700 mb-2">
              Enlace de Evidencia {isEditing && "*"}
            </label>
            <input
              type="url"
              id="evidence_link"
              value={formData.evidence_link}
              onChange={(e) => handleInputChange("evidence_link", e.target.value)}
              style={{ color: 'black' }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.evidence_link ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
              }`}
              placeholder="https://ejemplo.com/evidencia"
            />
            {errors.evidence_link && (
              <p className="mt-1 text-sm text-red-600">{errors.evidence_link}</p>
            )}
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-6 py-3 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="h-4 w-4 inline mr-2" />
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                {isEditing ? "Actualizando..." : "Registrando..."}
              </>
            ) : (
              <>
                <Save className="h-4 w-4 inline mr-2" />
                {isEditing ? "Actualizar Marca" : "Registrar Marca"}
              </>
            )}
          </button>
        </div>
        {submitError && (
          <div className="mt-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm text-center">
            <strong>No se pudo registrar la marca:</strong> {submitError}
          </div>
        )}
      </form>
    </motion.div>
  )
}
