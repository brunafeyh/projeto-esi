import { Button, ButtonProps, IconButtonProps, Typography, TypographyProps, styled } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { FONT_WEIGHTS } from '../../themes/fonts'

export const UserNameTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
	height: theme.spacing(2),
	fontSize: theme.spacing(1.75),
	fontWeight: FONT_WEIGHTS.medium,
	color: theme.palette.pti.neutral.p100,
	marginTop: theme.spacing(2),
	marginLeft: theme.spacing(2),
	marginBottom: theme.spacing(1),
}))

export const UserEmailTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
	height: theme.spacing(2),
	fontSize: theme.spacing(1.5),
	fontWeight: FONT_WEIGHTS.regular,
	color: theme.palette.pti.neutral.p70,
	marginLeft: theme.spacing(2),
	marginBottom: theme.spacing(1),
}))

export const UserRoleTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
	height: theme.spacing(2),
	fontSize: theme.spacing(1.5),
	fontWeight: FONT_WEIGHTS.medium,
	color: theme.palette.pti.neutral.p80,
	marginLeft: theme.spacing(2),
	marginBottom: theme.spacing(1),
}))

export const LogoutButton = styled(Button)<ButtonProps>(({ theme }) => ({
	height: theme.spacing(4),
	width: theme.spacing(15.5),
	fontSize: theme.spacing(1.5),
	fontWeight: FONT_WEIGHTS.medium,
	justifyContent: 'center',
	color: theme.palette.pti.primary.p60,
	backgroundColor: theme.palette.pti.neutral.p10,
	marginLeft: theme.spacing(2),
	marginBottom: theme.spacing(2),
	padding: theme.spacing(1),
	boxShadow: 'none',
	'& .MuiButton-startIcon': {
		marginRight: theme.spacing(1),
	},
	'& .MuiButton-label': {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		gap: theme.spacing(1),
	},
	'&:hover': {
		backgroundColor: theme.palette.pti.primary.p10,
		color: theme.palette.pti.primary.p60,
		boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.15)',
	},
}))

export const LogoutIconProfile = styled(LogoutIcon)<IconButtonProps>(() => ({
	'&.MuiSvgIcon-root': {
		width: '16px',
		height: '16px',
	},
}))
