import { FC, useState } from 'react'
import { Grid, Button, Typography, Box } from '@mui/material'
import { Prato } from '../../../types/dishes'
import DisheCard from './edit-dishe-card'
import { Modal, useModal } from '../../modal'
import { ConfirmBox, EditBox } from './styles'
import { TextField } from '../../forms/login/styles'
import { useDishes } from '../../../hooks/dishes/use-dishes'

interface DisheGridProps {
    dishes: Prato[]
}

const EditDisheGrid: FC<DisheGridProps> = ({ dishes }) => {
    const { updateDish, deleteDish } = useDishes();
    const editModalRef = useModal();
    const deleteModalRef = useModal();
    const [selectedDishe, setSelectedDishe] = useState<Prato | null>(null);

    const handleEditClick = (dishe: Prato) => {
        setSelectedDishe(dishe);
        editModalRef.current?.openModal();
    }

    const handleDeleteClick = (dishe: Prato) => {
        setSelectedDishe(dishe);
        deleteModalRef.current?.openModal();
    }

    const handleDeleteConfirm = () => {
        if (selectedDishe) {
            deleteDish(selectedDishe.id);
            deleteModalRef.current?.closeModal();
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (selectedDishe) {
            setSelectedDishe({
                ...selectedDishe,
                [name]: name === 'valorReais' || name === 'valorPontos' ? parseFloat(value) || 0 : value,
            });
        }
    }

    const handleSave = () => {
        if (selectedDishe) {
            updateDish(selectedDishe);
            editModalRef.current?.closeModal();
        }
    }

    return (
        <>
            <Grid container spacing={2}>
                {dishes.map((dishe) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={dishe.id}>
                        <DisheCard dishe={dishe} onEdit={() => handleEditClick(dishe)} onDelete={() => handleDeleteClick(dishe)} />
                    </Grid>
                ))}
            </Grid>
            <Modal ref={editModalRef}>
                <EditBox>
                    <Typography variant="h6" gutterBottom>
                        Editar Prato
                    </Typography>
                    <Box>
                        <TextField
                            fullWidth
                            label="Nome"
                            name="nome"
                            variant="filled"
                            value={selectedDishe?.nome || ''}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Descrição"
                            name="descricao"
                            variant="filled"
                            value={selectedDishe?.descricao || ''}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Preço"
                            name="valorReais"
                            type="number"
                            variant="filled"
                            value={selectedDishe?.valorReais || ''}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Pontos"
                            name="valorPontos"
                            type="number"
                            variant="filled"
                            value={selectedDishe?.valorPontos || ''}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button variant="outlined" onClick={() => editModalRef.current?.closeModal()} sx={{ mr: 2 }}>
                            Cancelar
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Salvar
                        </Button>
                    </Box>
                </EditBox>
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

export default EditDisheGrid;