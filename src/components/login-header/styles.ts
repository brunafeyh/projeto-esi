import { Stack, StackProps, Typography as TypographyMui, TypographyProps, styled } from '@mui/material'
import { FONT_WEIGHTS } from '../../themes/fonts'

export const ContainerApresentation = styled(Stack)<StackProps>(({ theme }) => ({
	width: theme.spacing(50),
	height: theme.spacing(13.02),
	justifyContent: 'center',
	alignItems: 'center',
	marginTop: theme.spacing(38.49),
	marginBottom: theme.spacing(22.365),
	gap: theme.spacing(1.875),
	marginLeft: theme.spacing(12.5),
	marginRight: theme.spacing(12.5),
	'@media (min-height: 720px) and (max-height: 749px)': {
		marginTop: '42.5vh',
		marginBottom: '25.5vh',
	},
	'@media (min-height: 750px) and (max-height: 850px)': {
		marginTop: '43vh',
		marginBottom: '26vh',
	},

	'@media (min-height: 851px)': {
		marginTop: '45vh',
		marginBottom: '28vh',
	},
}))

export const PresentationContainer = styled(Stack)<StackProps>(({ theme }) => ({
	width: '48.07vw',
	height: '100vh',
	alignItems: 'center',
	justifyContent: 'center',
	background: theme.palette.unioeste.neutral.p100,
}))

export const TitleBP = styled(TypographyMui)<TypographyProps>(({ theme }) => ({
	width: theme.spacing(51),
	height: theme.spacing(5.25),
	textAlign: 'center',
	fontSize: theme.spacing(4),
	fontWeight: FONT_WEIGHTS.extralight,
	color: theme.palette.unioeste.neutral.p10,
}))

export const ContainerLogoImages = styled(Stack)<StackProps>(({ theme }) => ({
	width: theme.spacing(39),
	height: 'auto',
	marginBottom: theme.spacing(0),
	justifyContent: 'flex-end',
	alignItems: 'center',
}))

export const Title = styled(TypographyMui)<TypographyProps>(({ theme }) => ({
	fontWeight: FONT_WEIGHTS.extralight,
	fontSize: theme.spacing(3),
	position: 'absolute',
	top: '45%',
	left: '25%',
	color: theme.palette.unioeste.neutral.p10,
}))

export const Typography = styled(TypographyMui)<TypographyProps>(({ theme }) => ({
	fontWeight: FONT_WEIGHTS.regular,
	fontSize: theme.spacing(2),
	position: 'absolute',
	top: '52%',
	left: '25%',
	color: 'white',
}))

