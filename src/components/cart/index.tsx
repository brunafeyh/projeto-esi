import { Box, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartItem } from '../../types/dishes';
import { IconButton, TextField } from './styles';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantidade: number) => void;
  onRemoveItem: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemoveItem }) => {
  const handleQuantityChange = (id: string, value: string) => {
    const quantidade = parseInt(value, 10)
    if (!isNaN(quantidade) && quantidade > 0) {
      onUpdateQuantity(id, quantidade);
    }
  };

  return (
    <Box p={2} width={300}>
      <Typography variant="h6">Carrinho</Typography>
      {items.length === 0 ? (
        <Typography variant="body2">Carrinho vazio</Typography>
      ) : (
        <>
          {items.map((item, index) => (
            <Box key={`${item.id}-${index}`} display="flex" alignItems="center" justifyContent="space-between" mb={1}>
              <Typography variant="body2">{item.name}</Typography>
              <Stack direction="row" alignItems="center">
                <TextField
                  type="number"
                  value={item.quantidade}
                  onChange={(e) => handleQuantityChange(String(item.id), e.target.value)}
                  InputProps={{ inputProps: { min: 1 } }}
                  label="Quantidade"
                  variant="filled"
                />
                <IconButton onClick={() => onRemoveItem(String(item.id))}>
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

export default Cart;
