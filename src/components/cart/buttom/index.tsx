import React, { useState, useMemo, FC, useEffect } from 'react';
import { IconButton, Badge, Popover, Box, Button, Typography, Modal, RadioGroup, FormControlLabel, Radio, Divider, TextField } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cart from '..';
import VisaIcon from '@mui/icons-material/CreditCard';
import MasterCardIcon from '@mui/icons-material/LocalAtm';
import { useCart } from '../../../hooks/use-cart';
import { useOrders } from '../../../hooks/order/use-orders';
import { useAuth } from '../../../hooks/use-auth';
import { usePontuation } from '../../../hooks/use-pontuation';

const CartButton: FC<{ onUpdateQuantity: (id: string, quantidade: number) => void, onRemoveItem: (id: string) => void }> = ({ onUpdateQuantity, onRemoveItem }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cartao');
  const [pointsToUse, setPointsToUse] = useState(0);
  const { cartItems, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { user } = useAuth();

  const { pontuation, fetchPontuation, updatePoints, loading, error } = usePontuation();

  useEffect(() => {
    if (user?.cpf) {
      fetchPontuation(user.cpf);
    }
  }, [user?.cpf, fetchPontuation]);

  useEffect(() => {
    if (pontuation && pontuation.pontosAcumulados < pointsToUse) {
      setPointsToUse(pontuation.pontosAcumulados);
    }
  }, [pontuation, pointsToUse]);

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

  const totalAmount = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.valorTotal || 0), 0).toFixed(2);
  }, [cartItems]);

  const discountValue = useMemo(() => {
    return pointsToUse * 0.01;
  }, [pointsToUse]);

  const finalValue = parseFloat(totalAmount) - discountValue;

  const pointsEarned = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.valorPontos || 0), 0);
  }, [cartItems]);

  const handleFinalizeOrder = async () => {
    if (!user || !user.cpf) {
      console.error('Usuário não autenticado ou CPF não encontrado.');
      return;
    }

    const order = {
      id: Date.now().toString(),
      numeroPedido: `Pedido-${Date.now()}`,
      cpf: user.cpf,
      descricao: cartItems.map(item => item.nome).join(', '),
      observacoes: '',
      data: new Date().toISOString().split('T')[0],
      valorTotal: finalValue,
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
      if (pontuation) {
        const updatedPoints = pontuation.pontosAcumulados - pointsToUse + pointsEarned;
        await updatePoints(updatedPoints);
      }
    } catch (error) {
      console.error('Erro ao finalizar o pedido:', error);
    }
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
          {user ? (
            <>
              <Cart items={cartItems} onUpdateQuantity={onUpdateQuantity} onRemoveItem={onRemoveItem} />
              <Button fullWidth variant="contained" color="primary" onClick={handleOpenModal}>
                Finalizar Compra
              </Button>
            </>
          ) : <Typography>Para fazer uma compra por favor faça login</Typography>}
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
          <Typography variant="h6">
            Detalhes da Compra
          </Typography>
          {cartItems.map((item) => (
            <Typography key={item.id} variant="body1">
              {item.nome} - {item.quantidade} x R$ {(item.valorReais || 0).toFixed(2)} = R$ {(item.valorTotal || 0).toFixed(2)}
            </Typography>
          ))}
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">
            Total: R$ {totalAmount}
          </Typography>
          <Typography variant="h6">
            Desconto Aplicado: R$ {discountValue}
          </Typography>
          <Typography variant="h6">
            Total com Desconto: R$ {finalValue}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">
            Pontos Disponíveis: {pontuation?.pontosAcumulados || 0}
          </Typography>
          <TextField
            label="Pontos a Utilizar"
            type="number"
            variant="filled"
            value={pointsToUse}
            onChange={(e) => setPointsToUse(Math.min(Number(e.target.value), pontuation?.pontosAcumulados || 0))}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">
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
            <Button fullWidth variant="contained" color="primary" onClick={handleFinalizeOrder} disabled={loading}>
              Finalizar Pedido
            </Button>
          </Box>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </Modal>
    </>
  );
};

export default CartButton;
