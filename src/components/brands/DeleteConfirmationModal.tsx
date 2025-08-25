"use client"

import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/Button"
import type { Brand } from "@/shared/types/brand"

interface DeleteConfirmationModalProps {
  isOpen: boolean
  brand: Brand | null
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
}

export default function DeleteConfirmationModal({
  isOpen,
  brand,
  onConfirm,
  onCancel,
  isLoading = false
}: DeleteConfirmationModalProps) {
  if (!isOpen || !brand) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onCancel}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Confirmar Eliminación
              </h3>
            </div>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isLoading}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Contenido */}
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              ¿Estás seguro de que quieres eliminar la marca <strong>"{brand.name}"</strong>?
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Número de Registro:</span>
                <span className="font-medium text-gray-900">{brand.registration_number}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">País:</span>
                <span className="font-medium text-gray-900">{brand.country}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Estado:</span>
                <span className="font-medium text-gray-900 capitalize">{brand.status}</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">
                <strong>⚠️ Advertencia:</strong> Esta acción no se puede deshacer. 
                La marca será eliminada permanentemente del sistema.
              </p>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </Button>
            <Button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 bg-red-600 hover:bg-red-700 border-red-600"
            >
              {isLoading ? (
                <>
                  <div className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Eliminando...
                </>
              ) : (
                "Eliminar Marca"
              )}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
