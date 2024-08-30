import { Grid } from '@mui/material';
import { FC } from 'react';
import DisheCard from '../dishe-grid/cards/dishe-card';

interface MaisVendidosProps {
  dishes: any[];
  onAddToCart: (prato: any) => void;
}

const MoreSelled: FC<MaisVendidosProps> = ({ dishes, onAddToCart }) => {
  return (
    <Grid container spacing={2}>
      {dishes.map((dishe) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={dishe.id}>
          <DisheCard dishe={dishe} addToCart={onAddToCart} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MoreSelled;
