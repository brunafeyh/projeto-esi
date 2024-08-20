import React from 'react'
import { Box, IconButton, Stack, Typography, TextField } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

interface CartItem {
  id: number
  nome: string
  quantidade: number
  valorTotal: number
}

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
                  <IconButton onClick={() => onUpdateQuantity(item.id, item.quantidade - 1)} disabled={item.quantidade <= 1}>
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <TextField
                    size="small"
                    type="number"
                    value={item.quantidade}
                    onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                    InputProps={{ inputProps: { min: 1 } }}
                    sx={{ width: 50, textAlign: 'center' }}
                  />
                  <IconButton onClick={() => onUpdateQuantity(item.id, item.quantidade + 1)}>
                    <AddIcon fontSize="small" />
                  </IconButton>
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
