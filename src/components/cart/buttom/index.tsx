import React, { useState } from 'react';
import { IconButton, Badge, Popover, Box, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cart from '..';

export interface CartItem {
    id: number
    nome: string
    quantidade: number
    valorTotal: number
    valorReais: number 
  }

const CartButton: React.FC<{ cartItems: CartItem[], onUpdateQuantity: (id: number, quantidade: number) => void, onRemoveItem: (id: number) => void }> = ({ cartItems, onUpdateQuantity, onRemoveItem }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'cart-popover' : undefined;

  return (
    <>
      <IconButton aria-describedby={id} onClick={handleClick} style={{ marginLeft: 'auto' }}>
        <Badge badgeContent={cartItems.length} color="secondary">
          <ShoppingCartIcon style={{ color: '#FFF' }} />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box p={2} width={300}>
              <Cart items={cartItems} onUpdateQuantity={onUpdateQuantity} onRemoveItem={onRemoveItem} />
              <Button fullWidth variant="contained" color="primary" onClick={handleClose}>Finalizar Compra</Button>
        </Box>
      </Popover>
    </>
  );
}

export default CartButton;
