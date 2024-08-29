import { Box, BoxProps, Button as ButtonMui, ButtonProps, IconButton, IconButtonProps, Stack, StackProps, styled } from '@mui/material'

export const MenuIconButton = styled(IconButton)<IconButtonProps>(() => ({
	'& svg': {
		fill: '#FFF',
		width: 40,
		height: 40,
	},
	'&:hover': {
		background: 'rgba(255, 255, 255, .1)',
		opacity: 0.8,
	},
}))

export const MenuContainerApresentation = styled(Stack)<StackProps>(({ theme }) => ({
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	minHeight: theme.spacing(9),
	paddingLeft: theme.spacing(3),
	paddingRight: theme.spacing(2),
	paddingBottom: theme.spacing(0),
}))

export const BoxMenuApresentation = styled(Box)<BoxProps>(({ theme }) => ({
	backgroundColor: '#000',
	color: theme.palette.unioeste.neutral.p10,
	position: 'fixed',
	top: theme.spacing(0),
	left: theme.spacing(0),
	right: theme.spacing(0),
}))

export const Button = styled(ButtonMui)<ButtonProps>(({ theme }) => ({
	backgroundColor: '#000',
	color: theme.palette.unioeste.neutral.p10,
	'&:hover': {
		backgroundColor: '#080807',
	},
}))