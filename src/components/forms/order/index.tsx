import { FC } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Box, Button, MenuItem, Select, Typography, SelectChangeEvent, IconButton } from '@mui/material';
import { Pedido } from '../../../types/order';
import { useDishes } from '../../../hooks/dishes/use-dishes';
import { TextField } from '../login/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dishe } from '../../../types/dishes';

interface OrderFormProps {
    onSubmit: (data: Partial<Pedido>) => void;
    defaultValues?: Partial<Pedido>;
    isEditMode: boolean;
    onClose: () => void;
}

const OrderForm: FC<OrderFormProps> = ({ onSubmit, defaultValues, isEditMode, onClose }) => {
    const { register, handleSubmit, control, setValue, watch } = useForm<Partial<Pedido>>({
        defaultValues,
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'pratos',
    });
    const { dishes } = useDishes();

    const handleDishChange = (index: number, event: SelectChangeEvent<unknown>) => {
        const dishId = event.target.value as string;
        const selectedDish = dishes.find(dish => dish.id === dishId);
        if (selectedDish) {
            setValue(`pratos.${index}.prato`, selectedDish);
            setValue(`pratos.${index}.quantidade`, 1);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                margin="dense"
                label="Nº Pedido"
                type="text"
                fullWidth
                variant="filled"
                {...register('numeroPedido')}
                disabled={isEditMode}
            />
            <TextField
                margin="dense"
                label="Descrição"
                type="text"
                fullWidth
                variant="filled"
                {...register('descricao')}
            />
            <TextField
                margin="dense"
                label="Data"
                type="date"
                fullWidth
                variant="filled"
                {...register('data')}
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                margin="dense"
                label="Valor (R$)"
                type="number"
                fullWidth
                variant="filled"
                {...register('valorTotal', { valueAsNumber: true })}
            />
            <TextField
                margin="dense"
                label="Método de Pagamento"
                type="text"
                fullWidth
                variant="filled"
                {...register('metodoPagamento')}
            />
            {isEditMode ? (
                <Select
                    label="Status"
                    fullWidth
                    variant="filled"
                    {...register('status')}
                    defaultValue={defaultValues?.status || ''}
                >
                    <MenuItem value="Em Confirmação">Em Confirmação</MenuItem>
                    <MenuItem value="Em Preparação">Em Preparação</MenuItem>
                    <MenuItem value="Cancelado">Cancelado</MenuItem>
                    <MenuItem value="Concluído">Concluído</MenuItem>
                </Select>
            ) : (
                <TextField
                    label="Status"
                    fullWidth
                    variant="filled"
                    defaultValue="Em Confirmação"
                    disabled
                />
            )}
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Pratos</Typography>
            {fields.map((field, index) => (
                <Box key={field.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Select
                        fullWidth
                        variant="filled"
                        value={watch(`pratos.${index}.prato.id`) || ''}
                        onChange={(e) => {
                            handleDishChange(index, e);
                            setValue(`pratos.${index}.prato.id`, e.target.value);
                        }}
                    >
                        <MenuItem value="" disabled>Selecione um prato</MenuItem>
                        {dishes.map((dish) => (
                            <MenuItem key={dish.id} value={dish.id}>
                                {dish.name} - R$ {(parseFloat(dish.reaisPrice?.toString() || '0') || 0).toFixed(2)}
                            </MenuItem>
                        ))}
                    </Select>

                    <TextField
                        label="Quantidade"
                        type="number"
                        variant="filled"
                        {...register(`pratos.${index}.quantidade`, { valueAsNumber: true })}
                        sx={{ width: '150px', ml: 2 }}
                    />
                    <IconButton
                        onClick={() => remove(index)}
                        sx={{ ml: 2 }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ))}

            <Button
                variant="contained"
                sx={{ width: '100%', marginBottom: 2 }}
                onClick={() => append({
                    prato: {} as Dishe,
                    quantidade: 1,
                })}
            >
                Adicionar Prato
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button onClick={onClose} variant="outlined">
                    Cancelar
                </Button>
                <Button type="submit" variant="contained" sx={{ ml: 2 }}>
                    {isEditMode ? 'Salvar Alterações' : 'Adicionar Pedido'}
                </Button>
            </Box>
        </form>
    );
};

export default OrderForm