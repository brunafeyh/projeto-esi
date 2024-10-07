import { FC, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import useIngredients from '../../hooks/ingredients/use-ingredients'
import Table, { Column } from '../../components/table'
import {
    InputAdornment,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField as MuiTextField,
    Typography,
    Stack,
    Box,
} from '@mui/material'
import { IconSearch, TextField } from '../../components/cardapio-filter/styles'
import { TableRowBody } from '../../components/table/styles'
import { TableCell } from '../../components/table-cell'
import { IngredientFormInputs } from '../../types/dishes'
import AddIcon from '@mui/icons-material/Add'
import { ActionBox, DeleteIcon, EditIcon } from '../../pages/estoque/styles'
import useFilteredIngredients from '../../hooks/ingredients/use-filtered-ingredients'

export const columns: Column[] = [
    { field: 'nome', headerName: 'Nome' },
    { field: 'quantidade', headerName: 'Quantidade' },
    { field: 'edit', headerName: '' },
]

const StockTable: FC = () => {
    const { ingredients, addIngredient, updateIngredient, deleteIngredient } = useIngredients()
    const { filteredIngredients, searchTerm, setSearchTerm } = useFilteredIngredients(ingredients)
    const [editIngredient, setEditIngredient] = useState<string | null>(null)
    const [isDialogOpen, setDialogOpen] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [ingredientToDelete, setIngredientToDelete] = useState<string | null>(null)
    const { handleSubmit, control, reset } = useForm<IngredientFormInputs>({ defaultValues: { nome: '', quantidade: '' } })

    const openEditDialog = (id?: string, name?: string, quantity?: string) => {
        setEditIngredient(id || null)
        reset({ nome: name || '', quantidade: quantity || '' })
        setIsEditing(!!id)
        setDialogOpen(true)
    }

    const handleFormSubmit = (data: IngredientFormInputs) => {
        if (editIngredient) updateIngredient({ id: editIngredient, updatedData: data });
        else addIngredient(data)
        closeDialog()
    }

    const closeDialog = () => {
        setDialogOpen(false)
        setEditIngredient(null)
    }

    const handleDeleteConfirm = () => {
        if (ingredientToDelete) deleteIngredient(ingredientToDelete)
        setIngredientToDelete(null)
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
                    onClick={() => openEditDialog()}
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
                                        <IconButton onClick={() => openEditDialog(row.id, row.nome, row.quantidade)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => setIngredientToDelete(row.id)}>
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

            <Dialog open={isDialogOpen} onClose={closeDialog}>
                <DialogTitle>{isEditing ? 'Editar Ingrediente' : 'Adicionar Ingrediente'}</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <Controller
                            name="nome"
                            control={control}
                            render={({ field }) => (
                                <MuiTextField {...field} autoFocus margin="dense" label="Nome do Ingrediente" fullWidth variant="standard" />
                            )}
                        />
                        <Controller
                            name="quantidade"
                            control={control}
                            render={({ field }) => (
                                <MuiTextField {...field} margin="dense" label="Quantidade" fullWidth variant="standard" />
                            )}
                        />
                        <DialogActions>
                            <Button onClick={closeDialog} variant="outlined">
                                Cancelar
                            </Button>
                            <Button type="submit" variant="contained" sx={{ ml: 1 }}>
                                {isEditing ? 'Salvar Alterações' : 'Adicionar Ingrediente'}
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={!!ingredientToDelete} onClose={() => setIngredientToDelete(null)}>
                <DialogTitle>Confirmar Exclusão</DialogTitle>
                <DialogContent>
                    <Typography>Tem certeza que deseja excluir este ingrediente?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIngredientToDelete(null)} variant="outlined">
                        Cancelar
                    </Button>
                    <Button onClick={handleDeleteConfirm} variant="contained" color="error">
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    )
}

export default StockTable
