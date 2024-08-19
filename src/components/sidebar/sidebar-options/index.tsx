import { useLocation, useNavigate } from 'react-router-dom'
import { SidebarContainerOptions } from '../style'
import { CollapsedOptionsCliente, ExpandedOptionsCliente } from '../sidebar-containers/cliente'
import { useAuth } from '../../../hooks/use-auth'
import { CollapsedOptionsAdmin, ExpandedOptionsAdmin } from '../sidebar-containers/admin'

interface SidebarOptionsProps {
	isCollapsed: boolean
}

const SidebarOptions: React.FC<SidebarOptionsProps> = ({ isCollapsed }) => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const {user} = useAuth()

	const handleChange = (value: string | null) => {
		if (value === null) {
			navigate(`/${pathname.split('/')[1]}`)
		} else {
			navigate(`/${value}`)
		}
	}
	const renderOptions = () => {
		if (user?.role === 'ADMINISTRATOR') {
		  return isCollapsed ? (
			<CollapsedOptionsAdmin onChange={handleChange} />
		  ) : (
			<ExpandedOptionsAdmin onChange={handleChange} />
		  );
		} else {
		  return isCollapsed ? (
			<CollapsedOptionsCliente onChange={handleChange} />
		  ) : (
			<ExpandedOptionsCliente onChange={handleChange} />
		  );
		}
	  };

	return (
		<SidebarContainerOptions
			orientation="vertical"
			exclusive
			fullWidth
			value={pathname.split('/')[1]}
			onChange={(_, value) => handleChange(value)}
			sx={{ gap: 0 }}
		>
			{renderOptions()}
		</SidebarContainerOptions>
	)
}

export default SidebarOptions
