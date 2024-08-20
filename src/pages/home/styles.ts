import { Typography, TypographyProps, styled } from '@mui/material'
import { FONT_WEIGHTS } from '../../themes/fonts'


export const TitlePage = styled(Typography)<TypographyProps>(({ theme }) => ({
	paddingLeft: theme.spacing(0),
	fontSize: 18,
	fontWeight: FONT_WEIGHTS.medium,
	marginBottom: theme.spacing(2),

	'@media (min-width: 1273px)': {
		fontSize: theme.spacing(2.5),
	},
}))

export const TitlePageDown = styled(Typography)<TypographyProps>(({ theme }) => ({
	paddingLeft: theme.spacing(0),
	fontSize: 18,
	fontWeight: FONT_WEIGHTS.medium,
	marginTop: theme.spacing(2),
	marginBottom: theme.spacing(2),

	'@media (min-width: 1273px)': {
		fontSize: theme.spacing(2.5),
	},
}))

export const TitlePontos = styled(Typography)<TypographyProps>(({ theme }) => ({
	paddingLeft: theme.spacing(0),
	fontSize: 14,
	fontWeight: FONT_WEIGHTS.regular,
	marginTop: theme.spacing(2),
	marginBottom: theme.spacing(2),
}))