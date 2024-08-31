import { styled, Stack as StackMui, StackProps, TypographyProps, Typography as TypographyMui } from "@mui/material";
import { FONT_WEIGHTS } from "../../themes/fonts";

export const Stack = styled(StackMui)<StackProps>(({ theme }) => ({
    height: theme.spacing(50),
    width: theme.spacing(60),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(40)
}));

export const GraphTypography = styled(TypographyMui)<TypographyProps>(({ theme }) => ({
    marginBottom: theme.spacing(2),
    fontWeight: FONT_WEIGHTS.bold
}));

export const Container = styled(StackMui)<StackProps>(({ theme }) => ({
    height: theme.spacing(30),
    width: theme.spacing(50),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(20)
}));