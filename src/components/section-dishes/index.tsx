import { FC } from 'react'
import { useAuth } from '../../hooks/use-auth'
import DisheGrid from '../dishe-grid/view'
import EditDisheGrid from '../dishe-grid/edit'
import { Dish } from '../../types/dish'

interface RecomendadosProps {
  pratos: Dish[]
  onAddToCart: (prato: Dish) => void
}

const SectionDishes: FC<RecomendadosProps> = ({ pratos, onAddToCart }) => {
  const { isAdminOrAttendant } = useAuth()
  if (isAdminOrAttendant()) return <EditDisheGrid dishes={pratos} />
  return <DisheGrid dishes={pratos} addToCart={onAddToCart} />
}

export default SectionDishes
