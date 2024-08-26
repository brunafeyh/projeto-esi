import React, { useState, useEffect } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { useAtom } from 'jotai';
import { AvatarProfile } from '../avatar-profile';
import { Popover, usePopover } from '../popover';
import Profile from '../profile';
import { BoxMenuApresentation, MenuContainerApresentation } from './styles';
import Logo from '../logo';
import { isCollapsedAtom } from '../../contexts/is-collapsed-atom';
import { openPopover } from '../../utils/popover';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CartButton, { CartItem } from '../cart/buttom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pontuation from '../pontuation';

const Menu: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useAtom(isCollapsedAtom);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const popoverRef = usePopover();

  const handleCollapse = () => {
    setIsCollapsed((collapsed) => !collapsed);
  };

  useEffect(() => {
    // Carregar os itens do carrinho da API ao montar o componente
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/carrinho');
        setCartItems(response.data);
      } catch (error) {
        console.error('Erro ao carregar itens do carrinho:', error);
        toast.error('Erro ao carregar itens do carrinho');
      }
    };

    fetchCartItems();
  }, []);

  const handleUpdateQuantity = async (id: number, quantity: number) => {
    try {
      const updatedItem = cartItems.find((item) => item.id === id);
	  if (updatedItem) {
        updatedItem.quantidade = quantity;
        updatedItem.valorTotal = updatedItem.valorReais * quantity;

        // Atualizar a quantidade no servidor
        await axios.put(`http://localhost:3000/carrinho/${id}`, updatedItem);

        // Atualizar a quantidade no estado local
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, quantidade: quantity, valorTotal: item.valorReais * quantity } : item
          )
        );
        toast.success('Quantidade do item atualizada com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao atualizar a quantidade do item no carrinho:', error);
      toast.error('Erro ao atualizar a quantidade do item');
    }
  };

  const handleRemoveItem = async (id: number) => {
    try {
      // Remover o item do servidor
      await axios.delete(`http://localhost:3000/carrinho/${id}`);

      // Remover o item do estado local
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
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
            <Pontuation/>
            <CartButton
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
            <IconButton onClick={openPopover(popoverRef)}>
              <AvatarProfile />
            </IconButton>
          </Stack>
        </MenuContainerApresentation>
      </BoxMenuApresentation>

      <Popover ref={popoverRef}>
        <Stack spacing={2}>
          <Profile />
        </Stack>
      </Popover>
    </>
  );
};

export default Menu;
