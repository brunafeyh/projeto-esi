import { FC } from 'react';
import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { TextField } from '../../forms/login/styles';

interface UnitFormData {
    id?: number;
    name: string;
    acronym: string;
}

interface UnitFormProps {
    defaultValues: UnitFormData | null;
    onSubmit: (data: UnitFormData) => void;
    onClose: () => void;
    isEditMode: boolean;
}

const UnitForm: FC<UnitFormProps> = ({ defaultValues, onSubmit, onClose, isEditMode }) => {
    const { register, handleSubmit } = useForm<UnitFormData>({
        defaultValues: defaultValues || { name: '', acronym: '' },
    });

    return (
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
                <Button onClick={onClose} variant="outlined">Cancelar</Button>
                <Button type="submit" variant="contained">
                    {isEditMode ? 'Salvar Alterações' : 'Adicionar'}
                </Button>
            </Box>
        </form>
    );
};

export default UnitForm;
