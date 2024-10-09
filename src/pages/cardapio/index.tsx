import { FC, useState } from 'react';
import { PageLayout } from '../../layouts/page-layout';
import { TitlePage } from '../home/styles';
import { useFilteredDishes } from '../../hooks/dishes/use-filtered-dishes';
import CardapioFilter from '../../components/cardapio-filter';
import EditDisheGrid from '../../components/dishe-grid/edit-dishe-grid';
import { useAuth } from '../../hooks/use-auth';
import DisheGrid from '../../components/dishe-grid';
import { Dialog, DialogTitle, Button } from '@mui/material';
import DishForm from '../../components/forms/dishe';

const Cardapio: FC = () => {
  const { searchTerm, sort, selectedCategory, setSearchTerm, setSort, setSelectedCategory, addToCart, filteredDishes } = useFilteredDishes();
  const { isAdminOrAttendant } = useAuth();
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

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
      {isAdminOrAttendant() ? (
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
        <DishForm onClose={handleCloseModal} />
      </Dialog>
    </PageLayout>
  )
}

export default Cardapio