import { FC } from 'react'
import { useFilteredDishes } from '../../hooks/dishes/use-filtered-dishes'
import { useAuth } from '../../hooks/use-auth'
import DisheGrid from '../../components/dishe-grid/view'
import { Button, Box } from '@mui/material'
import DishForm from '../../components/forms/dishe'
import EditDisheGrid from '../../components/dishe-grid/edit'
import { useCart } from '../../hooks/cart/use-cart'
import { Modal, useModal } from '../../components/modal'
import { ModalContainer, ModalTitle } from '../../components/modal/styles'
import MenuFilter from '../menu-filter'
import Loading from '../loading'

const DishesMenu: FC = () => {
    const { searchTerm, sort, selectedCategory, setSearchTerm, setSort, setSelectedCategory, filteredDishes, isLoading } = useFilteredDishes()
    const { isAdminOrAttendant } = useAuth()
    const { addToCart } = useCart()
    const modal = useModal()
    const handleOpenModal = () => modal.current?.openModal()
    const handleCloseModal = () => modal.current?.closeModal()
    if(isLoading ) return <Loading/>

    return (
        <Box>
            <MenuFilter
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
                    <ModalTitle>Adicionar Novo Prato</ModalTitle>
                    <DishForm onClose={handleCloseModal} />
                </ModalContainer>
            </Modal>
        </Box>
    )
}

export default DishesMenu
