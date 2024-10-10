import React, { useState, useMemo, FC, useEffect } from 'react';
import {
  IconButton, Badge, Popover, Box, Button, Typography,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cart from '..';
import { useAuth } from '../../../hooks/use-auth';
import { usePontuation } from '../../../hooks/use-pontuation';
import { useOrderMutations } from '../../../hooks/order/use-order-mutations';
import { useCart } from '../../../hooks/cart/use-cart';
import { calculateDiscountValue, calculateFinalValue, calculatePointsEarned, calculateTotalAmount, createOrder } from '../../../utils/cart';
import CheckoutForm from '../../forms/checkout';
import { Modal, useModal } from '../../modal';

const CartButton: FC<{ onUpdateQuantity: (id: string, quantidade: number) => void, onRemoveItem: (id: string) => void }> = ({ onUpdateQuantity, onRemoveItem }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const modal = useModal();
  const [paymentMethod, setPaymentMethod] = useState('cartao');
  const [pointsToUse, setPointsToUse] = useState(0);
  const { cartItems, clearCart } = useCart();
  const { addOrder } = useOrderMutations();
  const { user } = useAuth();
  const { pontuation, fetchPontuation, updatePoints, loading } = usePontuation();

  useEffect(() => {
    if (user?.cpf) {
      fetchPontuation(user.cpf);
    }
  }, [user?.cpf, fetchPontuation]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    modal.current?.openModal();
    handleClosePopover();
  };

  const handleCloseModal = () => {
    modal.current?.closeModal();
  };

  const totalAmount = useMemo(() => calculateTotalAmount(cartItems).toFixed(2), [cartItems]);
  const discountValue = useMemo(() => calculateDiscountValue(pointsToUse), [pointsToUse]);
  const finalValue = useMemo(() => calculateFinalValue(parseFloat(totalAmount), discountValue), [totalAmount, discountValue]);
  const pointsEarned = useMemo(() => calculatePointsEarned(cartItems), [cartItems]);

  const handleFinalizeOrder = async (data: any) => {
    console.log('Credit Card Data:', data);

    if (!user || !user.cpf) {
      console.error('Usuário não autenticado ou CPF não encontrado.');
      return;
    }

    const order = createOrder(user.cpf, cartItems, finalValue, paymentMethod);

    try {
      addOrder(order);
      clearCart();
      modal.current?.closeModal();
      if (pontuation) {
        const updatedPoints = pontuation.pontosAcumulados - pointsToUse + pointsEarned;
        await updatePoints(updatedPoints);
      }
    } catch (error) {
      console.error('Erro ao finalizar o pedido:', error);
    }
  };

  return (
    <>
      <IconButton aria-describedby="cart-popover" onClick={handleClick} style={{ marginLeft: 'auto' }}>
        <Badge badgeContent={cartItems.length} color="secondary">
          <ShoppingCartIcon style={{ color: '#FFF' }} />
        </Badge>
      </IconButton>

      <Popover
        id="cart-popover"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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

      <Modal ref={modal}>
        <CheckoutForm
          totalAmount={totalAmount}
          discountValue={discountValue}
          finalValue={finalValue}
          pointsToUse={pointsToUse}
          maxPoints={pontuation?.pontosAcumulados || 0}
          paymentMethod={paymentMethod}
          onPointsChange={setPointsToUse}
          onPaymentMethodChange={setPaymentMethod}
          handleFinalizeOrder={handleFinalizeOrder}
          handleCloseModal={handleCloseModal}
          loading={loading}
        />
      </Modal>
    </>
  );
};

export default CartButton;
