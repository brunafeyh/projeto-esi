import { FC } from 'react'
import { useForm } from 'react-hook-form';
import { DialogContent, DialogActions, Button } from '@mui/material'
import { Dishe } from '../../../types/dishes'
import { DEFAULT_DISHE } from '../../../utils/constants/values'
import { useDishes } from '../../../hooks/dishes/use-dishes'
import { convertToBase64 } from '../../../utils/image'
import { TextField } from '../login/styles';

interface DishFormProps {
    dish?: Dishe
    onClose: () => void
}

const DishForm: FC<DishFormProps> = ({ dish, onClose }) => {
    const { register, handleSubmit, reset } = useForm<Dishe>({
        defaultValues: dish ? dish : DEFAULT_DISHE,
    })
    const { addDish, updateDish } = useDishes()
    const handleFormSubmit = async (data: Dishe) => {
        let imageBase64 = data.img || ''

        if (data.imgFile instanceof FileList && data.imgFile.length > 0) {
            const file = data.imgFile[0];
            imageBase64 = await convertToBase64(file)
        }

        const dishData = { ...data, img: imageBase64 }

        if (dish?.id) updateDish(dishData)
        else addDish(dishData)
        reset(DEFAULT_DISHE)
        onClose()
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Nome"
                    type="text"
                    fullWidth
                    variant="filled"
                    {...register('nome', { required: true })}
                />
                <TextField
                    margin="dense"
                    label="Descrição"
                    type="text"
                    fullWidth
                    variant="filled"
                    {...register('descricao', { required: true })}
                />
                <TextField
                    margin="dense"
                    label="Valor (R$)"
                    type="number"
                    fullWidth
                    variant="filled"
                    {...register('valorReais', { required: true, valueAsNumber: true })}
                />
                <TextField
                    margin="dense"
                    label="Valor em Pontos"
                    type="number"
                    fullWidth
                    variant="filled"
                    {...register('valorPontos', { required: true, valueAsNumber: true })}
                />
                <TextField
                    margin="dense"
                    label="Categoria"
                    type="text"
                    fullWidth
                    variant="filled"
                    {...register('categoria', { required: true })}
                />
                <TextField
                    margin="dense"
                    label="Imagem"
                    type="file"
                    fullWidth
                    variant="filled"
                    inputProps={{ accept: 'image/*' }}
                    {...register('imgFile')}
                    InputLabelProps={{ shrink: true }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined">
                    Cancelar
                </Button>
                <Button type="submit" variant="contained" sx={{ ml: 1 }}>
                    {dish ? 'Salvar' : 'Adicionar'}
                </Button>
            </DialogActions>
        </form>
    );
};

export default DishForm;
