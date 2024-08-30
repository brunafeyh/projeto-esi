import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { CartItem } from '../../types/dishes';
import { IconButton, TextField } from './styles';

interface CartProps {
  items: CartItem[]
  onUpdateQuantity: (id: number, quantidade: number) => void
  onRemoveItem: (id: number) => void
}

const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemoveItem }) => {
  return (
    <Box p={2} width={300}>
      <Typography variant="h6">Carrinho</Typography>
      {items.length === 0 ? (
        <Typography variant="body2">Carrinho vazio</Typography>
      ) : (
        <>
          {items.map((item, index) => (
            <Box key={`${item.id}-${index}`} display="flex" alignItems="center" justifyContent="space-between" mb={1}>
              <Typography variant="body2">{item.nome}</Typography>
              <Stack direction="row" alignItems="center">
                <TextField
                  type="number"
                  value={item.quantidade}
                  onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                  InputProps={{ inputProps: { min: 1 } }}
                  label="Quantidade"
                  variant='filled'
                />
                <IconButton onClick={() => onRemoveItem(item.id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};


export default Cart
