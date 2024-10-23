import { FC, useState } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCategories } from '../../../hooks/category/use-categorys';
import { useCategoryMutations } from '../../../hooks/category/use-categorys-mutations';
import { TitlePage } from '../../../pages/home/styles';
import Table from '../../tables/table';
import { TableRowBody } from '../../tables/table/styles';
import { TableCell } from '../../tables/table-cell';
import { ModalContainer, ModalText, ModalTitle } from '../../modal/styles';
import { Modal } from '../../modal';
import useModal from '../../../hooks/use-modal';
import CategoryForm from '../../forms/category';
import Loading from '../../loading';

interface CategoryFormData {
    id?: number
    name: string
}

const CategoriesPage: FC = () => {
    const { categories, error, isLoading } = useCategories()
    const { addCategory, updateCategory, deleteCategory } = useCategoryMutations()
    const modalRef = useModal()
    const deleteModalRef = useModal()

    const [selectedCategory, setSelectedCategory] = useState<CategoryFormData | null>(null)
    const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null)

    const handleOpenModal = (category: CategoryFormData | null = null) => {
        setSelectedCategory(category)
        modalRef.current?.openModal()
    }

    const handleCloseModal = () => {
        modalRef.current?.closeModal()
        setSelectedCategory(null)
    };

    const onSubmit = (data: CategoryFormData) => {
        if (data.id) updateCategory({ id: data.id, name: data.name })
        else addCategory(data.name)
        handleCloseModal()
    };

    const handleOpenDeleteModal = (id: number) => {
        setCategoryToDelete(id);
        deleteModalRef.current?.openModal();
    };

    const handleConfirmDelete = () => {
        if (categoryToDelete !== null) {
            deleteCategory(categoryToDelete);
            deleteModalRef.current?.closeModal();
        }
    }

    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Nome' },
        { field: 'actions', headerName: '' }
    ]
    if (isLoading) return <Loading />

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <TitlePage>Categorias</TitlePage>
                <Button variant="contained" onClick={() => handleOpenModal(null)}>Adicionar Categoria</Button>
            </Box>

            {error ? (
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
                                <IconButton onClick={() => handleOpenModal(row)}>
                                    <EditIcon sx={{ width: 16, height: 16 }} />
                                </IconButton>
                                <IconButton onClick={() => handleOpenDeleteModal(row.id)}>
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
                    <CategoryForm
                        defaultValues={selectedCategory}
                        onSubmit={onSubmit}
                        onClose={handleCloseModal}
                        isEditMode={!!selectedCategory}
                    />
                </ModalContainer>
            </Modal>

            <Modal ref={deleteModalRef}>
                <ModalContainer>
                    <ModalTitle>Confirmar Exclusão</ModalTitle>
                    <ModalText>Tem certeza que deseja excluir esta categoria?</ModalText>
                    <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
                        <Button onClick={() => deleteModalRef.current?.closeModal()} variant="outlined">Cancelar</Button>
                        <Button onClick={handleConfirmDelete} variant="contained" color="error">
                            Excluir
                        </Button>
                    </Box>
                </ModalContainer>
            </Modal>
        </Box>
    );
};

export default CategoriesPage;
