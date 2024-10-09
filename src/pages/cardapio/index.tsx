import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PageLayout } from '../../layouts/page-layout';
import { TitlePage } from '../home/styles';
import { useFilteredDishes } from '../../hooks/dishes/use-filtered-dishes';
import CardapioFilter from '../../components/cardapio-filter';
import EditDisheGrid from '../../components/dishe-grid/edit-dishe-grid';
import { useAuth } from '../../hooks/use-auth';
import DisheGrid from '../../components/dishe-grid';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { Prato } from '../../types/dishes';
import { useDishes } from '../../hooks/dishes/use-dishes';
import { DEFAULT_PRATO } from '../../utils/constants/values';
import { convertToBase64 } from '../../utils/image';

const Cardapio: FC = () => {
  const { searchTerm, sort, selectedCategory, setSearchTerm, setSort, setSelectedCategory, addToCart, filteredDishes } = useFilteredDishes();
  const { user } = useAuth();
  const { addDish } = useDishes();
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<Partial<Prato>>({
    defaultValues: DEFAULT_PRATO,
  });

  const handleOpenModal = () => setOpen(true);

  const handleCloseModal = () => {
    setOpen(false);
    reset(DEFAULT_PRATO);
  };

  const handleAddDish = async (data: Partial<Prato>) => {
    let imageBase64 = '';

    if (data.imgFile instanceof FileList && data.imgFile.length > 0) {
      const file = data.imgFile[0];
      imageBase64 = await convertToBase64(file);
    }

    const newDish = {
      ...data,
      img: imageBase64,
    };

    await addDish(newDish as Prato);

    handleCloseModal();
  };

  return (
    <PageLayout title="Cardápio">
      <TitlePage>Cardápio</TitlePage>
      <CardapioFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortOrder={sort}
        setSortOrder={setSort}
      />
      {user?.role === 'ROLE_ADMINISTRATOR' || user?.role === 'ROLE_ATTENDANT' ? (
        <>
          <Button variant="contained" onClick={handleOpenModal} sx={{ mb: 2 }}>
            Adicionar Novo Prato
          </Button>
          <EditDisheGrid dishes={filteredDishes} />
        </>
      ) : (
        <DisheGrid dishes={filteredDishes} addToCart={addToCart} />
      )}

      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Adicionar Novo Prato</DialogTitle>
        <form onSubmit={handleSubmit(handleAddDish)}>
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
            <Button onClick={handleCloseModal} variant="outlined">
              Cancelar
            </Button>
            <Button type="submit" variant="contained" sx={{ ml: 1 }}>
              Adicionar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </PageLayout>
  );
};

export default Cardapio
