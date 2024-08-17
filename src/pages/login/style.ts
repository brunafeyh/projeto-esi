import { styled } from '@mui/material'
import Stack, { StackProps } from '@mui/material/Stack'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { FONT_WEIGHTS } from '../../themes/fonts'

export const AuthFormSection = styled(Stack)<StackProps>(() => ({
	width: '51.92vw',
	height: '100vh',
	justifyContent: 'center',
	alignItems: 'center',
}))

export const TitleApresentation = styled(Typography)<TypographyProps>(({ theme }) => ({
	fontFamily: 'IBM Plex Sans',
	fontSize: theme.spacing(3),
	fontWeight: FONT_WEIGHTS.medium,
	color: theme.palette.pti.neutral.p100,
}))

export const ContainerInputLogin = styled(Stack)<StackProps>(({ theme }) => ({
	width: theme.spacing(49),
	height: theme.spacing(28),
	justifyContent: 'center',
	alignItems: 'center',
	marginTop: theme.spacing(31),
	marginBottom: theme.spacing(26),
	marginLeft: theme.spacing(16),
	marginRight: theme.spacing(16),

	'@media (min-height: 720px) and (max-height: 749px)': {
		marginTop: '34.5vh',
		marginBottom: '29.5vh',
	},
	'@media (min-height: 750px) and (max-height: 850px)': {
		marginTop: '36vh',
		marginBottom: '31vh',
	},

	'@media (min-height: 851px)': {
		marginTop: '38vh',
		marginBottom: '33vh',
	},
}))
export const TitleVersion = styled(Typography)<TypographyProps>(({ theme }) => ({
	width: theme.spacing(10),
	height: theme.spacing(2),
	textAlign: 'center',
	fontSize: theme.spacing(1.75),
	fontWeight: FONT_WEIGHTS.regular,
	color: theme.palette.pti.neutral.p100,
	marginBottom: theme.spacing(3),
}))
