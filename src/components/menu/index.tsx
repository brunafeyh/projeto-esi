import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { useAtom } from 'jotai';
import { AvatarProfile } from '../avatar-profile';
import { Popover, usePopover } from '../popover';
import Profile from '../profile';
import { BoxMenuApresentation, Button, MenuContainerApresentation } from './styles';
import Logo from '../logo';
import { isCollapsedAtom } from '../../contexts/is-collapsed-atom';
import { openPopover } from '../../utils/popover';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CartButton from '../cart/buttom';
import Pontuation from '../pontuation';
import { useAuth } from '../../hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/use-cart';
import { toast } from 'react-toastify';

const Menu: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useAtom(isCollapsedAtom);
  const { updateQuantity, removeItem } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const popoverRef = usePopover();

  const handleCollapse = () => {
    setIsCollapsed((collapsed) => !collapsed);
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    try {
      updateQuantity(id, quantity);
      toast.success('Quantidade do item atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar a quantidade do item no carrinho:', error);
      toast.error('Erro ao atualizar a quantidade do item');
    }
  };

  const handleRemoveItem = (id: string) => {
    try {
      removeItem(id);
      toast.success('Item removido do carrinho com sucesso!');
    } catch (error) {
      console.error('Erro ao remover o item do carrinho:', error);
      toast.error('Erro ao remover o item do carrinho');
    }
  };

  return (
    <>
      <BoxMenuApresentation component="header" zIndex={1000}>
        <MenuContainerApresentation>
          <IconButton onClick={handleCollapse} style={{ color: '#FFF' }}>
            {isCollapsed ? (
              <Tooltip title="Abrir Barra Lateral">
                <ArrowForwardIosIcon style={{ fontSize: '16px' }} />
              </Tooltip>
            ) : (
              <Tooltip title="Colapsar Barra Lateral">
                <MenuOpenIcon style={{ fontSize: '24px' }} />
              </Tooltip>
            )}
          </IconButton>
          <Stack direction="row" alignItems="center" flexGrow={1}>
            <Logo />
            {isAuthenticated() && <Pontuation />}
            <CartButton
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
            {isAuthenticated() ? (
              <IconButton onClick={openPopover(popoverRef)}>
                <AvatarProfile />
              </IconButton>
            ) : (
              <Button onClick={handleLoginRedirect}>Fazer Login</Button>
            )}
          </Stack>
        </MenuContainerApresentation>
      </BoxMenuApresentation>

      <Popover ref={popoverRef}>
        <Stack>
          <Profile />
        </Stack>
      </Popover>
    </>
  );
};

export default Menu;
