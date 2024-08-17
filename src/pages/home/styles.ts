import { Typography, TypographyProps, styled } from '@mui/material'
import { FONT_WEIGHTS } from '../../themes/fonts'


export const TitlePage = styled(Typography)<TypographyProps>(({ theme }) => ({
	paddingLeft: theme.spacing(0),
	fontSize: 16,
	fontWeight: FONT_WEIGHTS.medium,

	'@media (min-width: 1273px)': {
		fontSize: theme.spacing(2.5),
	},
}))
