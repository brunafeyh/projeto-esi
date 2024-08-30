import { styled, TableCell } from '@mui/material'
import { FONT_WEIGHTS } from '../../themes/fonts'

export const StatusCell = styled(TableCell)(({ theme }) => ({
	textAlign: 'center',
	padding: theme.spacing(1),
	fontSize: theme.spacing(1.5),
	fontWeight: FONT_WEIGHTS.regular,
	width: '15%',
}))
