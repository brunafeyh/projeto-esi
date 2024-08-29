import { Button, ButtonProps, styled, Stack as StackMui, Typography, TypographyProps } from "@mui/material";
import { FONT_WEIGHTS } from "../../../themes/fonts";

export const ContainedButton = styled(Button)<ButtonProps>(({ theme }) => ({
	fontSize: theme.spacing(1.5),
	fontWeight: FONT_WEIGHTS.medium,
	backgroundColor: '#EF4B0A',
	'&:hover': {
			backgroundColor: '#FFB79A',
	},
}))

export const Stack = styled(StackMui)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: theme.palette.unioeste.neutral.p10,
    width: theme.spacing(62),
}));
export const ModalTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
	paddingLeft: theme.spacing(0),
	fontSize: theme.spacing(2),
	fontWeight: FONT_WEIGHTS.medium,
}))