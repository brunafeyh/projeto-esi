import { ToggleButton, Tooltip } from '@mui/material'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HomeIcon from '@mui/icons-material/Home';
interface CollapsedOptionsProps {
	onChange: (value: string | null) => void
}
interface ExpandedOptionsProps {
	onChange: (value: string | null) => void
}

const CollapsedOptionsCliente: React.FC<CollapsedOptionsProps> = ({ onChange }) => (
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
		<Tooltip title="Meus Pedidos" placement="top">
			<ToggleButton value="meus-pedidos" onClick={() => onChange('meus-pedidos')}>
				<AssignmentIcon fontSize="small" />
			</ToggleButton>
		</Tooltip>
	</>
)

const ExpandedOptionsCliente: React.FC<ExpandedOptionsProps> = ({ onChange }) => (
	<>
		<ToggleButton value="" onClick={() => onChange('')}>
			<HomeIcon fontSize="small" />
			HomePage
		</ToggleButton>
		<ToggleButton value="cardapio" onClick={() => onChange('cardapio')}>
			<RestaurantMenuIcon fontSize="small" />
			Cardápio
		</ToggleButton>
		<ToggleButton value="meus-pedidos" onClick={() => onChange('meus-pedidos')}>
			<AssignmentIcon fontSize="small" />
			Meus Pedidos
		</ToggleButton>
	</>
)

export { CollapsedOptionsCliente, ExpandedOptionsCliente }