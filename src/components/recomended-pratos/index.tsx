import { FC } from 'react';
import { Grid } from '@mui/material';
import PratoCard from '../more-selled/prato-card';

interface RecomendadosProps {
  pratos: any[];
  onAddToCart: (prato: any) => void;
}

const Recomendados: FC<RecomendadosProps> = ({ pratos, onAddToCart }) => {
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

export default Recomendados;
