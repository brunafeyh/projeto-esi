import { useLocation, useNavigate } from 'react-router-dom'
import { SidebarContainerOptions } from '../style'
import { CollapsedOptions, ExpandedOptions } from '../sidebar-containers'

interface SidebarOptionsProps {
	isCollapsed: boolean
}

const SidebarOptions: React.FC<SidebarOptionsProps> = ({ isCollapsed }) => {
	const { pathname } = useLocation()
	const navigate = useNavigate()

	const handleChange = (value: string | null) => {
		if (value === null) {
			navigate(`/${pathname.split('/')[1]}`)
		} else {
			navigate(`/${value}`)
		}
	}

	return (
		<SidebarContainerOptions
			orientation="vertical"
			exclusive
			fullWidth
			value={pathname.split('/')[1]}
			onChange={(_, value) => handleChange(value)}
			sx={{ gap: 0 }}
		>
			{isCollapsed ? <CollapsedOptions onChange={handleChange} /> : <ExpandedOptions onChange={handleChange} />}
		</SidebarContainerOptions>
	)
}

export default SidebarOptions
