"use client"

import BrandsPanel from "@/components/brands/BrandsPanel"
import { BrandsProvider, useBrands } from "@/shared/context/BrandsContext"

function BrandsPanelWrapper() {
  const { brands, deleteBrand } = useBrands()
  return <BrandsPanel brands={brands} onDelete={deleteBrand} isLoading={false} />
}

export default function BrandsPage() {
  return (
    <BrandsProvider>
      <BrandsPanelWrapper />
    </BrandsProvider>
  )
}
