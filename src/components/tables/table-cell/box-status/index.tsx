import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { ReactNode } from 'react'
import getStatusStyles from '../../../../utils/table'

interface StatusBoxProps {
	status: ReactNode
}

export const StatusBox = styled(Box)<StatusBoxProps>(({ theme, status }) => {
	const { backgroundColor, color, width } = getStatusStyles(theme, status)
	const height = theme.spacing(6)

	return {
		backgroundColor,
		color,
		width,
		height,
		padding: theme.spacing(1),
		display: 'flex',
		alignItems: 'center',
		marginLeft: theme.spacing(1),
		borderRadius: theme.spacing(0),
		justifyContent: 'center',
	}
})

export default StatusBox
