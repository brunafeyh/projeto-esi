import { FC, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { DialogContent, DialogActions, Button, MenuItem, Select, FormControl, InputLabel, Box, IconButton } from '@mui/material';
import { DishValueForm } from '../../../types/dishes';
import { DEFAULT_DISHE } from '../../../utils/constants/values';
import { useDishes } from '../../../hooks/dishes/use-dishes';
import { convertToBase64 } from '../../../utils/image';
import { TextField } from '../login/styles';
import { v4 as uuidv4 } from 'uuid';
import { useCategories } from '../../../hooks/category/use-categorys';
import useIngredients from '../../../hooks/ingredients/use-ingredients';
import Loading from '../../loading';
import DeleteIcon from '@mui/icons-material/Delete';

interface DishFormProps {
    dish?: DishValueForm
    onClose: () => void
}

const DishForm: FC<DishFormProps> = ({ dish, onClose }) => {
    const { register, handleSubmit, reset, setValue, control } = useForm<DishValueForm>({
        defaultValues: dish ? dish : DEFAULT_DISHE,
    });

    const { addDish, updateDish } = useDishes();
    const { categories, isLoading: isLoadingCategories } = useCategories();
    const { ingredients, isLoading: isLoadingIngredients } = useIngredients();

    const { fields, append, remove, update, replace } = useFieldArray({
        control,
        name: "dishIngredientFormDTOList"
    });

    useEffect(() => {
        if (dish) {
            setValue('categoryId', dish.categoryId);
            
            if (dish.dishIngredientFormDTOList && dish.dishIngredientFormDTOList.length > 0) {
                replace(dish.dishIngredientFormDTOList);
            }
        }
    }, [dish, setValue, replace]);

    const handleFormSubmit = async (data: DishValueForm) => {
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

        if (dish?.id) updateDish(dishData);
        else addDish(dishData);

        reset(DEFAULT_DISHE);
        onClose();
    };

    const handleAddIngredient = () => {
        append({ ingredientId: 0, quantity: 1, measurementUnitId: 0 });
    };

    const handleIngredientChange = (index: number, ingredientId: number) => {
        const selectedIngredient = ingredients.find(i => i.id === ingredientId);

        if (selectedIngredient) {
            update(index, {
                ingredientId: selectedIngredient.id,
                quantity: fields[index].quantity || 1,
                measurementUnitId: selectedIngredient.measurementUnit.id,
            });
        }
    };

    if (isLoadingCategories || isLoadingIngredients) return <Loading />;

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
                
                <FormControl variant="filled" fullWidth margin="dense">
                    <InputLabel id="category-label">Categoria</InputLabel>
                    <Select
                        labelId="category-label"
                        defaultValue={dish?.categoryId || ''}
                        {...register('categoryId', { required: true })}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button variant="outlined" onClick={handleAddIngredient}>
                        Adicionar Ingrediente
                    </Button>
                </Box>

                {fields.map((field, index) => (
                    <Box key={field.id} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        <FormControl variant="filled" sx={{ flex: 1, mr: 2 }}>
                            <InputLabel id={`ingredient-label-${index}`}>Ingrediente</InputLabel>
                            <Controller
                                name={`dishIngredientFormDTOList.${index}.ingredientId`}
                                control={control}
                                defaultValue={field.ingredientId}
                                render={({ field: ingredientField }) => (
                                    <Select
                                        labelId={`ingredient-label-${index}`}
                                        {...ingredientField}
                                        onChange={(e) => handleIngredientChange(index, parseInt(String(e.target.value)))}
                                    >
                                        {ingredients.map((ingredient) => (
                                            <MenuItem key={ingredient.id} value={ingredient.id}>
                                                {ingredient.name} ({ingredient.measurementUnit.acronym})
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>

                        <TextField
                            margin="dense"
                            label="Quantidade"
                            type="number"
                            variant="filled"
                            {...register(`dishIngredientFormDTOList.${index}.quantity`, { required: true })}
                            defaultValue={field.quantity}
                            sx={{ width: '120px' }}
                        />

                        <IconButton onClick={() => remove(index)} sx={{ ml: 1 }}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ))}

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

export default DishForm