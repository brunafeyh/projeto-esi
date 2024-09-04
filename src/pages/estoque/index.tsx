import { FC, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { PageLayout } from '../../layouts/page-layout';
import { TitlePage } from '../home/styles';
import useIngredients from '../../hooks/use-ingredients';
import Table, { Column } from '../../components/table';
import { InputAdornment, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField as MuiTextField, Typography } from '@mui/material';
import { IconSearch, TextField } from '../../components/cardapio-filter/styles';
import { TableRowBody } from '../../components/table/styles';
import { TableCell } from '../../components/table-cell';
import { ActionBox, Box, DeleteIcon, EditIcon } from './styles'; 
import { IngredientFormInputs } from '../../types/dishes';
import AddIcon from '@mui/icons-material/Add';

const Estoque: FC = () => {
    const { ingredients, searchTerm, setSearchTerm, updateIngredient, deleteIngredient, addIngredient } = useIngredients(); 
    const [editIngredient, setEditIngredient] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const [ingredientToDelete, setIngredientToDelete] = useState<string | null>(null);

    const { handleSubmit, control, reset } = useForm<IngredientFormInputs>({
        defaultValues: {
            nome: '',
            quantidade: '',
        },
    });

    const handleEditClick = (id: string, name: string, quantity: string) => {
        setEditIngredient(id);
        reset({ nome: name, quantidade: quantity });
        setIsEditing(true);
        setOpen(true);
    };

    const handleAddClick = () => {
        setEditIngredient(null); 
        reset({ nome: '', quantidade: '' });
        setIsEditing(false); 
        setOpen(true);
    };

    const onSubmit = (data: IngredientFormInputs) => {
        if (editIngredient) {
            updateIngredient({ id: editIngredient, updatedData: data });
        } else {
            addIngredient(data);
        }
        setOpen(false);
        setEditIngredient(null);
    };

    const handleDeleteClick = (id: string) => {
        setIngredientToDelete(id);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (ingredientToDelete) {
            deleteIngredient(ingredientToDelete);
        }
        setDeleteDialogOpen(false);
        setIngredientToDelete(null);
    };

    const columns: Column[] = [
        { field: 'nome', headerName: 'Nome' },
        { field: 'quantidade', headerName: 'Quantidade' },
        { field: 'edit', headerName: '' },
    ];

    return (
        <PageLayout title="Estoque">
            <TitlePage>Estoque</TitlePage>
            <Box>
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
                        disableUnderline: false,
                    }}
                />
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddClick} 
                    sx={{ ml: 2 }}
                >
                    Adicionar Ingrediente
                </Button>
            </Box>

            <Table
                columns={columns}
                data={ingredients}
                renderData={(row) => (
                    <TableRowBody key={row.id}>
                        {columns.map((column) => (
                            <TableCell key={column.field}>
                                {column.field === 'edit' ? (
                                    <ActionBox>
                                        <IconButton onClick={() => handleEditClick(row.id, row.nome, row.quantidade)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteClick(row.id)}>
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
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{isEditing ? 'Editar Ingrediente' : 'Adicionar Ingrediente'}</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="nome"
                            control={control}
                            render={({ field }) => (
                                <MuiTextField
                                    {...field}
                                    autoFocus
                                    margin="dense"
                                    label="Nome do Ingrediente"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                            )}
                        />
                        <Controller
                            name="quantidade"
                            control={control}
                            render={({ field }) => (
                                <MuiTextField
                                    {...field}
                                    margin="dense"
                                    label="Quantidade"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                            )}
                        />
                        <DialogActions>
                            <Button variant="outlined" onClick={() => setOpen(false)}>
                                Cancelar
                            </Button>
                            <Button type="submit" variant="contained" sx={{ ml: 1 }}>
                                {isEditing ? 'Salvar Alterações' : 'Adicionar Ingrediente'}
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle>Confirmar Exclusão</DialogTitle>
                <DialogContent>
                    <Typography>Tem certeza que deseja excluir este ingrediente?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} variant="outlined">
                        Cancelar
                    </Button>
                    <Button onClick={confirmDelete} variant="contained" color="error">
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
        </PageLayout>
    );
};

export default Estoque;
