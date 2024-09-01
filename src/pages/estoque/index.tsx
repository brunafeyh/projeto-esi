import { FC, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { PageLayout } from '../../layouts/page-layout';
import { TitlePage } from '../home/styles';
import useIngredients from '../../hooks/use-ingredients';
import Table, { Column } from '../../components/table';
import { InputAdornment, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField as MuiTextField } from '@mui/material';
import { IconSearch, TextField } from '../../components/cardapio-filter/styles';
import { TableRowBody } from '../../components/table/styles';
import { TableCell } from '../../components/table-cell';
import { ActionBox, Box, DeleteIcon, EditIcon } from './styles';
import { IngredientFormInputs } from '../../types/dishes';

const Estoque: FC = () => {
    const { ingredients, searchTerm, setSearchTerm, updateIngredient, deleteIngredient } = useIngredients();
    const [editIngredient, setEditIngredient] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    const { handleSubmit, control, reset } = useForm<IngredientFormInputs>({
        defaultValues: {
            nome: '',
            quantidade: '',
        },
    });

    const handleEditClick = (id: string, name: string, quantity: string) => {
        setEditIngredient(id);
        reset({ nome: name, quantidade: quantity });
        setOpen(true);
    };

    const onSubmit = (data: IngredientFormInputs) => {
        if (editIngredient) {
            updateIngredient({ id: editIngredient, updatedData: data });
            setOpen(false);
            setEditIngredient(null);
        }
    };

    const handleDeleteClick = (id: string) => {
        deleteIngredient(id);
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
                <DialogTitle>Editar Ingrediente</DialogTitle>
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
                                Salvar
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </PageLayout>
    );
};

export default Estoque;
