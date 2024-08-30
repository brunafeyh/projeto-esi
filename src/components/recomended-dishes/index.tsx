import { FC } from 'react';
import { Grid } from '@mui/material';
import { Prato } from '../../types/dishes';
import DisheCard from '../dishe-grid/cards/dishe-card';

interface RecomendadosProps {
  pratos: Prato[];
  onAddToCart: (prato: Prato) => void;
}

const RecommendedDishes: FC<RecomendadosProps> = ({ pratos, onAddToCart }) => {
  return (
    <Grid container spacing={2}>
      {pratos.map((prato) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={prato.id}>
          <DisheCard dishe={prato} addToCart={onAddToCart} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RecommendedDishes;
