import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DialogContent, DialogActions, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Dishe } from '../../../types/dishes';
import { DEFAULT_DISHE } from '../../../utils/constants/values';
import { useDishes } from '../../../hooks/dishes/use-dishes';
import { convertToBase64 } from '../../../utils/image';
import { TextField } from '../login/styles';
import { v4 as uuidv4 } from 'uuid';
import { useCategories } from '../../../hooks/category/use-categorys';
import Loading from '../../loading';

interface DishFormProps {
    dish?: Dishe;
    onClose: () => void;
}

const DishForm: FC<DishFormProps> = ({ dish, onClose }) => {
    const { register, handleSubmit, reset, setValue } = useForm<Dishe>({
        defaultValues: dish ? dish : DEFAULT_DISHE,
    });
    const { addDish, updateDish } = useDishes();
    const { categories, isLoading } = useCategories();

    useEffect(() => {
        if (dish) {
            setValue('categoryId', dish.categoryId);
        }
    }, [dish, setValue]);

    const handleFormSubmit = async (data: Dishe) => {
        let imageBase64 = data.image || '';

        if (data.imgFile instanceof FileList && data.imgFile.length > 0) {
            const file = data.imgFile[0];
            imageBase64 = await convertToBase64(file);
        }

        const dishData = {
            ...data,
            image: imageBase64,
            id: dish?.id || uuidv4(),
        };

        if (dish?.id) {
            updateDish(dishData);
        } else {
            addDish(dishData);
        }

        reset(DEFAULT_DISHE);
        onClose();
    };

    if(isLoading) return <Loading/>

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Nome"
                    type="text"
                    fullWidth
                    variant="filled"
                    {...register('name', { required: true })}
                />
                <TextField
                    margin="dense"
                    label="Descrição"
                    type="text"
                    fullWidth
                    variant="filled"
                    {...register('description', { required: true })}
                />
                <TextField
                    margin="dense"
                    label="Valor (R$)"
                    type="number"
                    fullWidth
                    variant="filled"
                    {...register('reaisPrice', { required: true, valueAsNumber: true })}
                />
                <TextField
                    margin="dense"
                    label="Valor em Pontos"
                    type="number"
                    fullWidth
                    variant="filled"
                    {...register('pointsPrice', { required: true, valueAsNumber: true })}
                />

                {/* Category Select */}
                <FormControl variant="filled" fullWidth margin="dense">
                    <InputLabel id="category-label">Categoria</InputLabel>
                    <Select
                        labelId="category-label"
                        defaultValue={dish?.categoryId || ''}
                        {...register('categoryId', { required: true })}
                    >
                        {isLoading ? (
                            <MenuItem disabled>Carregando categorias...</MenuItem>
                        ) : (
                            categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))
                        )}
                    </Select>
                </FormControl>

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
