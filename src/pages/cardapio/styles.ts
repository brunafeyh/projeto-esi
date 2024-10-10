import { styled, Typography, TypographyProps } from "@mui/material";
import { FONT_WEIGHTS } from "../../themes/fonts";

export const TitleModal = styled(Typography)<TypographyProps>(({ theme }) => ({
	paddingLeft: theme.spacing(0),
	fontSize: 16,
	fontWeight: FONT_WEIGHTS.medium,
}))