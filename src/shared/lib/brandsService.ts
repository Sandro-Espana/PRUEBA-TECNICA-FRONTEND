import { apiClient } from './api'
import { Brand, CreateBrandRequest, UpdateBrandRequest } from '@/shared/types/brand'

const API_ENDPOINT = '/brands'

export const brandsService = {
  async getAllBrands(): Promise<Brand[]> {
    try {
      const response = await apiClient.get(API_ENDPOINT)
      return response.data
    } catch (error: any) {
      console.error('Error fetching brands:', error)
      throw new Error('Error al obtener las marcas')
    }
  },

  async getBrandById(id: string): Promise<Brand> {
    try {
      const response = await apiClient.get(`${API_ENDPOINT}/${id}`)
      return response.data
    } catch (error: any) {
      console.error('Error fetching brand:', error)
      throw new Error('Error al obtener la marca')
    }
  },

  async createBrand(brandData: CreateBrandRequest): Promise<Brand> {
    try {
      const response = await apiClient.post(API_ENDPOINT, brandData)
      return response.data
    } catch (error: any) {
      console.error('Error creating brand:', error)
      throw new Error('Error al crear la marca')
    }
  },

  async updateBrand(id: string, brandData: UpdateBrandRequest): Promise<Brand> {
    try {
      const response = await apiClient.put(`${API_ENDPOINT}/${id}`, brandData)
      return response.data
    } catch (error: any) {
      console.error('Error updating brand:', error)
      throw new Error('Error al actualizar la marca')
    }
  },

  async deleteBrand(id: string): Promise<void> {
    try {
      await apiClient.delete(`${API_ENDPOINT}/${id}`)
    } catch (error: any) {
      console.error('Error deleting brand:', error)
      throw new Error('Error al eliminar la marca')
    }
  }
}
