"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, Plus, Filter, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/Badge"
import BrandsTable from "./BrandsTable"
import DeleteConfirmationModal from "./DeleteConfirmationModal"
import type { Brand } from "@/shared/types/brand"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface BrandsPanelProps {
  brands?: Brand[] // Made brands optional to handle undefined case
  onDelete: (id: string) => void
  onEdit?: (brand: Brand) => void
  isLoading?: boolean
}

export default function BrandsPanel({ brands = [], onDelete, onEdit, isLoading = false }: BrandsPanelProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [countryFilter, setCountryFilter] = useState<string>("all")
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; brand: Brand | null }>({
    isOpen: false,
    brand: null
  })
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  // Función para navegar al formulario de nueva marca
  const handleNewBrand = () => {
    router.push('/brands/new')
  }

  // Función para navegar al formulario de edición
  const handleEdit = (brand: Brand) => {
    router.push(`/brands/${brand.id}/edit`)
  }

  // Función para abrir el modal de confirmación de eliminación
  const handleDeleteClick = (brand: Brand) => {
    setDeleteModal({ isOpen: true, brand })
  }

  // Función para confirmar la eliminación
  const handleConfirmDelete = async () => {
    if (!deleteModal.brand) return

    setIsDeleting(true)
    try {
      await onDelete(deleteModal.brand.id)
      setDeleteModal({ isOpen: false, brand: null })
    } catch (error) {
      console.error("Error deleting brand:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  // Función para cancelar la eliminación
  const handleCancelDelete = () => {
    setDeleteModal({ isOpen: false, brand: null })
  }

  // Calcular estadísticas
  const stats = useMemo(() => {
    const total = brands.length
    const active = brands.filter(brand => brand.status === 'active').length
    const pending = brands.filter(brand => brand.status === 'pending').length
    const inactive = brands.filter(brand => brand.status === 'inactive').length
    
    return { total, active, pending, inactive }
  }, [brands])

  // Obtener países únicos para el filtro
  const uniqueCountries = useMemo(() => {
    const countries = brands.map(brand => brand.country).filter(Boolean)
    return [...new Set(countries)].sort()
  }, [brands])

  // Filtrar marcas basado en búsqueda y filtros
  const filteredBrands = useMemo(() => {
    let filtered = brands

    // Filtro por término de búsqueda
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(brand =>
        brand.name.toLowerCase().includes(searchLower) ||
        brand.registration_number?.toLowerCase().includes(searchLower) ||
        brand.country?.toLowerCase().includes(searchLower) ||
        brand.monitored_platforms?.toLowerCase().includes(searchLower) ||
        brand.authority_collaboration?.toLowerCase().includes(searchLower)
      )
    }

    // Filtro por estado
    if (statusFilter !== 'all') {
      filtered = filtered.filter(brand => brand.status === statusFilter)
    }

    // Filtro por país
    if (countryFilter !== 'all') {
      filtered = filtered.filter(brand => brand.country === countryFilter)
    }

    return filtered
  }, [brands, searchTerm, statusFilter, countryFilter])

  // Variable segura para brands
  const safeBrands = brands || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl bg-white shadow-xl rounded-2xl p-8 space-y-6"
      >
        {/* Header del Panel */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <Link
                href="/"
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Control de Marcas</h1>
                <p className="text-gray-600">Gestiona y monitorea todas tus marcas registradas desde un solo lugar</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={handleNewBrand}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 flex items-center gap-2"
                size="sm"
              >
                <Plus className="h-4 w-4" />
                Nueva Marca
              </Button>
            </div>
          </div>
        </div>

        {/* Estadísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Marcas</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-600 rounded"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Activas</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                {stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0}%
              </Badge>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                {stats.total > 0 ? Math.round((stats.pending / stats.total) * 100) : 0}%
              </Badge>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inactivas</p>
                <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
              </div>
              <Badge className="bg-red-100 text-red-800 border-red-200">
                {stats.total > 0 ? Math.round((stats.inactive / stats.total) * 100) : 0}%
              </Badge>
            </div>
          </div>
        </div>

        {/* Barra de Búsqueda y Filtros */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Búsqueda */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Buscar por nombre, número de registro, país o plataformas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Filtros */}
            <div className="flex gap-3">
              <div className="min-w-[140px]">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
                >
                  <option value="all">Todos los estados</option>
                  <option value="active">Activas</option>
                  <option value="pending">Pendientes</option>
                  <option value="inactive">Inactivas</option>
                </select>
              </div>

              <div className="min-w-[140px]">
                <select
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
                >
                  <option value="all">Todos los países</option>
                  {uniqueCountries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="px-4 py-3 flex items-center gap-2 bg-transparent"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setCountryFilter("all");
                }}
              >
                <Filter className="h-4 w-4" />
                Limpiar
              </Button>
            </div>
          </div>

          {/* Resultados de búsqueda */}
          {searchTerm && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Mostrando <span className="font-semibold">{filteredBrands.length}</span> de{" "}
                <span className="font-semibold">{safeBrands.length}</span> marcas
                {searchTerm && <span> para "{searchTerm}"</span>}
              </p>
            </div>
          )}
        </div>

        {/* Tabla de Marcas */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {filteredBrands.length > 0 ? (
            <BrandsTable brands={filteredBrands} onDelete={handleDeleteClick} onEdit={handleEdit} />
          ) : (
            <div className="p-8 text-center text-gray-500">No hay marcas registradas.</div>
          )}
        </div>

        {/* Modal de Confirmación de Eliminación */}
        <DeleteConfirmationModal
          isOpen={deleteModal.isOpen}
          brand={deleteModal.brand}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          isLoading={isDeleting}
        />
      </motion.div>
    </div>
  )
}
