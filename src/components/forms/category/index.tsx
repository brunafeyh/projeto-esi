import { FC } from 'react';
import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { TextField } from '../../forms/login/styles';

interface CategoryFormData {
    id?: number;
    name: string;
}

interface CategoryFormProps {
    defaultValues: CategoryFormData | null;
    onSubmit: (data: CategoryFormData) => void;
    onClose: () => void;
    isEditMode: boolean;
}

const CategoryForm: FC<CategoryFormProps> = ({ defaultValues, onSubmit, onClose, isEditMode }) => {
    const { register, handleSubmit } = useForm<CategoryFormData>({
        defaultValues: defaultValues || { name: '' },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                margin="dense"
                label="Nome"
                fullWidth
                {...register('name', { required: true })}
                variant='filled'
            />
            <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
                <Button onClick={onClose} variant="outlined">Cancelar</Button>
                <Button type="submit" variant="contained">
                    {isEditMode ? 'Salvar Alterações' : 'Adicionar'}
                </Button>
            </Box>
        </form>
    );
};

export default CategoryForm;
