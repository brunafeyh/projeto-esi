import { Stack as MuiStack, StackProps, styled } from "@mui/material";

export const Stack = styled(MuiStack)<StackProps>(({theme}) => ({
	backgroundColor: theme.palette.unioeste.neutral.p10
}))