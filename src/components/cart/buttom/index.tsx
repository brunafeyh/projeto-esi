import { useState, useMemo, FC } from 'react';
import { IconButton, Badge, Box, Button, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cart from '..';
import { useAuth } from '../../../hooks/use-auth';
import { useOrderMutations } from '../../../hooks/order/use-order-mutations';
import { useCart } from '../../../hooks/cart/use-cart';
import { calculateTotalAmount, calculateDiscountValue, calculateFinalValue, calculatePointsEarned, createOrder } from '../../../utils/cart';
import CheckoutForm from '../../forms/checkout';
import { Popover, usePopover } from '../../popover';
import { Modal, useModal } from '../../modal';
import { usePontuation } from '../../../hooks/pontuation/use-pontuation';
import { getCpf } from '../../../utils/auth';
import { usePontuationMutations } from '../../../hooks/pontuation/use-pontuation-mutation';
import { closePopover, openPopover } from '../../../utils/popover';
import { closeModal, openModal } from '../../../utils/modal';

const CartButton: FC<{ onUpdateQuantity: (id: string, quantidade: number) => void, onRemoveItem: (id: string) => void }> = ({ onUpdateQuantity, onRemoveItem }) => {
  const popoverRef = usePopover();
  const modalRef = useModal();
  const [paymentMethod, setPaymentMethod] = useState('cartao');
  const [pointsToUse, setPointsToUse] = useState(0);
  const { cartItems, clearCart } = useCart();
  const { addOrder } = useOrderMutations();
  const { user } = useAuth();
  const { pontuation } = usePontuation(getCpf());
  const { updatePoints } = usePontuationMutations();

  const handleOpenPopover = openPopover(popoverRef);
  const handleClosePopover = closePopover(popoverRef);

  const handleOpenModal = openModal(modalRef);
  const handleCloseModal = closeModal(modalRef);

  const handleOpen = () => {
    handleClosePopover();
    handleOpenModal();
  };

  const totalAmount = useMemo(() => {
    const amount = calculateTotalAmount(cartItems)
    return Number(amount).toFixed(2)
  }, [cartItems])

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
      handleCloseModal();
      if (pontuation) {
        const updatedPoints = pontuation.pontosAcumulados - pointsToUse + pointsEarned;
        updatePoints(pontuation.id, updatedPoints);
      }
    } catch (error) {
      console.error('Erro ao finalizar o pedido:', error);
    }
  };

  return (
    <>
      <IconButton aria-describedby="cart-popover" onClick={handleOpenPopover} style={{ marginLeft: 'auto' }}>
        <Badge badgeContent={cartItems.length} color="secondary">
          <ShoppingCartIcon style={{ color: 'white' }} />
        </Badge>
      </IconButton>

      <Popover ref={popoverRef}>
        <Box p={2} width={300}>
          {user ? (
            <>
              <Cart items={cartItems} onUpdateQuantity={onUpdateQuantity} onRemoveItem={onRemoveItem} />
              <Button fullWidth variant="contained" color="primary" onClick={handleOpen}>
                Finalizar Compra
              </Button>
            </>
          ) : (
            <Typography>Para fazer uma compra por favor faça login</Typography>
          )}
        </Box>
      </Popover>

      <Modal ref={modalRef}>
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
        />
      </Modal>
    </>
  );
};

export default CartButton;
