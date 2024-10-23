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
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import { IconSearch, TextField } from '../../menu-filter/styles';
import { TableRowBody } from '../table/styles';
import { TableCell } from '../table-cell';
import AddIcon from '@mui/icons-material/Add';
import { ActionBox, DeleteIcon, EditIcon } from '../../../pages/stock/styles';
import useFilteredIngredients from '../../../hooks/ingredients/use-filtered-ingredients';
import { TextField as TextFieldInput } from '../../forms/login/styles';
import { Modal, useModal } from '../../modal';
import { ModalContainer, ModalTitle } from '../../modal/styles';
import { IngredientFormInputs } from '../../../types/dishes';
import { closeModal, openModal } from '../../../utils/modal';
import Loading from '../../loading';
import { useUnits } from '../../../hooks/unit/use-units';
import { useUnitsByIdFromList } from '../../../hooks/unit/use-units-by-id';

export const columns: Column[] = [
    { field: 'name', headerName: 'Nome' },
    { field: 'totalQuantityAvailable', headerName: 'Quantidade' },
    { field: 'measurementUnit', headerName: 'Unidade de Medida' },
    { field: 'edit', headerName: '' },
];

const StockTable: FC = () => {
    const { ingredients, addIngredient, updateIngredient, deleteIngredient, isLoading } = useIngredients();
    const { filteredIngredients, searchTerm, setSearchTerm } = useFilteredIngredients(ingredients);
    const { units, isLoading: isUnitsLoading } = useUnits();
    const [editIngredient, setEditIngredient] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [ingredientToDelete, setIngredientToDelete] = useState<string | null>(null);
    const { handleSubmit, register, reset, setValue } = useForm<IngredientFormInputs>({ defaultValues: { name: '', totalQuantityAvailable: 0, measurementUnitId: 0 } });
    const editModal = useModal();
    const deleteModal = useModal();

    const handleOpenEditAddModal = (id?: number, data?: IngredientFormInputs) => {
        setEditIngredient(id || null);
        reset({
            name: data?.name || '',
            totalQuantityAvailable: data?.totalQuantityAvailable || 0,
            measurementUnitId: data?.measurementUnitId || 0
        });
        setIsEditing(!!id);
        editModal.current?.openModal();
    };

    const handleFormSubmit = (data: IngredientFormInputs) => {
        if (editIngredient) updateIngredient({ id: editIngredient, updatedData: data });
        else addIngredient(data);
        closeEditModal();
    };

    const handleOpenDeleteModal = (id: any) => {
        setIngredientToDelete(id);
        openModal(deleteModal)();
    };

    const closeEditModal = () => {
        closeModal(editModal)();
        setEditIngredient(null);
    };

    const closeDeleteModal = () => {
        closeModal(deleteModal)();
        setIngredientToDelete(null);
    };

    const handleDeleteConfirm = () => {
        if (ingredientToDelete) deleteIngredient(Number(ingredientToDelete));
        closeDeleteModal();
    };

    if (isLoading || isUnitsLoading) return <Loading />

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
                renderData={(row) => {
                    const { unit, isLoading: isUnitLoading } = useUnitsByIdFromList(row.measurementUnitId);
                    return (
                        <TableRowBody key={row.id}>
                            {columns.map((column) => (
                                <TableCell key={column.field}>
                                    {column.field === 'edit' ? (
                                        <ActionBox>
                                            <IconButton
                                                onClick={() => handleOpenEditAddModal(row.id, {
                                                    name: row.name,
                                                    totalQuantityAvailable: row.totalQuantityAvailable,
                                                    measurementUnitId: row.measurementUnitId
                                                })}
                                            >
                                                <EditIcon />
                                            </IconButton>

                                            <IconButton onClick={() => handleOpenDeleteModal(row.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </ActionBox>
                                    ) : column.field === 'measurementUnit' ? (
                                        isUnitLoading ? 'Carregando...' : unit ? `${unit.name} (${unit.acronym})` : 'N/A'
                                    ) : (
                                        row[column.field]
                                    )}
                                </TableCell>
                            ))}
                        </TableRowBody>
                    );
                }}
            />

            <Modal ref={editModal}>
                <ModalContainer>
                    <ModalTitle>{isEditing ? 'Editar Ingrediente' : 'Adicionar Ingrediente'}</ModalTitle>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <TextFieldInput
                            {...register('name', { required: true })}
                            autoFocus
                            margin="dense"
                            label="Nome do Ingrediente"
                            fullWidth
                            variant="filled"
                        />
                        <TextFieldInput
                            {...register('totalQuantityAvailable', { required: true })}
                            margin="dense"
                            label="Quantidade"
                            type="number"
                            fullWidth
                            variant="filled"
                        />
                        <FormControl fullWidth margin="dense" variant="filled">
                            <InputLabel id="measurement-unit-label">Unidade de Medida</InputLabel>
                            <Select
                                labelId="measurement-unit-label"
                                {...register('measurementUnitId', { required: true })}
                                defaultValue=""
                                onChange={(e) => setValue('measurementUnitId', Number(e.target.value))}
                            >
                                {units.map((unit) => (
                                    <MenuItem key={unit.id} value={unit.id}>
                                        {unit.name} ({unit.acronym})
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
    )
}

export default StockTable