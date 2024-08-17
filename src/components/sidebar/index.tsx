import React from 'react'
import { Box } from '@mui/material'
import { useAtom } from 'jotai'
import SidebarOptions from './sidebar-options'
import { SidebarContainer } from './style'
import { isCollapsedAtom } from '../../contexts/is-collapsed-atom'

const Sidebar: React.FC = () => {
	const [isCollapsed] = useAtom(isCollapsedAtom)

	return (
		<SidebarContainer iscollapsed={isCollapsed ? 1 : 0} id="sidebar">
			<Box>
				<SidebarOptions isCollapsed={isCollapsed} />
			</Box>
		</SidebarContainer>
	)
}

export default Sidebar
