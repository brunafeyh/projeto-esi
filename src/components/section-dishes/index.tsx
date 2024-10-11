import { FC } from 'react'
import { Dishe } from '../../types/dishes'
import { useAuth } from '../../hooks/use-auth'
import DisheGrid from '../dishe-grid/view'
import EditDisheGrid from '../dishe-grid/edit'

interface RecomendadosProps {
  pratos: Dishe[]
  onAddToCart: (prato: Dishe) => void
}

const SectionDishes: FC<RecomendadosProps> = ({ pratos, onAddToCart }) => {
  const { isAdminOrAttendant } = useAuth()
  if (isAdminOrAttendant()) return <EditDisheGrid dishes={pratos} />
  return <DisheGrid dishes={pratos} addToCart={onAddToCart} />
}

export default SectionDishes
