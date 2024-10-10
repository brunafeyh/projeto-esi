import { styled, Stack as StackMui, Typography, TypographyProps } from "@mui/material";
import { FONT_WEIGHTS } from "../../../themes/fonts";

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

export const ModalText = styled(Typography)<TypographyProps>(({ theme }) => ({
	paddingLeft: theme.spacing(0),
	fontSize: theme.spacing(1.75),
	fontWeight: FONT_WEIGHTS.regular,
	marginBottom: theme.spacing(1)
}))