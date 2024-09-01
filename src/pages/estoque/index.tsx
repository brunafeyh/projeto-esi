import { FC, useState } from 'react';
import { PageLayout } from '../../layouts/page-layout';
import { TitlePage } from '../home/styles';
import useIngredients from '../../hooks/use-ingredients';
import Table, { Column } from '../../components/table';
import { InputAdornment, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField as MuiTextField } from '@mui/material';
import { IconSearch, TextField } from '../../components/cardapio-filter/styles';
import { TableRowBody } from '../../components/table/styles';
import { TableCell } from '../../components/table-cell';
import { ActionBox, Box, DeleteIcon, EditIcon } from './styles';

const Estoque: FC = () => {
    const { ingredients, searchTerm, setSearchTerm, updateIngredient, deleteIngredient } = useIngredients();
    const [editIngredient, setEditIngredient] = useState<string | null>(null);
    const [newQuantity, setNewQuantity] = useState<string>('');
    const [ingredientName, setIngredientName] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);

    const handleEditClick = (id: string, name: string, quantity: string) => {
        setEditIngredient(id);
        setIngredientName(name);
        setNewQuantity(quantity); 
        setOpen(true);
    };

    const handleSaveClick = () => {
        if (editIngredient) {
            updateIngredient({ id: editIngredient, updatedData: { nome: ingredientName, quantidade: newQuantity } });
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
        { field: 'edit', headerName: 'Editar' },
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
                    <MuiTextField
                        autoFocus
                        margin="dense"
                        label="Nome do Ingrediente"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={ingredientName}
                        onChange={(e) => setIngredientName(e.target.value)}
                    />
                    <MuiTextField
                        margin="dense"
                        label="Quantidade"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newQuantity}
                        onChange={(e) => setNewQuantity(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => setOpen(false)}>
                        Cancelar
                    </Button>
                    <Button variant="contained" sx={{ ml: 1 }} onClick={handleSaveClick}>
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </PageLayout>
    );
};

export default Estoque;
