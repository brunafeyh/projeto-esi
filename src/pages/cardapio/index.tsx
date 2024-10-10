import { FC } from 'react'
import { PageLayout } from '../../layouts/page-layout'
import { TitlePage } from '../home/styles'
import { useFilteredDishes } from '../../hooks/dishes/use-filtered-dishes'
import CardapioFilter from '../../components/cardapio-filter'
import { useAuth } from '../../hooks/use-auth'
import DisheGrid from '../../components/dishe-grid/view'
import { Button } from '@mui/material'
import DishForm from '../../components/forms/dishe'
import EditDisheGrid from '../../components/dishe-grid/edit'
import { useCart } from '../../hooks/cart/use-cart'
import { Modal, useModal } from '../../components/modal'
import { TitleModal } from './styles'
import { ModalContainer } from '../../components/modal/styles'

const Cardapio: FC = () => {
  const { searchTerm, sort, selectedCategory, setSearchTerm, setSort, setSelectedCategory, filteredDishes } = useFilteredDishes()
  const { isAdminOrAttendant } = useAuth()
  const { addToCart } = useCart()
  const modal = useModal()

  const handleOpenModal = () => modal.current?.openModal()
  const handleCloseModal = () => modal.current?.closeModal()

  return (
    <PageLayout title="Cardápio">
      <TitlePage>Cardápio</TitlePage>
      <CardapioFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortOrder={sort}
        setSortOrder={setSort}
      />
      {isAdminOrAttendant() ? (
        <>
          <Button variant="contained" onClick={handleOpenModal} sx={{ mb: 2 }}>
            Adicionar Novo Prato
          </Button>
          <EditDisheGrid dishes={filteredDishes} />
        </>
      ) : (
        <DisheGrid dishes={filteredDishes} addToCart={addToCart} />
      )}

      <Modal ref={modal}>
        <ModalContainer>
          <TitleModal>Adicionar Novo Prato</TitleModal>
          <DishForm onClose={handleCloseModal} />
        </ModalContainer>
      </Modal>
    </PageLayout>
  )
}

export default Cardapio