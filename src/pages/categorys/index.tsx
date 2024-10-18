import { FC, useState } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCategories } from '../../hooks/category/use-categorys';
import { useCategoryMutations } from '../../hooks/category/use-categorys-mutations';
import { TitlePage } from '../home/styles';
import Table from '../../components/tables/table';
import { TableRowBody } from '../../components/tables/table/styles';
import { TableCell } from '../../components/tables/table-cell';
import { ModalContainer, ModalTitle } from '../../components/modal/styles';
import { Modal } from '../../components/modal';
import useModal from '../../hooks/use-modal';
import { TextField } from '../../components/forms/login/styles';

interface CategoryFormData {
    id?: number;
    name: string;
}

const CategoriesPage: FC = () => {
    const { categories, isLoading, error } = useCategories();
    const { addCategory, updateCategory, deleteCategory } = useCategoryMutations();
    const modalRef = useModal();

    const handleOpenModal = () => modalRef.current?.openModal()

    const handleCloseModal = () => modalRef.current?.closeModal()

    const [selectedCategory, setSelectedCategory] = useState<CategoryFormData | null>(null);

    const { register, handleSubmit, reset } = useForm<CategoryFormData>();

    const handleOpenDialog = (category: CategoryFormData | null = null) => {
        setSelectedCategory(category);
        reset(category ? { name: category.name } : { name: '' });
        handleOpenModal()
    };

    const handleCloseDialog = () => {
        handleCloseModal()
        setSelectedCategory(null);
        reset();
    };

    const onSubmit = (data: CategoryFormData) => {
        const { id, name } = data;
        if (id !== undefined) {
            updateCategory({ id, name });
        } else {
            addCategory(name);
        }

        handleCloseDialog();
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
            deleteCategory(id);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Nome' },
        { field: 'actions', headerName: '' }
    ]

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <TitlePage>Categorias</TitlePage>
                <Button variant="contained" onClick={() => handleOpenDialog(null)}>Adicionar Categoria</Button>
            </Box>

            {isLoading ? (
                <p>Carregando...</p>
            ) : error ? (
                <p>Erro ao carregar categorias</p>
            ) : (
                <Table
                    columns={columns}
                    data={categories}
                    renderData={(row: any) => (
                        <TableRowBody key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleOpenDialog(row)}>
                                    <EditIcon sx={{ width: 16, height: 16 }} />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(row.id)}>
                                    <DeleteIcon sx={{ width: 16, height: 16 }} />
                                </IconButton>
                            </TableCell>
                        </TableRowBody>
                    )}
                />
            )}
            <Modal ref={modalRef}>
                <ModalContainer>
                    <ModalTitle>{selectedCategory ? 'Editar Categoria' : 'Adicionar Categoria'}</ModalTitle>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            margin="dense"
                            label="Nome"
                            fullWidth
                            {...register('name', { required: true })}
                            variant='filled'
                        />
                        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
                            <Button onClick={handleCloseDialog} variant="outlined">Cancelar</Button>
                            <Button type="submit" variant="contained">
                                {selectedCategory ? 'Salvar Alterações' : 'Adicionar'}
                            </Button>
                        </Box>
                    </form>
                </ModalContainer>
            </Modal>
        </Box>
    );
};

export default CategoriesPage;