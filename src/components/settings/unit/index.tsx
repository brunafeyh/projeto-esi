import { FC, useState } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useUnits } from '../../../hooks/unit/use-units';
import Table from '../../tables/table';
import { TableRowBody } from '../../tables/table/styles';
import { TableCell } from '../../tables/table-cell';
import { ModalContainer, ModalText, ModalTitle } from '../../modal/styles';
import { Modal } from '../../modal';
import useModal from '../../../hooks/use-modal';
import { TextField } from '../../forms/login/styles';
import { useUnitMutations } from '../../../hooks/unit/use-units-mutations';
import { TitlePage } from '../../../pages/home/styles';

interface UnitFormData {
    id?: number;
    name: string;
    acronym: string;
}

export const UnitsSection: FC = () => {
    const { units, error } = useUnits();
    const { addUnit, updateUnit, deleteUnit } = useUnitMutations();
    const modalRef = useModal();
    const deleteModalRef = useModal(); 

    const { register, handleSubmit, reset } = useForm<UnitFormData>();

    const [selectedUnit, setSelectedUnit] = useState<UnitFormData | null>(null);
    const [unitToDelete, setUnitToDelete] = useState<number | null>(null);

    const handleOpenDialog = (unit: UnitFormData | null = null) => {
        setSelectedUnit(unit);
        reset(unit ? { id: unit.id, name: unit.name, acronym: unit.acronym } : { name: '', acronym: '' });
        modalRef.current?.openModal();
    };

    const handleCloseDialog = () => {
        modalRef.current?.closeModal();
        setSelectedUnit(null);
        reset();
    };

    const onSubmit = (data: UnitFormData) => {
        const { id, name, acronym } = data;
        if (id !== undefined) {
            updateUnit({ id, name, acronym });
        } else {
            addUnit({ name, acronym });
        }
        handleCloseDialog();
    };

    const handleOpenDeleteModal = (id: number) => {
        setUnitToDelete(id);
        deleteModalRef.current?.openModal();
    };

    const handleConfirmDelete = () => {
        if (unitToDelete !== null) {
            deleteUnit(unitToDelete);
            deleteModalRef.current?.closeModal();
        }
    };

    const handleDelete = (id: number) => {
        handleOpenDeleteModal(id);
    };

    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Nome' },
        { field: 'acronym', headerName: 'Sigla' },
        { field: 'actions', headerName: '' }
    ];

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <TitlePage>Unidades de Medida</TitlePage>
                <Button variant="contained" onClick={() => handleOpenDialog(null)}>Adicionar Unidade</Button>
            </Box>
            {error ? (
                <p>Erro ao carregar unidades</p>
            ) : (
                <Table
                    columns={columns}
                    data={units}
                    renderData={(row: any) => (
                        <TableRowBody key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.acronym}</TableCell>
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
                    <ModalTitle>{selectedUnit ? 'Editar Unidade de Medida' : 'Adicionar Unidade de Medida'}</ModalTitle>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            margin="dense"
                            label="Nome"
                            fullWidth
                            {...register('name', { required: true })}
                            variant="filled"
                        />
                        <TextField
                            margin="dense"
                            label="Sigla"
                            fullWidth
                            {...register('acronym', { required: true })}
                            variant="filled"
                        />
                        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
                            <Button onClick={handleCloseDialog} variant="outlined">Cancelar</Button>
                            <Button type="submit" variant="contained">
                                {selectedUnit ? 'Salvar Alterações' : 'Adicionar'}
                            </Button>
                        </Box>
                    </form>
                </ModalContainer>
            </Modal>
            <Modal ref={deleteModalRef}>
                <ModalContainer>
                    <ModalTitle>Confirmar Exclusão</ModalTitle>
                    <ModalText>Tem certeza que deseja excluir esta unidade de medida?</ModalText>
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
