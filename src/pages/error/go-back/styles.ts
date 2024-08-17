import { IconButton, IconButtonProps, styled } from '@mui/material'

export const IconBottonStyled = styled(IconButton)<IconButtonProps>(({ theme }) => ({
	backgroundColor: theme.palette.pti.neutral.p100,
	color: theme.palette.pti.neutral.p10,
	textDecoration: 'none',
	border: 'none',
	padding: '10px 20px',
	borderRadius: '5px',
	cursor: 'pointer',
	display: 'flex',
	alignItems: 'center',
}))

export const styles = {
	arrowIcon: {
		marginRight: '10px',
	},
}
