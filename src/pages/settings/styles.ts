import { Typography, TypographyProps, styled } from '@mui/material'
import { FONT_WEIGHTS } from '../../themes/fonts'


export const TitlePageSettings = styled(Typography)<TypographyProps>(({ theme }) => ({
	paddingLeft: theme.spacing(0),
	fontSize: 16,
	fontWeight: FONT_WEIGHTS.medium,

	'@media (min-width: 1200px)': {
		fontSize: 20,
	},
}))
