import React, { useState, useMemo } from 'react';
import { IconButton, Badge, Popover, Box, Button, Typography, Modal, RadioGroup, FormControlLabel, Radio, Divider } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cart from '..';
import VisaIcon from '@mui/icons-material/CreditCard';
import MasterCardIcon from '@mui/icons-material/LocalAtm'; 
import { useCart } from '../../../hooks/use-cart';
import { useOrders } from '../../../hooks/use-orders';

const CartButton: React.FC<{ onUpdateQuantity: (id: number, quantidade: number) => void, onRemoveItem: (id: number) => void }> = ({ onUpdateQuantity, onRemoveItem }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cartao');
  const { cartItems, clearCart } = useCart();
  const { addOrder } = useOrders();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    handleClosePopover();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFinalizeOrder = async () => {
    const order = {
      id: Date.now().toString(),
      numeroPedido: `Pedido-${Date.now()}`,
      cpf: '123.456.789-00',
      descricao: cartItems.map(item => item.nome).join(', '),
      observacoes: '', 
      data: new Date().toISOString().split('T')[0],
      valorTotal: parseFloat(totalAmount), 
      metodoPagamento: paymentMethod,
      pratos: cartItems.map(item => ({
        id: item.id.toString(),
        nome: item.nome,
        quantidade: item.quantidade,
        valor: item.valorReais,
      })),
    };
  
    try {
      addOrder(order);
      clearCart(); 
      setIsModalOpen(false); 
    } catch (error) {
      console.error('Erro ao finalizar o pedido:', error);
    }
  };
  

  const totalAmount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.valorTotal, 0).toFixed(2);
  }, [cartItems]);

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
        onClose={handleClosePopover}
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
          <Button fullWidth variant="contained" color="primary" onClick={handleOpenModal}>
            Finalizar Compra
          </Button>
        </Box>
      </Popover>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          p={4}
          bgcolor="white"
          borderRadius={2}
          boxShadow={24}
          mx="auto"
          mt={10}
          width={400}
        >
          <Typography variant="h6" gutterBottom>
            Detalhes da Compra
          </Typography>
          {cartItems.map((item) => (
            <Typography key={item.id} variant="body1">
              {item.nome} - {item.quantidade} x R$ {item.valorReais.toFixed(2)} = R$ {item.valorTotal.toFixed(2)}
            </Typography>
          ))}
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Total: R$ {totalAmount}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Método de Pagamento
          </Typography>
          <RadioGroup
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel value="cartao" control={<Radio />} label="Cartão de Crédito" />
            <FormControlLabel value="dinheiro" control={<Radio />} label="Dinheiro" />
            <FormControlLabel value="pix" control={<Radio />} label="Pix" />
          </RadioGroup>
          {paymentMethod === 'cartao' && (
            <Box mt={2} display="flex" justifyContent="space-between">
              <VisaIcon fontSize="large" />
              <MasterCardIcon fontSize="large" />
            </Box>
          )}
          <Box mt={2}>
            <Button fullWidth variant="contained" color="primary" onClick={handleFinalizeOrder}>
              Finalizar Pedido
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CartButton;
