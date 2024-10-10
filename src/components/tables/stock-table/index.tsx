import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import useIngredients from '../../../hooks/ingredients/use-ingredients';
import Table, { Column } from '../table';
import {
    InputAdornment,
    IconButton,
    Button,
    Typography,
    Stack,
    Box,
} from '@mui/material'
import { IconSearch, TextField } from '../../cardapio-filter/styles'
import { TableRowBody } from '../table/styles'
import { TableCell } from '../table-cell'
import { IngredientFormInputs } from '../../../types/dishes'
import AddIcon from '@mui/icons-material/Add'
import { ActionBox, DeleteIcon, EditIcon } from '../../../pages/estoque/styles'
import useFilteredIngredients from '../../../hooks/ingredients/use-filtered-ingredients'
import { TextField as TextFieldInput } from '../../forms/login/styles'
import { Modal, useModal } from '../../modal'
import { ModalContainer, ModalTitle } from '../../modal/styles'

export const columns: Column[] = [
    { field: 'nome', headerName: 'Nome' },
    { field: 'quantidade', headerName: 'Quantidade' },
    { field: 'edit', headerName: '' },
];

const StockTable: FC = () => {
    const { ingredients, addIngredient, updateIngredient, deleteIngredient } = useIngredients();
    const { filteredIngredients, searchTerm, setSearchTerm } = useFilteredIngredients(ingredients);
    const [editIngredient, setEditIngredient] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [ingredientToDelete, setIngredientToDelete] = useState<string | null>(null);
    const { handleSubmit, register, reset } = useForm<IngredientFormInputs>({ defaultValues: { nome: '', quantidade: '' } });
    const editModal = useModal()
    const deleteModal = useModal()

    const handleOpenEditAddModal = (id?: string, name?: string, quantity?: string) => {
        setEditIngredient(id || null);
        reset({ nome: name || '', quantidade: quantity || '' });
        setIsEditing(!!id);
        editModal.current?.openModal()
    };

    const handleFormSubmit = (data: IngredientFormInputs) => {
        if (editIngredient) updateIngredient({ id: editIngredient, updatedData: data })
        else addIngredient(data)
        closeEditModal()
    };

    const handleOpenDeleteModal = (id: any) => {
        setIngredientToDelete(id)
        deleteModal.current?.openModal()
    }

    const closeEditModal = () => {
        editModal.current?.closeModal()
        setEditIngredient(null)
    };

    const closeDeleteModal = () => {
        deleteModal.current?.closeModal()
        setIngredientToDelete(null)
    };

    const handleDeleteConfirm = () => {
        if (ingredientToDelete) deleteIngredient(ingredientToDelete)
        closeDeleteModal()
    }

    return (
        <Stack>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <TextField
                    label="Pesquisar"
                    variant="standard"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconSearch />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ marginRight: 2 }}
                />
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenEditAddModal()}
                    sx={{ ml: 'auto' }}
                >
                    Adicionar Ingrediente
                </Button>
            </Box>

            <Table
                columns={columns}
                data={filteredIngredients}
                renderData={(row) => (
                    <TableRowBody key={row.id}>
                        {columns.map((column) => (
                            <TableCell key={column.field}>
                                {column.field === 'edit' ? (
                                    <ActionBox>
                                        <IconButton onClick={() => handleOpenEditAddModal(row.id, row.nome, row.quantidade)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleOpenDeleteModal(row.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ActionBox>
                                ) : (
                                    row[column.field]
                                )}
                            </TableCell>
                        ))}
                    </TableRowBody>
                )}
            />

            <Modal ref={editModal}>
                <ModalContainer>
                    <ModalTitle>{isEditing ? 'Editar Ingrediente' : 'Adicionar Ingrediente'}</ModalTitle>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <TextFieldInput
                            {...register('nome', { required: true })}
                            autoFocus
                            margin="dense"
                            label="Nome do Ingrediente"
                            fullWidth
                            variant="filled"
                        />
                        <TextFieldInput
                            {...register('quantidade', { required: true })}
                            margin="dense"
                            label="Quantidade"
                            fullWidth
                            variant="filled"
                        />
                        <Stack marginTop={2} justifyContent={'flex-end'} gap={1} direction={'row'}>
                            <Button onClick={closeEditModal} variant="outlined">
                                Cancelar
                            </Button>
                            <Button type="submit" variant="contained" sx={{ ml: 1 }}>
                                {isEditing ? 'Salvar Alterações' : 'Adicionar Ingrediente'}
                            </Button>
                        </Stack>
                    </form>
                </ModalContainer>
            </Modal>

            <Modal ref={deleteModal}>
                <ModalContainer>
                    <ModalTitle>Confirmar Exclusão</ModalTitle>
                    <Typography>Tem certeza que deseja excluir este ingrediente?</Typography>
                    <Stack marginTop={2} justifyContent={'flex-end'} gap={1} direction={'row'}>
                        <Button onClick={() => closeDeleteModal()} variant="outlined">
                            Cancelar
                        </Button>
                        <Button onClick={handleDeleteConfirm} variant="contained" color="error">
                            Excluir
                        </Button>
                    </Stack>
                </ModalContainer>
            </Modal>
        </Stack>
    );
};

export default StockTable