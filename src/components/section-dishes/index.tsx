import { FC } from 'react'
import { Prato } from '../../types/dishes'
import { useAuth } from '../../hooks/use-auth'
import DisheGrid from '../dishe-grid/view'
import EditDisheGrid from '../dishe-grid/edit'

interface RecomendadosProps {
  pratos: Prato[]
  onAddToCart: (prato: Prato) => void
}

const SectionDishes: FC<RecomendadosProps> = ({ pratos, onAddToCart }) => {
  const { isAdminOrAttendant } = useAuth()
  if (isAdminOrAttendant()) return <EditDisheGrid dishes={pratos} />
  return <DisheGrid dishes={pratos} addToCart={onAddToCart} />
}

export default SectionDishes
