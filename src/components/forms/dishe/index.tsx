import { FC, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Button, MenuItem, Select, FormControl, InputLabel, Box, IconButton } from '@mui/material';
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
import { useUnits } from '../../../hooks/unit/use-units';
import { ActionBox } from '../../../pages/stock/styles';
import ImageUpload from '../../image-upload';

interface DishFormProps {
    dish?: DishValueForm;
    onClose: () => void;
}

const DishForm: FC<DishFormProps> = ({ dish, onClose }) => {
    const { register, handleSubmit, reset, setValue, control } = useForm<DishValueForm>({
        defaultValues: dish ? dish : DEFAULT_DISHE,
    });

    const { addDish, updateDish, addIsLoading, updateIsLoading } = useDishes();
    const { categories, isLoading: isLoadingCategories } = useCategories();
    const { ingredients, isLoading: isLoadingIngredients } = useIngredients();
    const { units, isLoading: isLoadingUnits } = useUnits();

    const { fields, append, remove, update, replace } = useFieldArray({
        control,
        name: 'dishIngredientFormDTOList',
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

        try {
            if (dish?.id) {
                updateDish(dishData, {
                    onSuccess: () => {
                        reset(DEFAULT_DISHE);
                        onClose();
                    },
                });
            } else {
                addDish(dishData, {
                    onSuccess: () => {
                        reset(DEFAULT_DISHE);
                        onClose();
                    },
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleAddIngredient = () => {
        append({ ingredientId: 0, quantity: 1, measurementUnitId: 0 });
    };

    const handleIngredientChange = (index: number, ingredientId: number) => {
        const selectedIngredient = ingredients.find((i) => i.id === ingredientId);

        if (selectedIngredient) {
            update(index, {
                ingredientId: selectedIngredient.id,
                quantity: fields[index].quantity || 1,
                measurementUnitId: selectedIngredient.measurementUnit.id,
            });
        }
    };

    const handleFileSelect = async (file: File | null) => {
        if (file) {
            const base64Image = await convertToBase64(file)
            setValue('image', base64Image)
        } else setValue('image', '');
    }

    if (isLoadingCategories || isLoadingIngredients || isLoadingUnits || addIsLoading || updateIsLoading) return <Loading />

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Box sx={{ maxHeight: '70vh', overflow: 'auto', width: '100%', paddingBottom: 3 }}>
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
                                                {ingredient.name}
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

                        <FormControl variant="filled" sx={{ flex: 1, ml: 2 }}>
                            <InputLabel id={`unit-label-${index}`}>Unidade</InputLabel>
                            <Controller
                                name={`dishIngredientFormDTOList.${index}.measurementUnitId`}
                                control={control}
                                defaultValue={field.measurementUnitId}
                                render={({ field: unitField }) => (
                                    <Select labelId={`unit-label-${index}`} {...unitField}>
                                        {units.map((unit) => (
                                            <MenuItem key={unit.id} value={unit.id}>
                                                {unit.acronym}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>

                        <IconButton onClick={() => remove(index)} sx={{ ml: 1 }}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ))}

                <Controller
                    name="image"
                    control={control}
                    render={() => (
                        <ImageUpload onFileSelect={(file) => handleFileSelect(file)} />
                    )}
                />
            </Box>
            <ActionBox mt={2}>
                <Button onClick={onClose} variant="outlined">
                    Cancelar
                </Button>
                <Button type="submit" variant="contained" sx={{ ml: 1 }} disabled={addIsLoading}>
                    {addIsLoading ? 'Salvando...' : dish ? 'Salvar' : 'Adicionar'}
                </Button>
            </ActionBox>
        </form>
    )
}

export default DishForm
