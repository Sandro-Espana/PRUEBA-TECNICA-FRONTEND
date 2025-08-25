"use client"

import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2, Calendar, Globe, Shield, ExternalLink } from "lucide-react"
import type { Brand } from "@/shared/types/brand"

interface BrandsTableProps {
  brands: Brand[]
  onDelete: (brand: Brand) => void
  onEdit?: (brand: Brand) => void
}

export default function BrandsTable({ brands, onDelete, onEdit }: BrandsTableProps) {
  const getStatusBadge = (status: Brand["status"]) => {
    const variants = {
      active: "bg-green-100 text-green-800 border-green-200 hover:bg-green-200",
      inactive: "bg-red-100 text-red-800 border-red-200 hover:bg-red-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200",
    }

    const labels = {
      active: "Activa",
      inactive: "Inactiva",
      pending: "Pendiente",
    }

    return <Badge className={`${variants[status]} font-medium transition-colors`}>{labels[status]}</Badge>
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    try {
      return new Date(dateString).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    } catch {
      return dateString
    }
  }

  const getEnforcementBadge = (canEnforce: boolean) => {
    return canEnforce ? (
      <Badge className="bg-blue-100 text-blue-800 border-blue-200 font-medium">
        <Shield className="h-3 w-3 mr-1" />
        Sí
      </Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800 border-gray-200 font-medium">No</Badge>
    )
  }

  const truncateText = (text: string, maxLength = 30) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 border-b border-gray-200 hover:bg-gray-50">
            <TableHead className="text-gray-700 font-semibold text-sm py-4">Marca</TableHead>
            <TableHead className="text-gray-700 font-semibold text-sm py-4">Registro</TableHead>
            <TableHead className="text-gray-700 font-semibold text-sm py-4">País</TableHead>
            <TableHead className="text-gray-700 font-semibold text-sm py-4">Estado</TableHead>
            <TableHead className="text-gray-700 font-semibold text-sm py-4">Plataformas</TableHead>
            <TableHead className="text-gray-700 font-semibold text-sm py-4">Cumplimiento</TableHead>
            <TableHead className="text-gray-700 font-semibold text-sm py-4">Último Monitoreo</TableHead>
            <TableHead className="text-right text-gray-700 font-semibold text-sm py-4">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brands.map((brand, index) => (
            <TableRow
              key={brand.id}
              className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
              }`}
            >
              {/* Nombre de la Marca */}
              <TableCell className="py-4">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900 text-sm">{brand.name}</span>
                  {brand.evidence_link && (
                    <a
                      href={brand.evidence_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Ver evidencia
                    </a>
                  )}
                </div>
              </TableCell>

              {/* Número de Registro */}
              <TableCell className="py-4">
                <Badge className="bg-gray-100 text-gray-800 border-gray-200 font-mono text-xs">
                  {brand.registration_number}
                </Badge>
              </TableCell>

              {/* País */}
              <TableCell className="py-4">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-900 font-medium text-sm">{brand.country}</span>
                </div>
              </TableCell>

              {/* Estado */}
              <TableCell className="py-4">{getStatusBadge(brand.status)}</TableCell>

              {/* Plataformas Monitoreadas */}
              <TableCell className="py-4">
                <div className="max-w-[180px]">
                  <span className="text-gray-700 text-sm" title={brand.monitored_platforms}>
                    {truncateText(brand.monitored_platforms, 25)}
                  </span>
                </div>
              </TableCell>

              {/* Puede Hacer Cumplir */}
              <TableCell className="py-4">{getEnforcementBadge(brand.can_enforce)}</TableCell>

              {/* Último Monitoreo */}
              <TableCell className="py-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700 text-sm">{formatDate(brand.last_monitoring_date)}</span>
                </div>
              </TableCell>

              {/* Acciones */}
              <TableCell className="text-right py-4">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-3 text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300"
                    onClick={() => onEdit?.(brand)}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-3 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                    onClick={() => onDelete(brand)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Eliminar
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
