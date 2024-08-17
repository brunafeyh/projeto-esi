import SettingsIcon from '@mui/icons-material/Settings'
import { ToggleButton, Tooltip } from '@mui/material'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import AssignmentIcon from '@mui/icons-material/Assignment';
interface CollapsedOptionsProps {
	onChange: (value: string | null) => void
}
interface ExpandedOptionsProps {
	onChange: (value: string | null) => void
}

const CollapsedOptions: React.FC<CollapsedOptionsProps> = ({ onChange }) => (
	<>
		<Tooltip title="Cardapio" placement="top">
			<ToggleButton value="" onClick={() => onChange('')}>
				<RestaurantMenuIcon fontSize="small" />
			</ToggleButton>
		</Tooltip>
		<Tooltip title="Pedidos" placement="top">
			<ToggleButton value="pedido" onClick={() => onChange('pedido')}>
				<AssignmentIcon fontSize="small" />
			</ToggleButton>
		</Tooltip>
		<Tooltip title="Configurações" placement="top">
			<ToggleButton value="settings" onClick={() => onChange('settings')}>
				<SettingsIcon fontSize="small" />
			</ToggleButton>
		</Tooltip>
	</>
)

const ExpandedOptions: React.FC<ExpandedOptionsProps> = ({ onChange }) => (
	<>
		<ToggleButton value="" onClick={() => onChange('')}>
			<RestaurantMenuIcon fontSize="small" />
			Cardápio
		</ToggleButton>
		<ToggleButton value="pedidos" onClick={() => onChange('pedidos')}>
			<AssignmentIcon fontSize="small" />
			Pedidos
		</ToggleButton>
		<ToggleButton value="settings" onClick={() => onChange('settings')}>
			<SettingsIcon fontSize="small" />
			Configurações
		</ToggleButton>
	</>
)

export { CollapsedOptions, ExpandedOptions }
