import { FC, useState } from 'react'
import { Button, Grid, Typography } from '@mui/material'
import { Dishe } from '../../../types/dishes'
import DisheCard from './card'
import { Modal, useModal } from '../../modal'
import { ConfirmBox, EditBox } from './styles'
import DishForm from '../../forms/dishe'
import { useDishes } from '../../../hooks/dishes/use-dishes'
import { ModalContainer, ModalTitle } from '../../modal/styles'

interface DisheGridProps {
    dishes: Dishe[]
}

const EditDisheGrid: FC<DisheGridProps> = ({ dishes }) => {
    const editModalRef = useModal()
    const deleteModalRef = useModal()
    const { deleteDish } = useDishes()
    const [selectedDish, setSelectedDish] = useState<Dishe | null>(null)

    const handleEditClick = (dish: Dishe) => {
        setSelectedDish(dish)
        editModalRef.current?.openModal()
    }

    const handleDeleteClick = (dish: Dishe) => {
        setSelectedDish(dish)
        deleteModalRef.current?.openModal()
    }

    const handleDeleteConfirm = () => {
        if (selectedDish) deleteDish(selectedDish.id)
        deleteModalRef.current?.closeModal();
    }

    return (
        <>
            <Grid container spacing={2}>
                {dishes.map((dish) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={dish.id}>
                        <DisheCard dishe={dish} onEdit={() => handleEditClick(dish)} onDelete={() => handleDeleteClick(dish)} />
                    </Grid>
                ))}
            </Grid>
            <Modal ref={editModalRef}>
                <ModalContainer>
                        <ModalTitle>Editar Prato</ModalTitle>
                        <DishForm dish={selectedDish || undefined} onClose={() => editModalRef.current?.closeModal()} />
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
                        <Button variant="outlined" onClick={() => deleteModalRef.current?.closeModal()}>
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