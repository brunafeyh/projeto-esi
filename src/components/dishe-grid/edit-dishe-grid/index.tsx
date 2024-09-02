import { FC, useState } from 'react';
import { Grid, Button, Typography, Box } from '@mui/material';
import { Prato } from '../../../types/dishes';
import { useDishes } from '../../../hooks/use-dishes';
import DisheCard from './edit-dishe-card';
import { Modal, useModal } from '../../modal';
import { ConfirmBox, EditBox } from './styles';
import { TextField } from '../../forms/login/styles';

interface DisheGridProps {
    dishes: Prato[];
}

const EditDisheGrid: FC<DisheGridProps> = ({ dishes }) => {
    const { updateDish, deleteDish } = useDishes();
    const editModalRef = useModal();
    const deleteModalRef = useModal();
    const [selectedDishe, setSelectedDishe] = useState<Prato | null>(null);
    const [formState, setFormState] = useState<Prato | null>(null);

    const handleEditClick = (dishe: Prato) => {
        setSelectedDishe(dishe);
        setFormState(dishe);
        editModalRef.current?.openModal();
    };

    const handleDeleteClick = (dishe: Prato) => {
        setSelectedDishe(dishe);
        deleteModalRef.current?.openModal();
    };

    const handleDeleteConfirm = () => {
        if (selectedDishe) {
            deleteDish(selectedDishe.id);
            deleteModalRef.current?.closeModal();
        }
    };
    const handleCancel = () => {
        deleteModalRef.current?.closeModal();
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (formState) {
            setFormState({
                ...formState,
                [event.target.name]: event.target.value,
            });
        }
    };

    const handleSave = () => {
        if (formState) {
            updateDish(formState);
            editModalRef.current?.closeModal();
        }
    };

    return (
        <>
            <Grid container spacing={2}>
                {dishes.map((dishe) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={dishe.id}>
                        <DisheCard
                            dishe={dishe}
                            onEdit={handleEditClick}
                            onDelete={() => handleDeleteClick(dishe)}
                        />
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
                            name="name"
                            variant='filled'
                            value={formState?.nome || ''}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Descrição"
                            name="description"
                            variant='filled'
                            value={formState?.descricao || ''}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Preço"
                            name="price"
                            type="number"
                            variant='filled'
                            value={formState?.valorReais || ''}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Pontos"
                            name="pontos"
                            type="number"
                            variant='filled'
                            value={formState?.valorPontos || ''}
                            onChange={handleChange}
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


            <Modal ref={deleteModalRef} >
                <EditBox>
                    <Typography variant="h3" gutterBottom>
                        Confirmação de Deleção
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Você tem certeza que quer apagar esse Prato?
                    </Typography>
                    <ConfirmBox>
                        <Button variant="outlined" onClick={handleCancel}>
                            Cancelar
                        </Button>
                        <Button variant="contained" color="error" onClick={handleDeleteConfirm}>
                            Deletar
                        </Button>
                    </ConfirmBox>
                </EditBox>
            </Modal>
        </>
    );
};

export default EditDisheGrid;
