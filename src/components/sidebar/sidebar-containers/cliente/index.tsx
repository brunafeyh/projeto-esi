import { ToggleButton, Tooltip } from '@mui/material'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import AssignmentIcon from '@mui/icons-material/Assignment'
import HomeIcon from '@mui/icons-material/Home'
import { FC } from 'react'

interface CollapsedOptionsProps {
	onChange: (value: string | null) => void
}
interface ExpandedOptionsProps {
	onChange: (value: string | null) => void
}

const CollapsedOptionsCliente: FC<CollapsedOptionsProps> = ({ onChange }) => (
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
		<Tooltip title="Meus Pedidos" placement="top">
			<ToggleButton value="my-orders" onClick={() => onChange('my-orders')}>
				<AssignmentIcon fontSize="small" />
			</ToggleButton>
		</Tooltip>
	</>
)

const ExpandedOptionsCliente: FC<ExpandedOptionsProps> = ({ onChange }) => (
	<>
		<ToggleButton value="" onClick={() => onChange('')}>
			<HomeIcon fontSize="small" />
			HomePage
		</ToggleButton>
		<ToggleButton value="menu" onClick={() => onChange('menu')}>
			<RestaurantMenuIcon fontSize="small" />
			Cardápio
		</ToggleButton>
		<ToggleButton value="my-orders" onClick={() => onChange('my-orders')}>
			<AssignmentIcon fontSize="small" />
			Meus Pedidos
		</ToggleButton>
	</>
)

export { CollapsedOptionsCliente, ExpandedOptionsCliente }