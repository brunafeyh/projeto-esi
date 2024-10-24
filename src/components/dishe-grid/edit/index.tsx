import { FC, useState } from 'react'
import { Button, Grid, Typography } from '@mui/material'
import DisheCard from './card'
import { Modal, useModal } from '../../modal'
import { ConfirmBox, EditBox } from './styles'
import DishForm from '../../forms/dishe'
import { useDishes } from '../../../hooks/dishes/use-dishes'
import { ModalContainer, ModalTitle } from '../../modal/styles'
import { closeModal, openModal } from '../../../utils/modal'
import { Dish } from '../../../types/dish'
import { transformDishToDishe } from '../../../utils/dishe'

interface DisheGridProps {
    dishes: Dish[]
}

const EditDisheGrid: FC<DisheGridProps> = ({ dishes }) => {
    const editModalRef = useModal()
    const deleteModalRef = useModal()
    const { deleteDish } = useDishes()
    const [selectedDish, setSelectedDish] = useState<Dish | undefined>(undefined)
    const dish = transformDishToDishe(selectedDish)

    const handleEditClick = (dish: Dish) => {
        setSelectedDish(dish)
        openModal(editModalRef)()
    }

    const handleDeleteClick = (dish: Dish) => {
        setSelectedDish(dish)
        openModal(deleteModalRef)()
    }

    const handleDeleteConfirm = () => {
        if (selectedDish) deleteDish(String(selectedDish.id))
        closeModal(deleteModalRef)()
    }

    return (
        <>
            <Grid container spacing={2}>
                {dishes.map((dish) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={dish.id}>
                        <DisheCard dish={dish} onEdit={() => handleEditClick(dish)} onDelete={() => handleDeleteClick(dish)} />
                    </Grid>
                ))}
            </Grid>
            
            <Modal ref={editModalRef}>
                <ModalContainer>
                    <ModalTitle>Editar Prato</ModalTitle>
                    <DishForm dish={dish} onClose={closeModal(editModalRef)} />
                </ModalContainer>
            </Modal>

            <Modal ref={deleteModalRef}>
                <EditBox>
                    <Typography variant="h6" gutterBottom>
                        Confirmação de Deleção
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Você tem certeza que quer apagar este prato?
                    </Typography>
                    <ConfirmBox>
                        <Button variant="outlined" onClick={closeModal(deleteModalRef)}>
                            Cancelar
                        </Button>
                        <Button variant="contained" color="error" onClick={handleDeleteConfirm}>
                            Deletar
                        </Button>
                    </ConfirmBox>
                </EditBox>
            </Modal>
        </>
    )
}

export default EditDisheGrid