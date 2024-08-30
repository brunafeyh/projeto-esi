import { Tabs as TabsMui, Typography, TypographyProps } from '@mui/material'
import { styled } from '@mui/material/styles'
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


export const TitleCard = styled(Typography)<TypographyProps>(({ theme }) => ({
	fontSize: theme.spacing(1.75),
}))

export const Tabs = styled(TabsMui)(({theme}) => ({
	'& .MuiTabs-indicator': { backgroundColor: '#e53935' },
	'& .MuiTab-root.Mui-selected': { color: '#e53935' },
	'& .MuiTab-root': {
		color: '#757575',
	},
	marginBottom: theme.spacing(2)
}))