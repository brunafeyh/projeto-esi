import { ToggleButton, Tooltip } from '@mui/material'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import AssignmentIcon from '@mui/icons-material/Assignment'
import HomeIcon from '@mui/icons-material/Home'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import InventoryIcon from '@mui/icons-material/Inventory'
import SettingsIcon from '@mui/icons-material/Settings';
import { FC } from 'react'

interface CollapsedOptionsProps {
	onChange: (value: string | null) => void
}
interface ExpandedOptionsProps {
	onChange: (value: string | null) => void
}

export const CollapsedOptionsAdmin: FC<CollapsedOptionsProps> = ({ onChange }) => (
	<>
		<Tooltip title="HomePage" placement="top">
			<ToggleButton value="" onClick={() => onChange('')}>
				<HomeIcon fontSize="small" />
			</ToggleButton>
		</Tooltip>
		<Tooltip title="Cardapio" placement="top">
			<ToggleButton value="menu" onClick={() => onChange('menu')}>
				<RestaurantMenuIcon fontSize="small" />
			</ToggleButton>
		</Tooltip>
		<Tooltip title="Estatísticas" placement="top">
			<ToggleButton value="statistics" onClick={() => onChange('statistics')}>
				<AnalyticsIcon fontSize="small" />
			</ToggleButton>
		</Tooltip>
		<Tooltip title="Pedidos" placement="top">
			<ToggleButton value="orders" onClick={() => onChange('orders')}>
				<AssignmentIcon fontSize="small" />
			</ToggleButton>
		</Tooltip>
		<Tooltip title="Estoque" placement="top">
			<ToggleButton value="stock" onClick={() => onChange('stock')}>
				<InventoryIcon fontSize="small" />
			</ToggleButton>
		</Tooltip>
		<Tooltip title="Configurações" placement="top">
			<ToggleButton value="settings" onClick={() => onChange('settings')}>
				<SettingsIcon fontSize="small" />
			</ToggleButton>
		</Tooltip>
	</>
)

export const ExpandedOptionsAdmin: FC<ExpandedOptionsProps> = ({ onChange }) => (
	<>
		<ToggleButton value="" onClick={() => onChange('')}>
			<HomeIcon fontSize="small" />
			HomePage
		</ToggleButton>
		<ToggleButton value="menu" onClick={() => onChange('menu')}>
			<RestaurantMenuIcon fontSize="small" />
			Cardápio
		</ToggleButton>
		<ToggleButton value="statistics" onClick={() => onChange('statistics')}>
			<AnalyticsIcon fontSize="small" />
			Estatísticas
		</ToggleButton>
		<ToggleButton value="orders" onClick={() => onChange('orders')}>
			<AssignmentIcon fontSize="small" />
			Pedidos
		</ToggleButton>
		<ToggleButton value="stock" onClick={() => onChange('stock')}>
			<InventoryIcon fontSize="small" />
			Estoque
		</ToggleButton>
		<ToggleButton value="settings" onClick={() => onChange('settings')}>
			<SettingsIcon fontSize="small" />
			Configurações
		</ToggleButton>
	</>
)