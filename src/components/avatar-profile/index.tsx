import React from 'react'
import Tooltip from '@mui/material/Tooltip'
import { AvatarIcon } from './styles'
import { useAuth } from '../../hooks/use-auth'
import generateNamedAvatarIcon from '../../utils/generate-named-avatar'

export const AvatarProfile: React.FC = () => {
	const { user } = useAuth()
	return (
		<Tooltip key="conta" title="Conta">
			<AvatarIcon>{user ? generateNamedAvatarIcon(user.name) : generateNamedAvatarIcon('John doe')}</AvatarIcon>
		</Tooltip>
	)
}
