import { Grid } from '@mui/material';
import PratoCard from './dishe-card';
import { FC } from 'react';

interface MaisVendidosProps {
  dishes: any[];
  onAddToCart: (prato: any) => void;
}

const MoreSelled: FC<MaisVendidosProps> = ({ dishes, onAddToCart }) => {
  return (
    <Grid container spacing={2}>
      {dishes.map((dishe) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={dishe.id}>
          <PratoCard dishe={dishe} onAddToCart={onAddToCart} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MoreSelled;
