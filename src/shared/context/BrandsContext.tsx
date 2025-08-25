"use client"

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react"
import { Brand, CreateBrandRequest, UpdateBrandRequest } from "@/shared/types/brand"
import { brandsService } from "@/shared/lib/brandsService"

interface BrandsContextType {
  brands: Brand[]
  loading: boolean
  error: string | null
  addBrand: (newBrand: CreateBrandRequest) => Promise<void>
  updateBrand: (id: string, updatedBrand: UpdateBrandRequest) => Promise<void>
  deleteBrand: (id: string) => Promise<void>
  getBrandById: (id: string) => Promise<Brand>
  refreshBrands: () => Promise<void>
}

const BrandsContext = createContext<BrandsContextType | undefined>(undefined)

export function BrandsProvider({ children }: { children: ReactNode }) {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Cargar marcas al inicializar
  useEffect(() => {
    refreshBrands()
  }, [])

  const refreshBrands = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const fetchedBrands = await brandsService.getAllBrands()
      setBrands(fetchedBrands)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar las marcas')
      console.error('Error loading brands:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const addBrand = useCallback(async (newBrand: CreateBrandRequest) => {
    setLoading(true)
    setError(null)
    try {
      const createdBrand = await brandsService.createBrand(newBrand)
      setBrands(prevBrands => [...prevBrands, createdBrand])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la marca')
      throw err // Re-lanzar para que el componente pueda manejarlo
    } finally {
      setLoading(false)
    }
  }, [])

  const updateBrand = useCallback(async (id: string, updatedBrand: UpdateBrandRequest) => {
    setLoading(true)
    setError(null)
    try {
      const updated = await brandsService.updateBrand(id, updatedBrand)
      setBrands(prevBrands => 
        prevBrands.map(brand => 
          brand.id === id ? updated : brand
        )
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar la marca')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteBrand = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await brandsService.deleteBrand(id)
      setBrands(prevBrands => prevBrands.filter(brand => brand.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar la marca')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const getBrandById = useCallback(async (id: string) => {
    try {
      const brand = await brandsService.getBrandById(id)
      return brand
    } catch (err) {
      throw err
    }
  }, [])

  const value: BrandsContextType = {
    brands,
    loading,
    error,
    addBrand,
    updateBrand,
    deleteBrand,
    getBrandById,
    refreshBrands
  }

  return (
    <BrandsContext.Provider value={value}>
      {children}
    </BrandsContext.Provider>
  )
}

export function useBrands() {
  const context = useContext(BrandsContext)
  if (context === undefined) {
    throw new Error("useBrands must be used within a BrandsProvider")
  }
  return context
}
