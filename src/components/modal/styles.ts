import { Box, BoxProps, styled } from '@mui/material'

export const BoxModal = styled(Box)<BoxProps>(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '553px',
	height: '587px',
	backgroundColor: theme.palette.unioeste.primary.p10,
	boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
	p: 4,
}))
