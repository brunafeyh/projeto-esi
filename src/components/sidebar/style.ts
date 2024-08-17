import { Typography, TypographyProps, styled, toggleButtonClasses } from '@mui/material'
import { Box, BoxProps } from '@mui/material'
import ToggleButtonGroup, { ToggleButtonGroupProps } from '@mui/material/ToggleButtonGroup'
import { FONT_WEIGHTS } from '../../themes/fonts'

export interface SidebarContainerProps extends BoxProps {
	iscollapsed: 1 | 0
}

export const SidebarContainer = styled(Box)<SidebarContainerProps>(({ theme, iscollapsed }) => ({
	background: '#000',
	height: '100vh',
	width: theme.spacing(26),
	...(iscollapsed && { width: theme.spacing(10) }),
	position: 'fixed',
	top: 0,
	bottom: 0,
	left: 0,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	paddingLeft: theme.spacing(0),
	transition: 'width 0.3s',

	'@media (min-width: 1273px)': {
		width: theme.spacing(30),
		...(iscollapsed && { width: theme.spacing(10) }),
	},
}))

export const SidebarContainerOptions = styled(ToggleButtonGroup)<ToggleButtonGroupProps>(({ theme }) => ({
	marginTop: theme.spacing(11),
	display: 'flex',

	[`& .${toggleButtonClasses.root}`]: {
		color: theme.palette.pti.neutral.p40,
		display: 'flex',
		fontWeight: FONT_WEIGHTS.extralight,
		gap: theme.spacing(),
		justifyContent: 'flex-start',
		alignItems: 'center',
		fontSize: '0.73rem',
		height: theme.spacing(6),
		border: 'none',
		background: 'none',
		borderRadius: 0,
		paddingLeft: theme.spacing(3),
		transition: 'font-size 0.3s, height 0.3s, padding-left 0.3s',

		'@media (min-width: 1273px)': {
			fontSize: '0.85rem',
			height: theme.spacing(7),
			paddingLeft: theme.spacing(3),
		},
	},
	'& .MuiButtonBase-root.Mui-selected': {
		color: theme.palette.pti.error.p50,
		background: '#111',
		paddingLeft: theme.spacing(3),
		height: theme.spacing(6),
		fontWeight: FONT_WEIGHTS.medium,
		transition: 'font-size 0.3s, height 0.3s, padding-left 0.3s',

		'&::before': {
			content: '""',
			width: theme.spacing(0.5),
			height: '100%',
			background: theme.palette.pti.error.p50,
			position: 'absolute',
			left: 0,
			borderRadius: `0 ${theme.spacing()} ${theme.spacing()} 0`,
		},

		'@media (min-width: 1273px)': {
			fontSize: '0.85rem',
			height: theme.spacing(7),
			paddingLeft: theme.spacing(3),
		},
	},
}))

export const TitleVersion = styled(Typography)<TypographyProps>(() => ({
	fontWeight: 'regular',
	fontSize: '0.77rem',
	transition: 'font-size 0.3s',

	'@media (min-width: 1273px)': {
		fontSize: '0.9rem',
	},
}))
