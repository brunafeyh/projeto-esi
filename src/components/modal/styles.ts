import { Box as BoxMui, BoxProps, styled, Typography } from '@mui/material'
import { FONT_WEIGHTS } from '../../themes/fonts';

export const BoxModal = styled(BoxMui)<BoxProps>(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '553px',
	height: '587px',
	backgroundColor: theme.palette.unioeste.primary.p10,
	boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
	p: 4,
}))

export const ModalContainer = styled(BoxMui)(({ theme }) => ({
	padding: theme.spacing(4),
	backgroundColor: theme.palette.unioeste.neutral.p10,
	borderRadius: theme.spacing(2),
	boxShadow: theme.shadows[5],
	maxWidth: theme.spacing(62.5),
	margin: 'auto',
}));

export const ModalTitle = styled(Typography)(({ theme }) => ({
	marginBottom: theme.spacing(2),
	fontWeight: FONT_WEIGHTS.bold,
	color: theme.palette.unioeste.neutral.p100,
	fontSize: theme.spacing(2)
}));

