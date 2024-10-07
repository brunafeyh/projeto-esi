import { FC } from 'react'
import { IconButton, Stack } from '@mui/material'
import { useAtom } from 'jotai'
import { AvatarProfile } from '../avatar-profile'
import { Popover, usePopover } from '../popover'
import Profile from '../profile';
import { BoxMenuApresentation, Button, MenuContainerApresentation } from './styles'
import Logo from '../logo'
import { isCollapsedAtom } from '../../contexts/is-collapsed-atom'
import { openPopover } from '../../utils/popover'
import CartButton from '../cart/buttom'
import Pontuation from '../pontuation'
import { useAuth } from '../../hooks/use-auth'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../hooks/use-cart'
import ChatBot from '../chat-bot'
import { MenuIcon } from './menu-icon'

const Menu: FC = () => {
  const [isCollapsed, setIsCollapsed] = useAtom(isCollapsedAtom)
  const { updateQuantity, removeItem } = useCart()
  const { isAuthenticated, isClient } = useAuth()
  const navigate = useNavigate()

  const popoverRef = usePopover()

  const handleCollapse = () => {
    setIsCollapsed((collapsed) => !collapsed);
  }

  const handleLoginRedirect = () => navigate('/login')

  const handleUpdateQuantity = (id: string, quantity: number) => {
    try {
      updateQuantity(id, quantity)
    } catch (error) {
      console.error('Erro ao atualizar a quantidade do item no carrinho:', error);
    }
  }

  const handleRemoveItem = (id: string) => {
    try {
      removeItem(id)
    } catch (error) {
      console.error('Erro ao remover o item do carrinho:', error)
    }
  }

  return (
    <>
      <BoxMenuApresentation component="header" zIndex={1000}>
        <MenuContainerApresentation>
          <IconButton onClick={handleCollapse} style={{ color: '#FFF' }}>
            <MenuIcon isCollapsed={isCollapsed} />
          </IconButton>
          <Stack direction="row" alignItems="center" flexGrow={1}>
            <Logo />
            {isAuthenticated() && <Pontuation />}
            {isClient() && (
              <CartButton
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />)}
            <ChatBot />
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
  )
}

export default Menu
