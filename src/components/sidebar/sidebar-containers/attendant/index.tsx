import { ToggleButton, Tooltip } from '@mui/material'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';

interface CollapsedOptionsProps {
	onChange: (value: string | null) => void
}
interface ExpandedOptionsProps {
	onChange: (value: string | null) => void
}

export const CollapsedOptionsAttendant: React.FC<CollapsedOptionsProps> = ({ onChange }) => (
	<>
		<Tooltip title="HomePage" placement="top">
			<ToggleButton value="" onClick={() => onChange('')}>
				<HomeIcon fontSize="small" />
			</ToggleButton>
		</Tooltip>
		<Tooltip title="Cardapio" placement="top">
			<ToggleButton value="cardapio" onClick={() => onChange('cardapio')}>
				<RestaurantMenuIcon fontSize="small" />
			</ToggleButton>
		</Tooltip>
		<Tooltip title="Pedidos" placement="top">
			<ToggleButton value="pedidos" onClick={() => onChange('pedidos')}>
				<AssignmentIcon fontSize="small" />
			</ToggleButton>
		</Tooltip>
		<Tooltip title="Estoque" placement="top">
			<ToggleButton value="estoque" onClick={() => onChange('estoque')}>
				<InventoryIcon fontSize="small" />
			</ToggleButton>
		</Tooltip>
	</>
)

export const ExpandedOptionsAttendant: React.FC<ExpandedOptionsProps> = ({ onChange }) => (
	<>
		<ToggleButton value="" onClick={() => onChange('')}>
			<HomeIcon fontSize="small" />
			HomePage
		</ToggleButton>
		<ToggleButton value="cardapio" onClick={() => onChange('cardapio')}>
			<RestaurantMenuIcon fontSize="small" />
			Cardápio
		</ToggleButton>
		<ToggleButton value="pedidos" onClick={() => onChange('pedidos')}>
			<AssignmentIcon fontSize="small" />
			Pedidos
		</ToggleButton>
		<ToggleButton value="estoque" onClick={() => onChange('estoque')}>
			<InventoryIcon fontSize="small" />
			Estoque
		</ToggleButton>
	</>
)