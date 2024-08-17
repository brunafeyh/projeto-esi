import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { IconButton, Stack, Tooltip } from '@mui/material'
import { useAtom } from 'jotai'
import { AvatarProfile } from '../avatar-profile'
import { Popover, usePopover } from '../popover'
import Profile from '../profile'
import { BoxMenuApresentation, MenuContainerApresentation } from './styles'
import Logo from '../logo'
import { isCollapsedAtom } from '../../contexts/is-collapsed-atom'
import { openPopover } from '../../utils/popover'

const Menu: React.FC = () => {
	const [isCollapsed, setIsCollapsed] = useAtom(isCollapsedAtom)

	const popoverRef = usePopover()

	const handleCollapse = () => {
		setIsCollapsed((collapsed) => !collapsed)
	}

	return (
		<>
			<BoxMenuApresentation component="header" zIndex={1000}>
				<MenuContainerApresentation>
					<IconButton onClick={handleCollapse} style={{ color: '#FFF' }}>
						{isCollapsed ? (
							<Tooltip title="Abrir Barra Lateral">
								<ArrowBackIosIcon style={{ fontSize: '16px' }} />
							</Tooltip>
						) : (
							<Tooltip title="Colapsar Barra Lateral">
								<ArrowForwardIosIcon style={{ fontSize: '16px' }} />
							</Tooltip>
						)}
					</IconButton>
					<Stack direction="row" alignItems="center" flexGrow={1}>
						<Logo />
						<IconButton onClick={openPopover(popoverRef)}>
							<AvatarProfile />
						</IconButton>
					</Stack>
				</MenuContainerApresentation>
			</BoxMenuApresentation>

			<Popover ref={popoverRef}>
				<Profile />
			</Popover>
		</>
	)
}

export default Menu
