import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, IconButton, Chip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { TitleCard } from '../../../pages/home/styles';

interface PratoCardProps {
  prato: {
    id: number;
    nome: string;
    descricao: string;
    valorReais: number;
    categoria: string;
    img: string;
  };
  onAddToCart: (prato: any) => void;
}

const PratoCard: React.FC<PratoCardProps> = ({ prato, onAddToCart }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={prato.img || '/images/logo-restaurante-clara.png'}
        title={prato.nome}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {prato.nome}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {prato.descricao}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <IconButton color="primary" aria-label="add to shopping cart" onClick={() => onAddToCart(prato)}>
          <ShoppingCartIcon />
        </IconButton>
        <TitleCard>R$ {prato.valorReais.toFixed(2)}</TitleCard>
        <Chip label={prato.categoria} />
      </CardActions>
    </Card>
  );
};

export default PratoCard;
