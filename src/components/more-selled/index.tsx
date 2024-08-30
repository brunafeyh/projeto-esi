import { Grid } from '@mui/material';
import PratoCard from './prato-card';
import { FC } from 'react';

interface MaisVendidosProps {
  pratos: any[];
  onAddToCart: (prato: any) => void;
}

const MaisVendidos: FC<MaisVendidosProps> = ({ pratos, onAddToCart }) => {
  return (
    <Grid container spacing={2}>
      {pratos.map((prato) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={prato.id}>
          <PratoCard prato={prato} onAddToCart={onAddToCart} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MaisVendidos;
