import { api } from '../../../shared/api/api'
import type { Product, ProductsResponse } from '../model/types'

export async function getProducts() {
  const response = await api.get<ProductsResponse>('/products?limit=0')
  return response.data.products
}

export async function getProductById(id: number) {
  const response = await api.get<Product>(`/products/${id}`)
  return response.data
}

export async function getCategories() {
  const response = await api.get<string[]>('/products/category-list')
  return response.data
}
