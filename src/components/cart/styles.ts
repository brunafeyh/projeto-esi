import { IconButton as IconButtonMui, IconButtonProps, styled, TextField as TextFieldMui } from "@mui/material";

export const IconButton = styled(IconButtonMui)<IconButtonProps>(({ theme }) => ({
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
}))


export const TextField = styled(TextFieldMui)(({ theme }) => ({
    width: theme.spacing(15),
    marginLeft: theme.spacing(1),
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