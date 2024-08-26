import { Button, ButtonProps, IconButton, IconButtonProps, Stack, StackProps, TextField as TextFieldMui, styled } from '@mui/material'
import { FONT_WEIGHTS } from '../../../themes/fonts'

export const LoginFormContainer = styled(Stack)<StackProps>(({ theme }) => ({
	marginTop: theme.spacing(3),
	gap: theme.spacing(2),
	marginBottom: theme.spacing(2),
	width: theme.spacing(48.8),
}))

export const ButtonLoginForm = styled(Button)<ButtonProps>(({ theme }) => ({
	width: theme.spacing(48.875),
	height: theme.spacing(5),
	fontSize: theme.spacing(1.5),
	fontWeight: FONT_WEIGHTS.medium,
	backgroundColor: '#EF4B0A',
	'&:hover': {
			backgroundColor: '#FFB79A',
	},
}))
export const IconButtonLoginForm = styled(IconButton)<IconButtonProps>(({ theme }) => ({
	width: theme.spacing(3),
	height: theme.spacing(3),
	paddingRight: theme.spacing(1),
	'& .MuiSvgIcon-root': {
		fontSize: '24px',
	},
}))

export const TextField = styled(TextFieldMui)(({ theme }) => ({
	'& .MuiFilledInput-root': {
		backgroundColor: theme.palette.unioeste.neutral.p20,
		'&:hover': {
			backgroundColor: theme.palette.unioeste.neutral.p30,
		},
		'&.Mui-focused': {
			backgroundColor: theme.palette.unioeste.neutral.p30,
		},
	},
	'& .MuiFilledInput-underline:before': {
		borderBottomColor: theme.palette.unioeste.neutral.p60,
	},
	'& .MuiFilledInput-underline:after': {
		borderBottomColor: theme.palette.unioeste.primary.p60,
	},
	'& .MuiFormLabel-root': {
		color: theme.palette.unioeste.neutral.p70,
	},
}))
