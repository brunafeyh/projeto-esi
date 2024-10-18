import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import CategoryService, { Category } from '../../services/category'

const categoryService = new CategoryService()

const fetchCategoryById = async (id: number): Promise<Category> => {
  try {
    return categoryService.getCategoryById(id)
  } catch (error) {
    toast.error('Erro ao carregar a categoria')
    throw error
  }
}

const useCategoryById = (id: number) => {
  return useQuery<Category, Error>({
    queryKey: ['category', id],
    queryFn: () => fetchCategoryById(id),
  })
}

export default useCategoryById
